import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Token from '../models/Token.js';
import createError from './errorController.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utility/sendEmail.js';
import { createToken } from '../utility/createToken.js';
// import { sendEmail } from '../utility/sendEmail.js';
// import { sendSms } from '../utility/sendSms.js';


/**
 * @access public
 * @route /api/user
 * @method GET
 */

export const getAllUsers = async (req, res, next) => {
    try {
       const users = await User.find();
       res.status(200).json(users);
    } catch (error) {
       next(createError( 404, 'ki hobe amar'));
    }
}

/**
 * @access public
 * @route /api/suer
 * @method POST
 */

export const createUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hass_pass = await bcrypt.hash(req.body.password, salt);
    try {
        const user = await User.create({...req.body, password : hass_pass}); 
        res.status(200).json(user);
     } catch (error) {
         console.log(error);
     }
}

/**
 * @access public
 * @route /api/user/:id
 * @method GET
 */

export const getSingleUser = async (req, res, next) => {
    const {id} = req.params;
    try {
        const single_user = await User.findById(id);
        if(!single_user){
            return next(createError(404, 'Single Student Not Found'))
           }
        if(single_user){
            res.status(200).json(single_user);
        }
        
    } catch (error) {
        next(error);
    }
}

/**
 * @access public
 * @route /api/user/:id
 * @method PUT/PATCH
 */

export const updateUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true }); 
        res.status(200).json(user);
     } catch (error) {
         console.log(error);
     }
}

/**
 * @access public
 * @route /api/user/:id
 * @method DELETE
 */

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndDelete(id); 
        res.status(200).json(user);
     } catch (error) {
         console.log(error);
     }
}

/**
 * @access public
 * @route /api/user/login
 * @method POST
 */

 export const userLogin = async (req, res, next) => {
    //Get body data
    // const { email, password} = req.body;

    try {
        //find user
        const login_user = await User.findOne({email : req.body.email});
        
        //check user exists or not
        if(!login_user){
            return next(createError(404, "User Not Found"));
        }

        //check password
        const check_password = await bcrypt.compare(req.body.password, login_user.password);

        //handle password
        if(!check_password){
            return next(createError(404, "Wrong Password"))
        }


        //create token
        const token = jwt.sign({id : login_user._id, isAdmin : login_user.isAdmin}, process.env.JWT_SECRET)

        //login user info
        const {password, isAdmin, ...login_info} = login_user._doc;
        res.cookie("access_token", token).status(200).json({
            token : token,
            user : login_info
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @access public
 * @route /api/user/register
 * @method POST
 */

 export const userRegister = async (req, res, next) => {

    const salt = await bcrypt.genSalt(10);
    const hass_pass = await bcrypt.hash(req.body.password, salt);
    try {
        //user data send
        const user = await User.create({...req.body, password : hass_pass}); 
        //create token
        const token = createToken({id : user._id});
        //token update
        await Token.create({userId: user._id, token : token});
        //send activation email
        const verify_link = `http://localhost:3000/user/${user.id}/verify/${token}`;
        await sendEmail(user.email, 'verify_account', verify_link);
        // await sendEmail(user.email, 'Instagram', `Hi ${user.name}, please verify your account`);
        // sendSms();
        res.status(200).json({
            message : 'Successfull'
        });
     } catch (error) {
         console.log(error);
     }
}

/**
 * @access public
 * @route /api/me
 * @method GET
 */

export const getLoggedInUser = async ( req, res, next ) => {
    
    try {
        //get token
        const bearer_token = req.headers.authorization;
        let token = '';
        
        if (bearer_token) {
            token = bearer_token.split(' ')[1];
            
            //get token user
            const logged_in_user = jwt.verify(token, process.env.JWT_SECRET);

            //check user
            if (!logged_in_user) {
                next(createError(400, 'Invalid Token'));
            }

            if (logged_in_user) {
                const user = await User.findById(logged_in_user.id);
                res.status(200).json(user);
            }
        }

        //check token exist
        if (!bearer_token) {
            next(createError(404, 'token not found'))
        }
    } catch (error) {
        next(error)
    }
}

//verify user account
export const verifyUserAccount = async (req, res, next) => {
    try {

        const {id, token} = req.body;
        console.log(id,token);

        //check token
        const verify = await Token.findOne({userId : id, token : token});

        //check verify
        if (!verify) {
            next(createError(404, "Invalid verify url"));
        }
        if (verify) {
            await User.findByIdAndUpdate( id, {
                isVerified : true
            });
            res.status(200).json({ message : 'User account verified successfully'});
            verify.remove();
        }


    } catch (error) {
        console.log(error);
    }
}

//Password Recover link generate
export const recoverPassword = async (req, res, next) => {
    try {
        //get email
        const {email} = req.body;

        //check email
        const recover_user = await User.findOne({ email });

        //check exist
        if (!recover_user) {
            res.status(404).json({
                message : "email not exist"
            })
        }

        if (recover_user) {
            const token = createToken({ id : recover_user._id }, '1d');

            const recover_url = `http://localhost:3000/password-recover/${token}`

            await Token.create({
                userId : recover_user._id,
                token : token
            });

            sendEmail(recover_user.email, 'Password Reset', recover_url);

            res.status(200).json({
                message : "password Recovery link sent"
            })
           
        }
        
    } catch (error) {
        next(createError(error));
    }
}


//reset password
export const resetPassword = async (req, res, next) => {

    try {

        //get form data
        const { token, password } = req.body;

        //get user id
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        //make hash pass
        const salt = await bcrypt.genSalt(10);
        const hass_pass = await bcrypt.hash(password, salt);

        if (id) {
            
            const user_details = await User.findByIdAndUpdate(id, {
                password : hass_pass
            });
            res.send('Password has been changed successfully')
        }
        
    } catch (error) {
        next(createError('time out'))
    }

}