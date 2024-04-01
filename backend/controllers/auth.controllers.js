import bcrypt from "bcryptjs"; 
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async(req, res) => {
  console.log("username,", req.body)
  try {
    const {fullName,username,password,confirmPassword,gender} = req.body;
    if(password !== confirmPassword) {
      return res.status(400).json({error:"Password don't match!"});
    }

    const user = await User.findOne({username});

    if(user) {
      return res.status(400).json({error:"User already exists!"});
    }

    //Hash Password 
    const salt = await bcrypt.genSalt(10);
    const hPassword = await bcrypt.hash(password,salt);
    // generate random profile pic
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      userName:username,
      password:hPassword,
      gender,
      profilePic: gender === "male" ?  boyProfilePic : girlProfilePic
    })
    if (newUser) {
      // Generate JWT Token
      generateTokenAndSetCookie(newUser._id, res);
      console.log("new user",newUser)
      await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.userName,
      profilePic: newUser.profilePic,
    });
    } 
    else {
      res.status(400).json({error: "Invalid User Data"});
    }
  } 
  catch (error) {
    console.log("Error Signing Up", error.message);
    res.status(500).json({error:"Internal server error"});
  }
};

export const login = async (req, res) => {
  try {
    const {userName,password} = req.body;
    const user = await User.findOne({userName});
    const isPasswordvalid = await bcrypt.compare(password, user?.password || "");

    if(!user ||  !isPasswordvalid){
      return res.status(400).json({error:"Invalid Credentials."});
    }
    
    //JWT token generation and setting cookie
    generateTokenAndSetCookie(user._id,res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });

  } catch (error) {
    console.log("Error in login controller", error.message);
  res.status(500).json({error:"Internal server error"});
  }
};

export const logout =(req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};