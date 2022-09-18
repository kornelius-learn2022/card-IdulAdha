import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Sidebar from "./sidebar";
import axios from "axios";
function EditShow() {
  const [response, setResponse] = useState([]);
  const params = new URLSearchParams(useLocation().search).get("key");
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
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

  const Edit = async () => {
    await axios
      .put("http://localhost:5000/update", {
        nama: nama,
        pesan: pesan,
        id: response.id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="containerAdmin">
      <Sidebar />
      <Container>
        <Row>
          <input
            placeholder={response.nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </Row>
        <Row>
          <input
            placeholder={response.pesan}
            onChange={(e) => setPesan(e.target.value)}
          />
        </Row>
        <Button onClick={Edit} variant="primary">
          Edit
        </Button>
      </Container>
    </div>
  );
}
export default EditShow;
