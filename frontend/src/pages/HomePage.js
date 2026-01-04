import Sidebar from "../components/Sidebar";
import "../styles/HomePage.css"

function HomePage() {
  return (
    <div className="HomePageContainer">
      <div className="HomePageContainer-Left">
        <div className="HPCL-Top">
          <p>API Management</p>
        </div>
        <div className="HPCL-Bottom">
          <Sidebar />
        </div>
      </div>
      <div className="HomePageContainer-Right">
        <div className="HPCR-Top">
          <h2>Home Page</h2>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
