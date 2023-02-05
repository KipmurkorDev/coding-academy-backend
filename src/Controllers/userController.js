const User = require("../schemas/users");
const bcrypt = require("bcrypt")
require('dotenv').config();
const registeUser = async (req, res) => {
  try {
    const { firstName, middleName, lastName, email, password } = req.body;
    let user = await User.findOne({ email: email});
    if (user) return res.status(400).send("User already registered.");
    let hashpassword = await bcrypt.hash(password, 8);
    console.log(hashpassword);
    user = new User({ firstName:firstName, middleName:middleName, lastName:lastName, email:email, password:hashpassword });
    console.log(user);
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
