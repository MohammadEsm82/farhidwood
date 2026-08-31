const crypto = require("crypto");

// =====================================================
// GENERATE OTP
// =====================================================

const generateOTP = () => {
  return crypto
    .randomInt(100000, 1000000)
    .toString();
};

// =====================================================
// HASH OTP
// =====================================================

const hashOTP = (otp) => {
  return crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");
};

// =====================================================
// VERIFY OTP
// =====================================================

const verifyOTP = (otp, hashedOTP) => {
  if (!otp || !hashedOTP) {
    return false;
  }

  const hashedInput = hashOTP(otp);

  return crypto.timingSafeEqual(
    Buffer.from(hashedInput),
    Buffer.from(hashedOTP)
  );
};

module.exports = {
  generateOTP,
  hashOTP,
  verifyOTP,
};