import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Sidebar from "./sidebar";
import { FaHome } from "react-icons/fa";
import "../css/admin.css";
const Admin = () => {
  return (
    <div className="containerAdmin">
      <Sidebar />
      <Container className="admin-dashboard pe-0">
        <Row className="head-dashboard ps-1">
          <div className="icon-title">
            <div className="icon-home">
              <FaHome />
            </div>
            <div className="title-content">
              <p className="pb-0">Dashboard</p>
            </div>
          </div>
        </Row>
        <Row className="content-dashboard ps-1">
          <p>
            Pariatur excepteur labore velit voluptate officia. Ad sit aute enim
            fugiat mollit officia aliqua adipisicing aute Lorem aliqua. Duis in
            mollit tempor qui quis et consequat ad irure adipisicing ea deserunt
            mollit. Fugiat elit cillum ullamco tempor consequat irure.
          </p>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
