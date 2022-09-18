const express = require("express");

const controller = require("../controller/index");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/login", controller.login);
router.post("/user", controller.verifi, controller.getAllData);
router.post("/refresh", controller.refreshToken);
router.post("/adminRegister", controller.register);
router.post("/logout", controller.logout);
router.get("/cookie", controller.cookie);
router.post("/alternative", controller.alternativeLogin);

module.exports = router;
