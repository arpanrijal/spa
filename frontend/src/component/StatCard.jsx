import React from 'react';
import { RefreshCw, TrendingUp, TrendingDown, BarChart2, LineChart } from 'lucide-react'; 


const NepseIndexCard = ({ value, isLoading }) => {
  const displayValue = isLoading ? "Loading..." : value;

  return (
    <div className="stat-card index-card">
      <div className="stat-card-title">
        NEPSE Index
        <span className="live-badge">LIVE</span>
      </div>
      <div className="stat-card-value">
        {displayValue}
      </div>
      <div className="index-card-footer">
        <RefreshCw size={16} className="refresh-icon" onClick={() => console.log("Refresh clicked")} />
        <div className="market-status-dot"></div>
        Market Open
      </div>
    </div>
  );
};


const SmallStatCard = ({ title, value, isLoading, type }) => {
  const displayValue = isLoading ? "Loading..." : value;
  let icon;
  let className = "stat-card";

  switch (title) {
    case "Total Turnover":
      icon = <BarChart2 size={16} />;
      break;
    case "Total Trades":
      icon = <LineChart size={16} />;
      break;
    case "Gainers":
      icon = <TrendingUp size={16} />;
      className += " gainers";
      break;
    case "Losers":
      icon = <TrendingDown size={16} />;
      className += " losers";
      break;
    default:
      icon = null;
  }

  return (
    <div className={className}>
      <div className="stat-card-title">
        {icon && <span className="stat-card-icon">{icon}</span>}
        {title}
      </div>
      <div className="stat-card-value">
        {displayValue}
      </div>
    </div>
  );
};


function StatCard({ title, value, isLoading }) {
  if (title === "NEPSE Index") {
    return <NepseIndexCard value={value} isLoading={isLoading} />;
  }
  return <SmallStatCard title={title} value={value} isLoading={isLoading} />;
}

export default StatCard;