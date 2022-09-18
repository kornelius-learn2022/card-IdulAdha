import { useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
function EditShow() {
  const params = new URLSearchParams(useLocation().search).get("key");
  return (
    <div className="containerAdmin">
      <Sidebar />
    </div>
  );
}
export default EditShow;
