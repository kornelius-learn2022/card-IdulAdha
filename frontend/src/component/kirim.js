import { useState } from "react";
import axios from "axios";
import "../css/kirim.css";
import { useNavigate } from "react-router-dom";
import Banner from "./banner";

const Kirim = () => {
  const navigate = useNavigate();
  const [error, SetError] = useState([]);
  const [count, setCount] = useState(0);
  const [keluarga, setKeluarga] = useState("false");
  const time = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  if (count === 2 || count === 4) {
    clearTimeout(time);
  }
  const sendData = async (data) => {
    await axios
      .post("http://localhost:5000/create", data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        navigate(`Card?key=${res.data.id}`);
      })
      .catch((err) => {
        console.log("Data tidak tersimpan", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nama = document.getElementById("nama").value;
    const pesan = document.getElementById("pesan").value;
    console.log(nama);
    console.log(keluarga);
    console.log(pesan);
    const err = {};
    if (nama === "" && pesan === "" && keluarga === "false") {
      err.nama = "Mohon Nama harus diisi";
      err.pesan = "Mohon Pesan harus diisi";
      err.keluarga = "Mohon keluarga harus diisi";
    } else if (nama === "") {
      err.nama = "Mohon Nama harus diisi";
    } else if (pesan === "") {
      err.pesan = "Mohon Pesan harus diisi";
    } else if (keluarga === "false") {
      err.pesan = "Mohon keluarga harus diisi";
    } else {
      sendData({
        nama: nama,
        pesan: pesan,
        keluarga: keluarga,
      });
    }
    SetError(err);
  };

  return count === 2 ? (
    <div className="kirim" id="kirim">
      <div id="kirimKartu">
        <h1>Buat Kartu Ucapan Idul Adha</h1>
        <form onSubmit={handleSubmit}>
          <label id="label_nama">Nama Pengirim:</label>
          <input id="nama" type="text" />
          <span className="highlight"></span>
          <span className="bar"></span>
          <span style={{ color: "red" }}>{error.nama ? error.nama : ""}</span>
          <label>Status Pengirim:</label>
          <div className="keluarga">
            <input
              type="radio"
              value="Bapak"
              name="keluargaBesar"
              id="bapak"
              checked={keluarga === "Bapak"}
              onChange={(e) => setKeluarga(e.target.value)}
            />

            <label htmlFor="keluargaBesar" id="radioButton">
              Bapak
            </label>
            <input
              type="radio"
              value="Ibu"
              name="keluargaBesar"
              id="ibuk"
              checked={keluarga === "Ibu"}
              onChange={(e) => setKeluarga(e.target.value)}
            />

            <label htmlFor="keluargaBesar" id="radioButton">
              Ibu
            </label>
          </div>
          <span style={{ color: "red" }}>
            {error.keluarga ? error.keluarga : ""}
          </span>
          <label id="label_nama">Pesan Pengirim:</label>
          <textarea id="pesan" type="text" />
          <span className="highlight"></span>
          <span className="bar"></span>
          <span style={{ color: "red" }}>{error.pesan ? error.pesan : ""}</span>
          <br></br>
          <button>Buat</button>
        </form>
      </div>
    </div>
  ) : (
    <Banner />
  );
};

export default Kirim;
