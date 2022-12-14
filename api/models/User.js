import mongoose from 'mongoose';


//create Student Schema
const userSchema = mongoose.Schema({

    name : {
        type : String,
        require : true,
        trim : true
    },
    email : {
        type : String,
        require : true,
        trim : true,
        unique : true
    },
    cell : {
        type : String,
        trim : true,
    },
    username : {
        type : String,
        require : true,
        trim : true,
       
    },
    age : {
        type : Number,
    },
    gender : {
        type : String,
    },
    password : {
        type : String,
        require : true,
        trim : true
    },
    photo : {
        type : String,
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    status : {
        type : Boolean,
        default : true
    },
    trash : {
        type : Boolean,
        default : false
    }
    

}, {
    timestamps : true
});



//export model

export default mongoose.model('User', userSchema)