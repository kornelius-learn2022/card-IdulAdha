const jwt = require("jsonwebtoken");
const { card_contens, admin } = require("../model/index");
const bcrypt = require("bcrypt");

const generateAccessToken = (user) => {
  user.expire = Date.now() + 30 * 1000;
  return jwt.sign(user, process.env.AccessToken, {
    expiresIn: "30s",
  });
};

const generateRefreshToken = (user) => {
  user.expire = Date.now() + 24 * 60 * 60 * 1000;
  return jwt.sign(user, process.env.RefreshToken, {
    expiresIn: "1d",
  });
};

const register = async (req, res, next) => {
  const { email, username, password } = req.body;
  const search_email = await admin.findOne({
    where: {
      email: email,
    },
  });
  if (search_email === null) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash_password = await bcrypt.hash(password, salt);
    try {
      await admin.create({
        email: email,
        nama_admin: username,
        password: hash_password,
      });
      res.status(200).json("Useradmin telah dibuat");
    } catch (error) {
      res.json(error);
    }
  } else {
    res.status(200).json("Email telah terdaftar");
  }
};
const alternativeLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    search_email = await admin.findOneB({
      where: { email: email },
    });
    res.json(search_email);
  } catch (error) {}
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const search_email = await admin.findOne({
      where: {
        email: email,
      },
      attributes: ["email", "nama_admin", "password"],
    });
    if (search_email === null) {
      res.status(401).json({ message: "Email tidak ditemukan" });
    } else {
      const match = await bcrypt.compare(password, search_email.password);
      if (!match) {
        res.status(403).json({ message: "Password salah" });
      } else {
        const Accesstoken = generateAccessToken({
          email: search_email.email,
          username: search_email.nama_admin,
          // expire: Date.now() + 1000,
        });
        const RefreshToken = generateRefreshToken({
          email: search_email.email,
          username: search_email.nama_admin,
          // expire: Date.now() + 24 * 60 * 60 * 1000,
        });
        await admin.update(
          { token: RefreshToken },
          {
            where: {
              email: email,
            },
          }
        );

        res.status(200).cookie("refreshToken", RefreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          secure: false,
        });
        res.json({ accesstoken: Accesstoken });
      }
    }
  } catch (error) {
    res.status(403).json("Email dan Password Salah");
    next();
  }
};

const logout = async (req, res, next) => {
  const key = req.cookies.refreshToken;
  const adm = await admin.findOne({
    where: {
      token: key,
    },
    attributes: ["email"],
  });
  if (adm.email === null) res.sendStatus(204);

  await admin.update(
    { token: null },
    {
      where: {
        email: adm.email,
      },
    }
  );
  res.clearCookie("refreshToken").sendStatus(200);
};

const verifi = (req, res, next) => {
  const autHeader = req.headers.authorization;
  const token = autHeader && autHeader.split(" ")[1];
  if (token === null) return res.sendStatus(403);
  jwt.verify(token, process.env.AccessToken, (err, user) => {
    if (err) return res.status(401).json("token tidak valid");
    next();
  });
};
const refreshToken = async (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (token == null) return res.status(403).json("token tidak valid");
  const refresh = await admin.findOne({
    where: {
      token: token,
    },
    attributes: ["email", "nama_admin"],
  });
  if (refresh === null) {
    res.sendStatus(404);
  } else {
    jwt.verify(token, process.env.RefreshToken, (err, user) => {
      if (err) res.status(401).json("token tidak valid");
      const newAccessToken = generateAccessToken({ user });
      res.status(200).json({
        accesstoken: newAccessToken,
      });
    });
  }
};
const getAllData = async (req, res, next) => {
  const cards = await card_contens.findAll({
    attributes: [
      ["nama_user", "nama"],
      ["pesan_user", "pesan"],
      ["id_user", "id"],
    ],
  });
  res.status(200).json(cards);
};
const cookie = (req, res, next) => {
  res.cookie("Hallod", "iyaTodd");
  next();
};
module.exports = {
  login,
  verifi,
  refreshToken,
  getAllData,
  register,
  logout,
  cookie,
  alternativeLogin,
};
