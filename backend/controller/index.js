const card_content = require("../model/user");
// this file contains function that can be used to create and read data

const show = async (req, res) => {
  res.send("Card Idul Adha");
};

const createData = async (req, res, next) => {
  try {
    const count = parseInt(
      await card_content.count({ distinct: true, col: "no_index" })
    );
    await card_content.create({
      nama_user: req.body.nama,
      pesan_user: req.body.pesan,
      keluarga: req.body.keluarga,
      no_index: count + 1,
    });
    next("Data telah masuk");
    res.json({ id: count + 1 });
  } catch (error) {
    res.json({ pensan: "Data tidak masuk" });
    next("Data tidak masuk");
  }
};

const cardByid = async (req, res, next) => {
  const id = req.query.key;
  try {
    const result = await card_content.findAll({
      where: { no_index: id },
      attributes: { exclude: ["tanggal_dibuat"] },
      attributes: [
        ["id_user", "id"],
        ["nama_user", "nama"],
        ["pesan_user", "pesan"],
        ["keluarga", "keluarga"],
      ],
    });
    res.json({
      pesan: result[0].dataValues.pesan,
      link: `rstCard?key=${id}`,
    });
  } catch (error) {}
};

const selectByid = async (req, res, next) => {
  const id = req.query.key;
  try {
    const result = await card_content.findAll({
      where: { no_index: id },
      attributes: { exclude: ["tanggal_dibuat"] },
      attributes: [
        ["id_user", "id"],
        ["nama_user", "nama"],
        ["pesan_user", "pesan"],
        ["keluarga", "keluarga"],
      ],
    });
    console.log(result[0].dataValues.keluarga);
    const nama = `Keluarga Besar ${result[0].dataValues.keluarga} ${result[0].dataValues.nama}`;
    res.json({ nama: nama, pesan: "Selamat Hari Raya Idul Adha 1443 H" });
    next("Dapat mengambil data dari database");
  } catch (error) {
    next("Tidak dapat mengambil data dari database");
  }
};

module.exports = {
  show,
  createData,
  cardByid,
  selectByid,
};
