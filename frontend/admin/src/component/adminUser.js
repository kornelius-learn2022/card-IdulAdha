import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const Users = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState([]);
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/refresh",
        {},
        {
          withCredentials: true,
        }
      )

      .then((res) => {
        const parseToken = jwt_decode(res.data.accesstoken);
        setResponse({
          email: parseToken.user.email,
          username: parseToken.user.username,
        });
      })
      .catch((err) => {
        navigate("/login");
        console.log(err);
      });
  }, []);
  return (
    <div className="akun">
      <label className="username">{response.username}</label>
      <label className="email">{response.email}</label>
    </div>
  );
};
export default Users;
