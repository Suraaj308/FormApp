import { useNavigate } from "react-router-dom";
import "./Sidebar.css"

function Sidebar() {
    const navigate = useNavigate();

    const menuItems = [
        { name: "Home", path: "/", icon: "/icons/sidebar_homeicon.png" },
        { name: "Tracer", path: "/tracer", icon: "/icons/sidebar_tracericon.png" },
        { name: "Analysis", path: "/analysis", icon: "/icons/sidebar_analysisicon.png" },
        { name: "Configuration", path: "/config", icon: "/icons/sidebar_analysisicon.png" },
    ];

    return (
        <div className="sidebar-container">
            {menuItems.map((item) => (
                <button
                    key={item.name}
                    className="sidebar-button"
                    onClick={() => navigate(item.path)}
                >
                    <img src={item.icon} alt={item.name} className="icon" />
                    <span className="sidebar-button-text">{item.name}</span>
                </button>
            ))}
        </div>
    );

}

export default Sidebar;