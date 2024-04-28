import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createGoolgeUser = async (req, res) => {
  try {
    const { fullName, email, photoUrl } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("auth_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const newUser = new User({
        fullName: fullName,
        email: email,
        profilePicture: photoUrl,
        password: req.body.password,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("auth_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    console.log(`Error at creating a Google User ${error}`);
  }
};

const updateUser = async (req, res) => {
  if (req.user._id !== req.params.userId) {
    return res
      .status(401)
      .json({ msg: "You are not authorized to perform this action" });
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password should be at least 6 characters" });
    }
    req.body.password = await bcrypt.compare(req.body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          fullName: req.body.fullName,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log("🚀 ~ updateUser ~ error:", error);
    res.status(500).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res
        .status(401)
        .json({ msg: "You are not authorized to perform this action" });
    }
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ msg: "User has been deleted" });
  } catch (error) {
    console.log("🚀 ~ deleteUser ~ error:", error);
    res.status(500).json({ msg: error.message });
  }
};
export { createGoolgeUser, updateUser, deleteUser };
