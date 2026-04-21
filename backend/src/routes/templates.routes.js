const express = require("express");
const {
  listTemplates,
  getTemplateById,
  createTemplate,
  deleteTemplate,
  deleteTemplatesBulk,
} = require("../controllers/templates.controller");

const router = express.Router();

router.get("/", listTemplates);
router.get("/:id", getTemplateById);
router.post("/", createTemplate);
router.post("/bulk-delete", deleteTemplatesBulk);
router.delete("/:id", deleteTemplate);

module.exports = router;
