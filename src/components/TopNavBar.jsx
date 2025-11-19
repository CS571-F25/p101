// TopNavBar.jsx
import { Link } from "react-router-dom";
import ProfileSearch from "./pages/ProfileSearch";

export default function TopNavBar(props) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      background: "#222",
      color: "white",
    }}>
      
      {/* Navigation Links */}
      <nav style={{ display: "flex", gap: "35%", marginLeft: "5%" }}>
        <Link style={{ color: "white" }} to="/">Home</Link>
        <Link style={{ color: "white" }} to="/profile">Profile</Link>
        <Link style={{ color: "white" }} to="/compare">Compare</Link>
      </nav>

      {/* Persistent Search Bar */}
      <ProfileSearch search={props.search} />

    </div>
  );
}
