import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Banner from "./banner";
import "../css/after_kirim.css";
function CardShow() {
  const params = new URLSearchParams(useLocation().search).get("key");
  const navigate = useNavigate();
  const [response, setResponse] = useState([]);
  const [count, setCount] = useState(0);
  const get_data = async (props) => {
    await axios
      .get(`http://localhost:5000/cardMessage?key=${props}`, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        setResponse({
          pesan: res.data.pesan,
          link: res.data.link,
        });
      });
  };
  if (Object.keys(response).length !== 0) {
    const time = setTimeout(() => {
      setCount(count + 1);
    }, 1000);
    if (count === 2) {
      clearTimeout(time);
    }
  }
  useEffect(() => {
    get_data(params);
  }, [params]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(response.link);
  };

  const Copy = () => {
    const value = `\n${response.pesan}.\nBerikut ini merupakan link kartu ucapan kami:\nhttp://localhost:5000/#/Card/${response.link}`;
    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert(value);
      })
      .catch((err) => {
        alert("anda tidak dapat meyalinya ", err);
      });
  };
  return count === 2 ? (
    <div id="Show">
      <div id="afterKirim">
        <p>
          {response.pesan}. <br></br> Berikut ini merupakan link kartu ucapan
          kami:
          <br></br>
          <a
            href={`http://localhost:5000/#/Card/${response.link}`}
            onClick={handleSubmit}
          >
            {`http://localhost:5000x  /#/Card/${response.link}`}
          </a>
        </p>
        <button id="salin" onClick={Copy}>
          Salin Pesan
        </button>
      </div>
    </div>
  ) : (
    <Banner />
  );
}
export default CardShow;
