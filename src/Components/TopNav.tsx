import { Link } from "react-router-dom";
import "./TopNav.css";

const TopNav = () => {
  return (
    <div className="topnav">
      <div className="left-content">
        <span>Goob Fitness</span>
      </div>
      <div className="right-content">
        <Link to="/">Account</Link>
        <Link to="/">Community</Link>
        <Link to="/exercises">Exercises</Link>
      </div>
    </div>
  );
};

export default TopNav;
