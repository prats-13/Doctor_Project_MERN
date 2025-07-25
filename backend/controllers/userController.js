import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'

/* api controller function to register a new user*/

const registerUser=async(req,res)=>{
  try{
    const {name,email,password}=req.body

    if(!name || !email || !password){
      return res.json({success:false,message:"Missing details"})
    }

    if(!validator.isEmail(email)){
      return res.json({success:false,message:"Enter a valid email"})
    }

    if(password.length<8){
      return res.json({success:false,message:"Password length must be atleast 8"})
    }

    /* hashing user password */
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const userData={
      name,
      email,
      password:hashedPassword
    }

    const newUser=new userModel(userData)
    const user=await newUser.save()
    /* in the user object we get a _id property and by using this we will create a token so user can login on the website */

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    
    res.json({success:true,token})
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

/* API for user login */
const loginUser=async(req,res)=>{
  try{
    const {email,password}=req.body
    const user=await userModel.findOne({email})

    if(!user){
      return res.json({success:false,message:'User does not exist'})
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if(isMatch){
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
      res.json({success:true,token})
    }else{
      res.json({success:false,message:"Invalid credentials"})
    }
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

/* api to get user profile data */

const getProfile=async(req,res)=>{
  try{
    const {userId}=req.body

    const userData=await userModel.findById(userId).select('-password')

    res.json({success:true,userData})
  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

/* api to update user profile */

const updateProfile=async(req,res)=>{
  try{
    const {userId,name,phone,address,dob,gender}=req.body
    const imageFile=req.file

    if(!name || !phone || !address || !dob || !gender){
      return res.json({success:true,message:"Data missing"})
    }

    await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

    if(imageFile){
      /* upload image to cloudinary */
      const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
      const imageURL=imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId,{image:imageURL})
    }

    res.json({success:true,message:"Profile updated"})

  }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

export {registerUser,loginUser,getProfile,updateProfile}

















/* login register getprofile update profile book appointment displaying book appointment cancelling appointment payment gateway*/