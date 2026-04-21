const express = require("express");
const { createWaitlistEntry } = require("../controllers/waitlist.controller");

const router = express.Router();

router.post("/", createWaitlistEntry);

module.exports = router;
