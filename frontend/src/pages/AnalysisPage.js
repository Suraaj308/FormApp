import Sidebar from "../components/Sidebar";
import "../styles/AnalysisPage.css"

function AnalysisPage() {
  return (
    <div className="AnalysisPageContainer">
      <div className="AnalysisPageContainer-Left">
        <div className="APCL-Top">
          <p>API Management</p>
        </div>
        <div className="APCL-Bottom">
          <Sidebar />
        </div>
      </div>
      <div className="AnalysisPageContainer-Right">
        <div className="APCR-Top">
          <h2>Analysis Page</h2>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
