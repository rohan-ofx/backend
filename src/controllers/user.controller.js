import {asynchandler} from "../utils/asynchandler.js"
import { ApiError } from "../utils/ApiError.js";
import { user } from "../models/user.model.js";
import {uploadoncloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


const registerUser = asynchandler(async(req , res)=>{
  const {fullName , email , username , password} = req.body  
  console.log("email : ",email );

  if(
    [fullName , email, username , password].some((field)=>
    field?.trim() === "")
  ){
    throw new ApiError(400 , "All fields  are required")
  }

    const exixteduser = user.findOne({
        $or: [{username} , {email}]
    })

    if(exixteduser){
        throw new ApiError(409, "user with email or username already exists")
    }

     const avatarlocalpath = req.files?.avatar[0]?.path;
     const coverimagelocalpath = req.files?.coverimage[0]?.path;

     if(!avatarlocalpath){
        throw new ApiError(400 , "Avatar file is required");
     }


     const avatar = await uploadoncloudinary(avatarlocalpath)
     const coverimage = await uploadoncloudinary(coverimagelocalpath)
    

     if(!avatar){
        throw new ApiError(400 , "Avatar file is required");
     }

      const user =  await user.create({
        fullName,
        avatar : avatar.url,
        coverimage : coverimage?.url ||  "",
        email,
        password ,
        username : username.toLowerCase()
     })
     const createduser = await user.findById(user._id).select(
        "-password -refreshToken"
     )

     if(!createduser){
        throw new ApiError(500, "something went wrong while registering the user")
     }

     return res.status(201).json(
        new ApiResponse(200, createduser , "user register successfully")
     )

})

export default registerUser;