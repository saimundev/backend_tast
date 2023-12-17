import AuthModel from "../models/auth.js";
import bcrypt from "bcrypt";
import joi from "joi";
import genAuthToken from "../utils/genAuthToken.js";

//create user
export const singUp = async (req, res) => {
  const { name, email, password } = req.body;

  //validation schema
  const validationSchema = joi.object({
    name: joi.string().min(3).max(35).required().messages(),
    email: joi.string().min(5).max(35).required().email(),
    password: joi.string().min(5).max(35).required(),
  });

  //validation error message
  const { error } = validationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const isUserExist = await AuthModel.findOne({ email: email });

    //is user exist
    if (isUserExist)
      return res.status(400).json({ message: "User Already exist" });
    const user = await AuthModel.create({
      name,
      email,
      password: hashPassword,
    });

    //create user token
    const token = await genAuthToken(user);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//login user
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await AuthModel.findOne({ email: email });

    if (!isUserExist.isAdmin)
      return res.status(400).json({ message: "You are not admin" });

    if (!isUserExist)
      return res.status(400).json({ message: "User Not Found" });

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordMatch)
      return res.status(400).json({ message: "Password not match" });
    console.log(isUserExist);

    const token = genAuthToken(isUserExist);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
