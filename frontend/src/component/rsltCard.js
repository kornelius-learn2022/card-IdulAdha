import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/rsltCard.css";
import Banner from "../component/banner";
const ResultCard = () => {
  const get_key = new URLSearchParams(useLocation().search).get("key");
  const navigate = useNavigate();
  const [responese, setResponse] = useState([]);
  const [count, setCount] = useState(0);

  const get_data = async (props) => {
    await axios
      .get(
        `http://localhost:5000/usrMessage?key=${props}`,

        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        setResponse({
          nama: res.data.nama,
          pesan: res.data.pesan,
        });
      })
      .catch((errr) => {
        console.error("Tidak dapat mengakses data server", errr);
      });
  };
  if (Object.keys(responese).length !== 0) {
    const time = setTimeout(() => {
      setCount(count + 1);
    }, 1000);
    if (count === 3) {
      clearTimeout(time);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };
  useEffect(() => {
    get_data(get_key);
  }, [get_key]);
  const ShowCard = (res) => {
    return (
      <div id="showCard">
        <p id="resultCard">
          <p id="nama">{res.res.nama}</p>
          <br />
          <p id="say">Mengucapkan</p> <br />
          <p id="pesan">{res.res.pesan}</p>
          <p id="akun">
            Apakah anda sudah punya?{" "}
            <a id="akun" href="" onClick={handleSubmit}>
              Buat
            </a>
          </p>
        </p>
      </div>
    );
  };
  return count === 3 ? <ShowCard res={responese} /> : <Banner />;
};

export default ResultCard;
