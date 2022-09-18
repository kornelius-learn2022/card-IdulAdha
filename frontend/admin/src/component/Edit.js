import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Sidebar from "./sidebar";
import axios from "axios";
function EditShow() {
  const [response, setResponse] = useState([]);
  const params = new URLSearchParams(useLocation().search).get("key");
  const editData = async (props) => {
    await axios
      .get(`http://localhost:5000/edit?key=${props}`, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        setResponse({
          id: res.data.id,
          nama: res.data.nama,
          pesan: res.data.pesan,
        });
      });
  };
  useEffect(() => {
    editData(params);
  }, [params]);
  return (
    <div className="containerAdmin">
      <Sidebar />
      <Container>
        <Row>
          <input value={response.nama} />
        </Row>
        <Row>
          <input value={response.pesan} />
        </Row>
      </Container>
    </div>
  );
}
export default EditShow;
