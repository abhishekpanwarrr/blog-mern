import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (
      !fullName ||
      !email ||
      !password ||
      fullName === "" ||
      email === "" ||
      password === ""
    ) {
      return res.status(400).json({ msg: "All fields are required!" });
    }
    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .json({ msg: `Email ${email} is already registered.` });
    }
    // Creating a new user and hashing the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    await newUser.save();
    delete newUser.password;

    return res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all details" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid Email or Password" });
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ msg: "Invalid Email or Password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Create a new object without the password property
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    res.cookie("auth_token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // Expires in 7 days
    res.json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

export { createUser, loginUser };
