import User from "../models/user.model.js";

const createGoolgeUser = async (req, res) => {
  try {
    const { fullName, email, id, photoUrl, token, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ msg: `Email ${email} is already registered.` });
    }
    const newUser = new User({
      fullName: fullName,
      email: email,
      googleId: id,
      profilePicture: photoUrl,
      token: token,
      password: password,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(`Error at creating a Google User ${error}`);
  }
};

export { createGoolgeUser };
