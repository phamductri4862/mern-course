import User from "../models/User.js";
import { BadRequestError } from "../errors/index.js";
import UnAuthenticatedError from "../errors/unauthenticated.js";
import attachCookies from "../utils/attachCookies.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create(req.body);
  const token = user.createJWT();
  user.password = undefined;
  attachCookies({ res, token });

  res.status(201).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },

    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values.");
  }
  const user = await User.findOne({ email }).select("+password");
  if (user) {
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new UnAuthenticatedError("Invalid Credentials");
    } else {
      const token = user.createJWT();
      attachCookies({ res, token });
      res.status(200).json({ user, location: user.location });
      res.send("Login");
    }
  } else {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  await user.save();
  const token = user.createJWT();
  attachCookies({ res, token });

  res.status(201).json({ user, location: user.location });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(200).json({ user, location: user.location });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "user logged out" });
};

export { register, login, updateUser, getCurrentUser, logout };
