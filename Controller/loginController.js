const jwt = require('jsonwebtoken');
const login = require('../models/Schema')



//registeration...................

const registerUser = async(req,res)=>{
    try {
        const { name, email,phoneno, password } = req.body;

        
        if(!name||!email||!phoneno||!password ){
          res.status(202).json({message: "All fields are Required!"});
        }
          
        const nameParts = name.split(' ');

        // Check if there are exactly two name parts
        
        if (nameParts.length !== 1 || nameParts.length !== 2){
            return res.status(400).json({ message: "Exactly two names are required" });
        }
        
      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //check the email validation

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await login.findOne({ email });
        //check email already register are not

        if (existingUser) {
            return res.status(409).json({ message: "Email is already in use" });
        }

        const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!]).{8,14}$/;
        //check password valid format

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must required 8 characters ",
            });
        }

        const newUser = await login.create({
          name,
          email,
          phoneno,
          password
      })
      
      return res.status(200).json(newUser)
       
    } catch (err) {
       res.status(402).json({message:"error something went to wrong"})
       console.log(err)
    }
};


const loginuser=async(req,res)=>{
   
    try{
      let {email,password} = req.body
      
       const user= await login.findOne({email})
       //check email valid or not

       if(!user){
        res.status(404).json({error:"invalid email Id"})
      }

      
      const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&+=!]).{8}$/;
      //check password correct format

      if (!passwordRegex.test(password)) {
          return res.status(400).json({
              message: "incorrect password ",
          });
      }
        let token;
        //Creating jwt token
        token = jwt.sign(
            { userId: user.id, email: user.email },
            "secretkeyappearshere",
            { expiresIn: "5m" }
          );

         
        
          res.status(200).json({
            success: true,
            data: {
              token: token,
            },
          });


    }catch(err){
        console.error(err)
        res.status(404).json({error:"Error! : something went wrong"})
        
    }
    };
    
    const accessuser =async(req, res)=>{
      try{
      const token =await req.headers.authorization.split(' ')[1];
      //Authorization Bearer TOKEN
      if(!token)
      {
          res.status(200).json({success:false, message: "Error! : Token was not provided." })
      }else{
    try{
      //Decoding the token
      const decodedToken = await jwt.verify(token,"secretkeyappearshere" );
      res.status(200).json({success:true, data: {userId: decodedToken.userId, email: decodedToken.email}});
     
  }catch(err){
          console.error(err);
      res.status(401).json({ success: false, message: "Error! Token is invalid or expired." });
    
      }
  }
  }catch(err){
      console.log(err)
      res.status(500).json({err:message.err})
  }
  }
       
module.exports ={
    registerUser,
    loginuser,
    
    accessuser
}
