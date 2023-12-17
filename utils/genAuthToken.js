import jwt from "jsonwebtoken";
const genAuthToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
};

export default genAuthToken;
