import Job from "../models/Job.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticated,
} from "../errors/index.js";
import checkPermissions from "../utils/CheckPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) throw new NotFoundError(`No job with id: ${jobId}`);
  checkPermissions(req.user, job.createdBy);
  await job.remove();
  res.status(200).json({ msg: "Success! Job removed" });
};

const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (status !== "all") {
    queryObject.status = status;
  }
  if (jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  let result = Job.find(queryObject);
  if (sort === "latest") result = result.sort("createdAt");
  else if (sort === "oldest") result = result.sort("-createdAt");
  else if (sort === "a-z") result = result.sort("position");
  else if (sort === "z-a") result = result.sort("-position");

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);
  res.status(200).json({ jobs, totalJobs, numOfPages });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position, jobLocation } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values.");
  }
  const job = await Job.findOne({ _id: jobId });
  if (!job) throw new NotFoundError(`No job with id: ${jobId}`);
  checkPermissions(req.user, job.createdBy);
  job.position = position;
  job.company = company;
  job.jobLocation = jobLocation;
  await job.save();
  res.status(200).json({ job });
};
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res.status(200).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, showStats, updateJob };
