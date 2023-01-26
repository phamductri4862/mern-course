import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";

function Stats() {
  const {showStats, isLoading, monthlyApplications} = useAppContext()

  useEffect(() => {
    showStats()
  }, [])

  if(isLoading){
    return <Loading center />
  }

  return (
    <div>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </div>
  );
}
export default Stats;
