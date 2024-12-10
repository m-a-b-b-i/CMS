const MosqueSchema = require("../model/Mosque.js");
const User = require("../model/User.js");

const getAllNamazTime = async (req, res) => {
  const mosques = await MosqueSchema.find();
  if (!mosques) {
    res.status(204).json({ message: "No mosques found" });
  }
  res.json(mosques);
};

const createNewTime = async (req, res) => {
  if (
    !req?.body?.username ||
    !req?.body?.userId ||
    !req?.body?.fajr ||
    !req?.body?.zuhr ||
    !req?.body?.asr ||
    !req?.body?.magrib ||
    !req?.body?.isha ||
    !req?.body?.juma ||
    !req?.body?.lastModified
  ) {
    return res.status(400).json({ message: "All the Feilds required" });
  }

  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(204).json({ message: "No user found" });
    }

    const result = await MosqueSchema.create({
      username: req.body.username,
      userId: req.body.userId,
      mosqueName: user.mosqueName,
      fajr: req.body.fajr,
      zuhr: req.body.zuhr,
      asr: req.body.asr,
      magrib: req.body.magrib,
      isha: req.body.isha,
      juma: req.body.juma,
      lastModified: req.body.lastModified,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateNamazTime = async (req, res) => {
  if (!req?.body?.userId) {
    return res.status(400).json({ message: "userId parameter is required." });
  }

  const mosque = await MosqueSchema.findOne({
    userId: req.body.userId,
  }).exec();
  if (!mosque) {
    return res
      .status(204)
      .json({ message: `No mosque matches userId ${req.body.userId}.` });
  }

  if (req.body?.fajr) mosque.fajr = req.body.fajr;
  if (req.body?.zuhr) mosque.zohar = req.body.zuhr;
  if (req.body?.asr) mosque.asr = req.body.asr;
  if (req.body?.magrib) mosque.magrib = req.body.magrib;
  if (req.body?.isha) mosque.isha = req.body.isha;
  if (req.body?.juma) mosque.juma = req.body.juma;
  if (req.body?.lastModified) mosque.lastModified = req.body.lastModified;

  const result = await mosque.save();
  res.json(result);
};

const getNamazTime = async (req, res) => {
  if (!req?.params?.userId) {
    res.status(400).json({ message: "username is required" });
  }

  let mosque = await MosqueSchema.findOne({
    userId: req.params.userId,
  }).exec();
  if (!mosque) {
    return res.status(204).json({
      message: `No Mosque matches username ${req.params.userId}.`,
    });
  }
  return res.json(mosque);
};

module.exports = {
  createNewTime,
  updateNamazTime,
  getAllNamazTime,
  getNamazTime,
};
