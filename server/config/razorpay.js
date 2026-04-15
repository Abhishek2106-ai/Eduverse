const Razorpay = require("razorpay");

let instance = null;

try {
  instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY || "dummy",
    key_secret: process.env.RAZORPAY_SECRET || "dummy",
  });
} catch (err) {
  console.log("Razorpay disabled for now");
}

module.exports = instance;