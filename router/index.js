const express = require("express");
const router = express.Router();
const wxController = require("../controller");

router.get("/sign",wxController.getJsSdk);

module.exports = router;