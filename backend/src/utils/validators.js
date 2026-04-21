const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateWaitlistPayload(payload) {
  const name = normalizeString(payload?.name);
  const email = normalizeString(payload?.email).toLowerCase();
  const projectType = normalizeString(payload?.projectType);
  const source = normalizeString(payload?.source) || "unknown";

  if (name.length < 2 || name.length > 100) {
    return { valid: false, message: "Name must be between 2 and 100 characters." };
  }

  if (!EMAIL_REGEX.test(email) || email.length > 200) {
    return { valid: false, message: "Please provide a valid email address." };
  }

  if (projectType.length > 150) {
    return { valid: false, message: "Project type must be 150 characters or less." };
  }

  if (source.length > 80) {
    return { valid: false, message: "Source must be 80 characters or less." };
  }

  return {
    valid: true,
    data: {
      name,
      email,
      projectType,
      source,
    },
  };
}

module.exports = { validateWaitlistPayload };
