import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import "../css/login.css";
const Login = () => {
  const navigate = useNavigate();
  const [validatelogin, setValidatedLogin] = useState({});
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendData = async (data) => [
    await axios
      .post("http://localhost:5000/login", data, {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        navigate("/admin");
      })
      .catch((err) => {
        setValidatedLogin(err.response.data.message);
        navigate("/login");
      }),
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    }
    setValidated(true);
    sendData({ email: email, password: password });
  };

  return (
    <Container className="login">
      <Row className="rowLogin">
        <Col>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="FormLogin p-5"
          >
            <Form.Group className="title ">
              <Form.Label> Login Admin Card Idul Adha</Form.Label>
            </Form.Group>
            {Object.keys(validatelogin).length === 0 ? (
              ""
            ) : (
              <Alert size="sm" className="mb-0" variant="danger">
                Email atau Password Anda Salah
              </Alert>
            )}

            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Email Admin</Form.Label>
              <Form.Control
                type="email"
                values={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
              <Form.Control.Feedback type="invalid">
                Email harap untuk diisi.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicPassword">
              <Form.Label>Password Admin</Form.Label>
              <Form.Control
                type="password"
                values={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Password harap untuk diisi.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="text-center">
              <button className="buttonSubmit">Login</button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
