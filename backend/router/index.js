const express = require("express");
const controller = require("../controller/index");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/show", controller.show);
router.post("/create", controller.createData);
router.get("/cardMessage", controller.cardByid);
router.get("/usrMessage", controller.selectByid);

module.exports = router;
