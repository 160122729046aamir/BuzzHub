import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body;
    if (!fullName||!email||!password){
        return res.status(404).json({message:'All fields are required'})
    }
    try{
        if (password.length<6){
        return res.status(400).json({message:'Password must be of length 6'})
    }
    const user=await User.findOne({email})
    if (user){
        return res.status(400).json({message:'Email Already Exists!'})
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=new User({
        email,fullName,password:hashedPassword
    })
    if (newUser){
        generateToken(newUser._id,res);
        await newUser.save()
        return res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email
        })
    }else{
        return res.status(400).json({message:'Invalid User Data!!'})
    }
}catch(err){
    console.log('Error in signup controller',err.message)
    return res.status(500).json({message:'Internal Server Error'})
}
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      generateToken(user._id, res);
  
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const logout=(req,res)=>{
    try{
    res.cookie('jwt','',{maxAge:0})
    return res.status(200).json({message:"logout was successful"})
}
    catch(error){
        console.log("Error in logout server: ",error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const updateProfile=async(req,res)=>{
  try {
    const {profilePic}=req.body;
    const userId=req.user._id;
    if (!profilePic || typeof profilePic !== 'string'){
        return res.status(400).json({message:"Profic Pic Must Be Provided!"})
    }
    const uploadResponse=await cloudinary.uploader.upload(profilePic)
    const updatedUser=await User.findByIdAndUpdate(userId,{profilePic: uploadResponse.secure_url},{new:true})
    if (!updatedUser){
        return res.status(400).json({message:"No Such User Exists (Profile Pic)!"})
    }
    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log("Error in profile request: ",error.message)
    return res.status(500).json({message:"Internal Server Error"})
  } 
}

export const checkAuth=async(req,res)=>{
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller: ",error.message)
        return res.status(500).json({message:"Internal Server Error"})
    }
}