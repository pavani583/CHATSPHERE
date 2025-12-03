const User = require('../models/User');
const { generateOTP } = require('../utils/otpGenerator');
const ms = require('ms');

exports.requestOtp = async (req, res) => {
  const { phone, email, name } = req.body;
  if (!phone && !email) return res.status(400).json({ msg: 'Phone or email required' });

  let user = await User.findOne({ $or: [{ phone }, { email }] });
  if (!user) user = new User({ name: name || 'Anonymous', phone, email });

  const code = generateOTP(6);
  const expiresAt = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES || '5') * 60000));
  user.otp = { code, expiresAt };
  await user.save();

  // For mini-project: send OTP back in response (or console.log). In real app, integrate SMS/email API
  console.log(`OTP for ${phone || email}: ${code}`);
  return res.json({ msg: 'OTP sent (check server console for code during development)', otp: code, userId: user._id });
};

exports.verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ msg: 'User not found' });
  if (!user.otp || !user.otp.code) return res.status(400).json({ msg: 'No OTP found' });
  if (new Date() > new Date(user.otp.expiresAt)) return res.status(400).json({ msg: 'OTP expired' });
  if (otp !== user.otp.code) return res.status(400).json({ msg: 'Invalid OTP' });
  user.isVerified = true;
  user.otp = null;
  await user.save();
  return res.json({ msg: 'Verified', userId: user._id });
};

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-otp');
  res.json(users);
};