const WaitlistEntry = require("../models/waitlist-entry.model");
const { validateWaitlistPayload } = require("../utils/validators");

async function createWaitlistEntry(req, res, next) {
  try {
    const validation = validateWaitlistPayload(req.body);
    if (!validation.valid) {
      return res.status(400).json({ ok: false, message: validation.message });
    }

    const payload = validation.data;

    const existing = await WaitlistEntry.findOne({ email: payload.email })
      .select({ _id: 1 })
      .lean();
    if (existing) {
      return res.status(409).json({
        ok: false,
        duplicate: true,
        message: "This email is already on the waitlist.",
      });
    }

    const created = await WaitlistEntry.create(payload);

    return res.status(201).json({
      ok: true,
      message: "You have been added to the waitlist.",
      data: {
        id: created._id,
        createdAt: created.createdAt,
      },
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        ok: false,
        duplicate: true,
        message: "This email is already on the waitlist.",
      });
    }
    return next(error);
  }
}

module.exports = { createWaitlistEntry };
