import { useContext, useEffect, useState } from "react";
import StatCard from "./StatCard"; 
import FilterButtons from "./FilterButtons";  
import SearchBar from "./SearchBar"; 
import Loader from "./Loader"; 
import "./Dashboard.css";
import Navbar from "./Navbar";
import {UserDataContext} from '../context/DataContext'

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const {setNavProfilecard} = useContext(UserDataContext)

  const loadData = async () => {
    setLoading(true);
    
    
    const mockData = {
      index: "Loading",
      trades: "Loading",
      turnover: "Loading",
      gainers: 0,
      losers: 0,
    };

    await new Promise(resolve => setTimeout(resolve, 1500));

    setData(mockData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container" onClick={() => setNavProfilecard(false)}>
      <Navbar />
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="stats-grid">
          <StatCard title="NEPSE Index" value={data?.index} isLoading={loading} />

          <div className="small-stats-row">
            <StatCard title="Total Turnover" value={data?.turnover} isLoading={loading} />
            <StatCard title="Total Trades" value={data?.trades} isLoading={loading} />
          </div>
          <div className="small-stats-row">
            <StatCard title="Gainers" value={data?.gainers} isLoading={loading} />
            <StatCard title="Losers" value={data?.losers} isLoading={loading} />
          </div>
        </div>

        <SearchBar setQuery={setQuery} />
        <FilterButtons selected={filter} setSelected={setFilter} />

        {loading && <Loader />}
        
      </div>
    </div>
  );
}

export default Dashboard;
