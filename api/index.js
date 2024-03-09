const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = 3000


app.use(cors())

app.use(bodyParser.urlencoded({ extended:false }));

app.use(bodyParser.json());
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb+srv://leon:leon@threads.0tfhgzg.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connected to MongoDB')
}).catch(err =>{
    console.log('Error connecting to MongoDB')
})

app.listen(port,()=>{
    console.log('Server is running on port 3000')
})

const User = require('./models/user')
const Post = require('./models/post')

app.post('/register', async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const salt = 10;

        const existingUser = await User.findOne({email})
        if (existingUser){
            return res.status(400).json({message:'User already registered'})
        }

        const hashPass = await bcrypt.hashSync(password,salt) 


        const newUser = new User({
            name,
            email,
            password:hashPass
        })

        await newUser.save()

        // sendVerificationEmail(newUser.email,newUser.verificationToken)

        res.status(200).json({message:"Registration successful"})
    } catch (error) {
        console.log('Error registering user',error)
        res.status(500).json({message:'Error registering user'})
    }
})

// const sendVerificationEmail = async(email,verificationToken) => {
//     // create a nodemailer transporter

//     const transporter = nodemailer.createTransport({
//         service:"gmail",
//         auth:{
//             user:"leonaleri1@gmail.com",
//             pass:
//         }
//     })

//     const mailOptions = {
//         from:"website.com",
//         to:email,
//         subject:"Email verification",
//         text:`Please click the following link to verify your email${http://localhost:3000/verify/${verificationToken}}`
//     }

//     try {
//         await transporter.sendMail(mailOptions)
//     } catch (error) {
//         console.log({"error sending mail":error})
//     }
// // }

// app.get('/verify/:token,async(req,res)=>{
//     try {
//         const token = req.params.token
//         const user = await User.findOne(verificationToken:token)
//         if (!user){
//             return res.status(404).json({message:"Invalid verification token})
//         }  

//         user.verified = true
//         user.verificationToken = undefined

//         await user.save()
//         res.status(200).json({message:"Email verified successfully")})
//     } catch (error) {
//         console.log("error getting token",error)
//         res.status(500).json({message:"Email verification failed})
//     }
// })

const generateSecretKey = ()=>{
    const secretKey = crypto.randomBytes(32).toString()
    return secretKey
}

const secretKey = generateSecretKey()

app.post('/login',async (req, res) => {
    try {
        const {email,password} = req.body

        const user = await User.findOne({email});

        if (!user){
            return res.status(404).json({message:"User does not exist"})
        }

        const passCheck = await bcrypt.compareSync(password, user.password)

        if (!passCheck){
            return res.status(404).json({message:"Password Invalid"})
        }

        const token = jwt.sign({userId:user._id},secretKey)

        res.status(200).json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Login failed"})
    }
})

// endpoint to access all users except current logged in user

app.get("/user/:userId", (req, res) => {
  try {
    const loggedInUserId = req.params.userId;

    User.find({ _id: { $ne: loggedInUserId } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((error) => {
        console.log("Error: ", error);
        res.status(500).json("errror");
      });
  } catch (error) {
    res.status(500).json({ message: "error getting the users" });
  }
});

// follow user

app.post(`/users/follow`,async(req, res)=>{
    const {currentUserId,selectedUserId} = req.body

    try {
        await User.findByIdAndUpdate(selectedUserId,{
            $push: {followers:currentUserId},
        })

        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error following user" });
    }

})

//  unfollow user

app.post(`/users/unfollow`,async(req, res)=>{
    const {loggedInUserId,targetUserId} = req.body

    try {
        await User.findByIdAndUpdate(targetUserId,{
            $pull:{followers:loggedInUserId}
        })

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: "Error unfollowing user" });
    }
})

// create a new post

app.post('/create-post',async(req, res)=>{
    try {
        const {content,userId} = req.body

        const newPostData = {
            user:userId,
        }

        if (content){
            newPostData.content = content;
        }

        const newPost = new Post(newPostData)

        await newPost.save()

        res.status(200).json({ message:'New post created successfully'})
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
})

// like a post

app.put('/post/:postId/:userId/like',async(req, res)=>{
    try {
        const postId = req.params.postId
        const userId = req.params.userId

        const post = await Post.findById(postId).populate("user","name")

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {$addToSet:{likes:userId}},
            {new:true}
        )

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        updatedPost.user = post.user

        res.json(updatedPost);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error liking post" });

    }
})

// unlike post

app.put('/post/:postId/:userId/unlike',async(req, res)=>{
    try {
        const postId = req.params.postId
        const userId = req.params.userId

        const post = await Post.findById(postId).populate("user","name")

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {$pull:{likes:userId}},
            {new:true}
        )

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        updatedPost.user = post.user

        res.json(updatedPost);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error unliking post" });

    }
})

// get all posts

app.get('/get-posts',async (req, res) => {
    try {
        const posts = await Post.find().populate("user","name profilePicture").sort({createdAt:-1})

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: "Error occurred while getting all posts" });
    }
})

app.get('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Error occurred while getting user" });

    }
})