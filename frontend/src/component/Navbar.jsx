import { FiBell, FiUser, FiMenu } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import "./Navbar.css";
function Navbar() {
  return (
    <nav className="navbar">
      {/* Left Section: Logo + Title */}
      <div className="left">
        <FaChartLine size={24} color="#4ade80" />
        <div>
          <h2 className="title">NEPSE Stock Trading</h2>
          <p className="subtitle">Trading Signals</p>
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="icons">
        <FiBell size={20} color="#d1d5db" />
        <FiUser size={20} color="#d1d5db" />
        <FiMenu size={22} color="#d1d5db" />
      </div>
    </nav>
  );
}



export default Navbar;
