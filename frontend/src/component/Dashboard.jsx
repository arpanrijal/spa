import { useContext, useEffect, useState } from "react";
import StatCard from "./StatCard";
import FilterButtons from "./FilterButtons";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import "./Dashboard.css";
import Navbar from "./Navbar";
import { UserDataContext } from "../context/DataContext";
import Card from "./card";

function Dashboard() {
  // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const { setNavProfilecard } = useContext(UserDataContext);

  return (
    <div
      className="dashboard-container"
      onClick={() => setNavProfilecard(false)}
    >
      <Navbar />
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="stats-grid">
          <StatCard
            title="NEPSE Index"
            value={"LIVE"}
            isLoading={loading}
          />

          <div className="small-stats-row">
            <StatCard
              title="Total Turnover"
              value={"20,352,245,544,514"}
              isLoading={loading}
            />
            <StatCard
              title="Total Trades"
              value={"14,512,154"}
              isLoading={loading}
            />
          </div>
          <div className="small-stats-row">
            <StatCard
              title="Gainers"
              value={"58"}
              isLoading={loading}
            />
            <StatCard title="Losers" value={"16"} isLoading={loading} />
          </div>
        </div>

        {/* <SearchBar setQuery={setQuery} /> */}
        {/* <FilterButtons selected={filter} setSelected={setFilter} /> */}
        <h2 className="font-bold text-2xl pb-2 pt-4">Stocks:</h2>
        <div className="flex gap-x-4 gap-y-4 flex-wrap">
          <Card />
        </div>
        {/* {loading && <Loader />} */}
      </div>
    </div>
  );
}

export default Dashboard;
