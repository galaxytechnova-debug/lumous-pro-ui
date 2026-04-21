const mongoose = require("mongoose");
const Template = require("../models/template.model");
const { validateTemplatePayload } = require("../utils/validators");

function toTemplateResponse(doc) {
  return {
    id: String(doc._id),
    name: doc.name,
    html: doc.html,
    prompt: doc.prompt || "",
    updatedAt: new Date(doc.updatedAt).getTime(),
    createdAt: new Date(doc.createdAt).getTime(),
  };
}

async function listTemplates(req, res, next) {
  try {
    const templates = await Template.find({})
      .sort({ updatedAt: -1 })
      .lean();

    return res.status(200).json({
      ok: true,
      data: templates.map(toTemplateResponse),
    });
  } catch (error) {
    return next(error);
  }
}

async function getTemplateById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ ok: false, message: "Template not found." });
    }

    const template = await Template.findById(id).lean();
    if (!template) {
      return res.status(404).json({ ok: false, message: "Template not found." });
    }

    return res.status(200).json({
      ok: true,
      data: toTemplateResponse(template),
    });
  } catch (error) {
    return next(error);
  }
}

async function createTemplate(req, res, next) {
  try {
    const validation = validateTemplatePayload(req.body);
    if (!validation.valid) {
      return res.status(400).json({ ok: false, message: validation.message });
    }

    const created = await Template.create(validation.data);
    return res.status(201).json({
      ok: true,
      message: "Template created.",
      data: toTemplateResponse(created),
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteTemplate(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ ok: false, message: "Template not found." });
    }

    const deleted = await Template.findByIdAndDelete(id).lean();
    if (!deleted) {
      return res.status(404).json({ ok: false, message: "Template not found." });
    }

    return res.status(200).json({ ok: true, message: "Template deleted." });
  } catch (error) {
    return next(error);
  }
}

async function deleteTemplatesBulk(req, res, next) {
  try {
    const ids = Array.isArray(req.body?.ids) ? req.body.ids : [];
    const validIds = ids.filter((id) => typeof id === "string" && mongoose.isValidObjectId(id));
    if (validIds.length === 0) {
      return res.status(400).json({ ok: false, message: "No valid template ids were provided." });
    }

    const result = await Template.deleteMany({ _id: { $in: validIds } });
    return res.status(200).json({
      ok: true,
      message: "Templates deleted.",
      data: { deletedCount: result.deletedCount || 0 },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listTemplates,
  getTemplateById,
  createTemplate,
  deleteTemplate,
  deleteTemplatesBulk,
};
