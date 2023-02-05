const User = require("../schemas/users");
const bcrypt = require("bcrypt")
require('dotenv').config();
const registeUser = async (req, res) => {
  try {
    const { firstName, middleName, email, password } = req.body;
    let user = await User.findOne({ email: email});
    if (user) return res.status(400).send("User already registered.");
    console.log(email);
    user = new User({ firstName:firstName, middleName:middleName, email:email, password:hasshpassword });
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.status(200).send(" User was successfull registered");
  } catch (error) {
    return res.status(500).send("Iternal server error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).send("Invalid email or password.");
    let confirmPassword=await bcrypt.compare(user.password, password);
    if(!confirmPassword) return res.status(400).send("Invalid email or password."); 
    const token = jwt.sign({ email: user.email,_id: user._id}, process.env.SECRET,{ expiresIn: "24h" });
    return res.status(200).send({token });
  } catch (error) {
    return res.status(500).send("Iternal server error");
  }
};

module.exports = {
  registeUser,
  loginUser,
};
