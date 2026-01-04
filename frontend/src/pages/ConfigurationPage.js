import Sidebar from "../components/Sidebar";
import "../styles/ConfigurationPage.css"

function ConfigurationPage() {
  return (
    <div className="ConfigurationPageContainer">
      <div className="ConfigurationPageContainer-Left">
        <div className="CPCL-Top">
          <p>API Management</p>
        </div>
        <div className="CPCL-Bottom">
          <Sidebar />
        </div>
      </div>
      <div className="ConfigurationPageContainer-Right">
        <div className="CPCR-Top">
          <h2>Configuration Page</h2>
        </div>
      </div>
    </div>
  );
}

export default ConfigurationPage;
