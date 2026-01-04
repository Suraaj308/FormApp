import Sidebar from "../components/Sidebar";
import "../styles/TracerPage.css"

function TracerPage() {
  return (
    <div className="TracerPageContainer">
      <div className="TracerPageContainer-Left">
        <div className="TPCL-Top">
          <p>API Management</p>
        </div>
        <div className="TPCL-Bottom">
          <Sidebar />
        </div>
      </div>
      <div className="TracerPageContainer-Right">
        <div className="TPCR-Top">
          <h2>Tracer Page</h2>
        </div>
      </div>
    </div>
  );
}

export default TracerPage;
