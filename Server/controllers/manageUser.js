const User = require("../model/User");
const MosqueSchema = require("../model/Mosque");
const bcrypt = require("bcrypt");
const sendEmail = require("../services/email");
const formSubmissionEmail = require("../utils/formSubmissionEmail");
const rejectionEmailTemplate = require("../utils/rejectionEmailTemplate");
const successEmailTemplate = require("../utils/successEmailTemplate");
const deleteUserEmailTemplate = require("../utils/deleteUserEmailTemplate");
const newRequestEmailTemplate = require("../utils/newRequestEmailTemplate");
const cloudinary = require("../middleware/cloudinary");
const Mosque = require("../model/Mosque");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    res.status(204).json({ message: "No employees found" });
  }
  res.json(users);
};

const handleNewUser = async (req, res) => {
  const { user, name, email, phonenumber, address, mosqueName, mosqueAddress } =
    req.body;
  if (!user) {
    return res.status(400).json({ message: "Username is required" });
  }
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  if (!phonenumber) {
    return res.status(400).json({ message: "phonenumber is required" });
  }
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!mosqueName) {
    return res.status(400).json({ message: "Mosque Name is required" });
  }
  if (!mosqueAddress) {
    return res.status(400).json({ message: "Mosque Address is required" });
  }

  if (!req.file.path) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) {
    return res.sendStatus(409); //Conflict
  }
  try {
    //create and store new user
    const fileUrl = req.file.path;

    // send uploaded file to Cloudinary
    cloudinary.uploader.upload(fileUrl, async (error, result) => {
      if (error) {
        // handle Cloudinary upload error
        console.error(error);
        return res.status(500).send("Error uploading file to Cloudinary");
      }

      // handle successful Cloudinary upload
      const file = result.secure_url;

      // save form data and uploaded file to database

      await User.create({
        username: user,
        name: name,
        email: email,
        phonenumber: phonenumber,
        address: address,
        mosqueName: mosqueName,
        mosqueAddress: mosqueAddress,
        imageUrl: file,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      sendEmail({
        from: "mohdnaeemghadai@gmail.com",
        to: email,
        subject: "Thank you for registering",
        text: `${"mohdnaeemghadai@gmail.com"} have a message for you.`,
        html: formSubmissionEmail({
          emailFrom: "mohdnaeemghadai@gmail.com",
          username: user,
        }),
      }).catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Error in sending email." });
      });

      sendEmail({
        from: email,
        to: "mohdnaeemghadai@gmail.com",
        subject: "New User Registration",
        text: `Namazzyy app have a message for you.`,
        html: newRequestEmailTemplate({
          emailFrom: email,
          username: user,
        }),
      })
        .then(async () => {
          return res.status(201).json({ success: `New User ${user} created!` });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: "Error in sending email." });
        });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user,
      name,
      phonenumber,
      email,
      address,
      isApproved,
      mosqueName,
      mosqueAddress,
    } = req.body;

    if (!user) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!phonenumber) {
      return res.status(400).json({ message: "phonenumber is required" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!mosqueName) {
      return res.status(400).json({ message: "Mosque Name is required" });
    }
    if (!mosqueAddress) {
      return res.status(400).json({ message: "Mosque Address is required" });
    }

    // check if the user exists
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const details = await User.findOne({ username: user }).exec();
    if (details && details._id != id) {
      return res.sendStatus(409); //Conflict
    }

    let mosqueDetails = await Mosque.findOne({
      username: userData.username,
    }).exec();

    if (mosqueDetails) {
      if (mosqueDetails.username !== user) {
        mosqueDetails.username = user;
        await mosqueDetails.save();
      }
      if (userData.mosqueName !== mosqueName) {
        mosqueDetails.mosqueName = mosqueName;
        await mosqueDetails.save();
      }
    }

    // update user details
    userData.username = user;
    userData.name = name;
    userData.phonenumber = phonenumber;
    userData.address = address;
    userData.email = email;
    userData.mosqueName = mosqueName;
    userData.mosqueAddress = mosqueAddress;

    if (isApproved) {
      userData.isApproved = isApproved;
      sendEmail({
        from: "mohdnaeemghadai@gmail.com",
        to: userData.email,
        subject: "You are approved",
        text: `${"mohdnaeemghadai@gmail.com"} have a message for you.`,
        html: successEmailTemplate({
          emailFrom: "mohdnaeemghadai@gmail.com",
          username: userData.username,
          password: userData.password,
        }),
      }).catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Error in sending email." });
      });
    }

    // check if a new image was uploaded
    if (req.file) {
      // upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // delete the previous image from Cloudinary if it exists
      if (userData.imageUrl) {
        const publicId = userData.imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // set the new image URL
      userData.imageUrl = result.secure_url;
    }

    // save the updated user details to MongoDB
    userData.updatedAt = new Date();
    await userData.save();

    return res.status(201).json({ success: `User ${user} data updated!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const handleNewUserByAdmin = async (req, res) => {
  const {
    user,
    name,
    pwd,
    email,
    phonenumber,
    address,
    mosqueName,
    mosqueAddress,
  } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ message: "Username and password required" });
  }
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  if (!phonenumber) {
    return res.status(400).json({ message: "phonenumber is required" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!mosqueName) {
    return res.status(400).json({ message: "Mosque Name is required" });
  }
  if (!mosqueAddress) {
    return res.status(400).json({ message: "Mosque Address is required" });
  }

  if (!req.file.path) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  //Check for duplicate username in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) {
    return res.sendStatus(409); //Conflict
  }
  try {
    //create and store new user
    const fileUrl = req.file.path;

    // send uploaded file to Cloudinary
    cloudinary.uploader.upload(fileUrl, async (error, result) => {
      if (error) {
        // handle Cloudinary upload error
        console.error(error);
        return res.status(500).send("Error uploading file to Cloudinary");
      }

      // handle successful Cloudinary upload
      const file = result.secure_url;

      // save form data and uploaded file to database
      const hashedPwd = await bcrypt.hash(pwd, 10);
      //create and store new user
      await User.create({
        username: user,
        name: name,
        email: email,
        phonenumber: phonenumber,
        address: address,
        mosqueName: mosqueName,
        mosqueAddress: mosqueAddress,
        password: hashedPwd,
        imageUrl: file,
        createdAt: new Date(),
        updatedAt: new Date(),
        newUser: false,
        isApproved: "Approved",
      });

      res.status(201).json({ success: `New User ${user} created!` });
    });
    //encrypt the password
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { user } = req.params;

  if (!user) {
    return res.status(400).json({ message: "Username is required" });
  }

  //Check for duplicate username in the db

  const userFound = await User.findOne({ username: user }).exec();
  const mosqueFound = await MosqueSchema.findOne({ username: user }).exec();

  if (!userFound) {
    return res.sendStatus(404); //Conflict
  }
  try {
    //delete User
    const result = await User.deleteOne({
      username: user,
    });

    //delete Mosque
    if (mosqueFound) {
      const resultMosque = await MosqueSchema.deleteOne({
        username: user,
      });
    }

    sendEmail({
      from: "mohdnaeemghadai@gmail.com",
      to: userFound.email,
      subject: "Your Account has been deleted",
      text: `${"mohdnaeemghadai@gmail.com"} have a message for you.`,
      html: deleteUserEmailTemplate({
        emailFrom: "mohdnaeemghadai@gmail.com",
        username: user,
      }),
    })
      .then(async () => {
        return res.status(201).json({ success: `User ${user} deleted!` });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Error in sending email." });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { isApproved, user } = req.body;

    if (!isApproved) {
      return res.status(400).json({ message: "isapproved is required" });
    }
    if (!user) {
      return res.status(400).json({ message: "Username is required" });
    }

    let userFound = await User.findOne({ username: user }).exec();
    userFound.isApproved = isApproved;
    userFound.updatedAt = new Date();
    if (userFound.isApproved === "Approved" && userFound) {
      sendEmail({
        from: "mohdnaeemghadai@gmail.com",
        to: userFound.email,
        subject: "You are approved",
        text: `${"mohdnaeemghadai@gmail.com"} have a message for you.`,
        html: successEmailTemplate({
          emailFrom: "mohdnaeemghadai@gmail.com",
          username: userFound.username,
          password: userFound.password,
        }),
      })
        .then(async () => {
          await userFound.save();
          return res.status(201).json({ success: `User ${user} is approved!` });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: "Error in sending email." });
        });
    } else if (userFound.isApproved === "Rejected" && userFound) {
      sendEmail({
        from: "mohdnaeemghadai@gmail.com",
        to: userFound.email,
        subject: "Your Application is Rejected",
        text: `${"mohdnaeemghadai@gmail.com"} have a message for you.`,
        html: rejectionEmailTemplate({
          emailFrom: "mohdnaeemghadai@gmail.com",
          username: userFound.username,
        }),
      })
        .then(async () => {
          await userFound.save();
          return res.status(201).json({ success: `User ${user} is rejected!` });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: "Error in sending email." });
        });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const changePassword = async (req, res) => {
  try {
    const { pwd, user, newPwd } = req.body;

    if (!pwd) {
      return res.status(400).json({ message: "old password is required" });
    }
    if (!user) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!newPwd) {
      return res.status(400).json({ message: "new password is required" });
    }

    let userFound = await User.findOne({ username: user }).exec();
    if (!userFound) {
      return res.sendStatus(404); //Not Found
    }

    if (pwd !== userFound.password) {
      return res.sendStatus(401); //Unauthorized
    }
    if (userFound.newUser === true) {
      userFound.password = await bcrypt.hash(newPwd, 10);
      userFound.newUser = false;
      userFound.updatedAt = new Date();
      userFound.save();

      res.status(200).json({ success: `Password updated successfully!` });
    } else {
      return res.status(400).json({ message: "User is not new" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = {
  handleNewUser,
  verifyUser,
  deleteUser,
  changePassword,
  handleNewUserByAdmin,
  updateUser,
  getUser,
  getAllUsers,
};
