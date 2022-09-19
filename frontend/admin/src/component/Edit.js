import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Sidebar from "./sidebar";
import axios from "axios";
import Form from "react-bootstrap/Form";

function EditShow() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [response, setResponse] = useState([]);
  const [validated, setValidated] = useState(false);
  const params = new URLSearchParams(useLocation().search).get("key");
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">PESAN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Data berhasil dirubah</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={back}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const back = () => {
    navigate("/CardUsers");
  };
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    editData(params);
  }, [params]);

  const Edit = async (data) => {
    await axios
      .put("http://localhost:5000/update", data)
      .then((res) => {
        console.log(res.data);
        setModalShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
    }
    setValidated(true);
    Edit({
      nama: nama,
      pesan: pesan,
      id: response.id,
    });
  };
  return (
    <div className="containerAdmin">
      <Sidebar />
      <Container>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="formUpdate"
        >
          <Form.Group>
            <Form.Label>Nama Pengguna</Form.Label>
            <Form.Control
              value={nama}
              type="text"
              onChange={(e) => {
                setNama(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Nama harap untuk diisi
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Pesan Pengguna</Form.Label>
            <Form.Control
              value={pesan}
              type="text"
              onChange={(e) => {
                setPesan(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Pesan harap untuk diisi
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <button className="btn btn-primary">Edit</button>
          </Form.Group>
        </Form>
        <MyVerticallyCenteredModal show={modalShow} />
      </Container>
    </div>
  );
}
export default EditShow;
