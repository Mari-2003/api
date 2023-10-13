const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const schema = new Schema({
    

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneno:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
},{timestamps:true});

const login = mongoose.model('loginDetails',schema)

module.exports = login;