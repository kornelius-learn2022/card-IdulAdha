import Sidebar from "./sidebar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaComment, FaSearch } from "react-icons/fa";
import "../css/cardUser.css";

const CardUser = () => {
  const [token, setToken] = useState([]);
  const [deleteByid, setdeletByid] = useState(0);
  const [carduser, setCarduser] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setModalShow(false);
  };
  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">PESAN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah anda akan menghapus data ini?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={hapus}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const hapus = async () => {
    await axios
      .delete(`http://localhost:5000/delete?key=${deleteByid}`)
      .then((res) => {
        setModalShow(false);
        window.location.reload(false);
      })
      .catch((err) => {});
  };
  const refreshToken = async () => {
    await axios
      .post(
        "http://localhost:5000/refresh",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setToken(res.data.accesstoken);
      })
      .catch((err) => {
        navigate("/login");
      });
  };
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = Date.now();
      if (token.expire < currentDate) {
        const response = await axios.post("http://localhost:5000/refresh");
        config.headers.authorization = `Bearer ${response.data.accesstoken}`;
        setToken(response.data.accesstoken);
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const getAllData = async (data) => {
    await axiosJWT
      .post(
        "http://localhost:5000/user",
        {},
        {
          headers: {
            authorization: `Bearer ${data}`,
          },
        }
      )
      .then((res) => {
        setCarduser(res.data);
      })
      .catch((err) => {
        console.log();
      });
  };
  useEffect(() => {
    refreshToken();
  }, []);
  useEffect(() => {
    if (token.length !== 0) {
      getAllData(token);
    }
  }, [token]);

  const edit = (e) => {
    e.preventDefault();
    navigate(`edit?key=${e.target.value}`);
  };
  const edithapus = (e) => {
    e.preventDefault();
    setdeletByid(e.target.value);
    setModalShow(true);
  };
  return (
    <div className="containerAdmin">
      <Sidebar />
      <Container className="admin-card-users">
        <Row className="head-card-users ps-1">
          <div className="icon-title">
            <div className="icon-home">
              <FaComment />
            </div>
            <div className="title-content">
              <p className="pb-0">Card Users</p>
            </div>
          </div>
        </Row>
        <Row className="content-card-users">
          <Row>
            <Stack direction="horizontal" gap={2}>
              <input className="card-search" placeholder="search" />
              <Button>
                <FaSearch />
              </Button>
            </Stack>
          </Row>
          <Row className="p-4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Pesan</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {carduser.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.pesan}</td>
                    <td>
                      <Button
                        value={item.id}
                        variant="warning"
                        id="edit"
                        onClick={edit}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        value={item.id}
                        variant="danger"
                        onClick={edithapus}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Row>
        <MyVerticallyCenteredModal show={modalShow} />
      </Container>
    </div>
  );
};
export default CardUser;
