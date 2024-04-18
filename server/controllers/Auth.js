const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
const { mailSender } = require("../utilis/mailSender");
require("dotenv").config();

// send otp
exports.sendOTP = async (req, res) => {
  try {
    // fetch email
    const { email } = req.body;

    // check user already present or not
    const checkuserpresent = await User.findOne({ email });

    // if yes
    if (checkuserpresent) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    // if no generate otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    // console.log("otp generated is: " + otp)

    // uniqueness
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp });
    }
    // console.log("Auth.js 47")

    //create DB entry
    const otpBody = await OTP.create({ email: email, otp: otp });
    console.log(otpBody, "otp, 50")

    //send response
    return res.status(200).json({
      success: true,
      message: "OTP sent sucessfully",
      otp: otpBody.otp,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//signup
exports.signUp = async (req, res) => {
  try {
    console.log(req.body.otp)
    // data fetch from req.body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;
    // console.log(otp, "backend")
    //data validate
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All required field are not filled",
      });
    }
    console.log(req.body.otp, "92")

    //check 2 password are match or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password not matched",
      });
    }

    //check user already exist
    const existingUser = await User.findOne({ email });
    console.log(req.body.otp, "104")

    //if user exist
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    //find most recent otp
    const recentOTP = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(-1);
    console.log(recentOTP, otp, "118");
    //validate otp
    if (otp !== recentOTP[0].otp) {
      return res.status(400).json({
        success: false,
        message: "OTP doesn't matched",
        // recentOTP,
        // otp,
      });
    } else if (recentOTP.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    //hash password
    let hashPassword;
    hashPassword = await bcrypt.hash(password, 10);

    // Create the user
    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    //create db entry
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      confirmPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    //send response
    return res.status(200).json({
      success: true,
      message: "user signUp ucessfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user can't be registered",
      e: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //extract data from req.body
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //user registered?
    const isExistUser = await User.findOne({ email })
      .populate("additionalDetails")
      .exec();
    // console.log(isExistUser)
    //if not
    if (!isExistUser) {
      return res.status(400).json({
        success: false,
        message: "user doesn't exist you have to registered first",
      });
    }
    // console.log(isExistUser.password)
    //password matching
    if (await bcrypt.compare(password, isExistUser.password)) {
      //create token
      const payload = {
        id: isExistUser._id,
        email: isExistUser.email,
        accountType: isExistUser.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      isExistUser.token = token;
      isExistUser.password = undefined;

      //create cookie
      const options = {
        expiresIn: new Date(Date.now() + 60 * 1000),
        // maxAge: 60*1000,
        httpOnly: true,
        secure: true,
        // domain: "127.0.0.1",
        sameSite: "none",
      };
      // console.log("hello world1")

      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: isExistUser,
        message: "Loggedin sucessfully",
      });
      // console.log("hello world")
    } else {
      return res.status(400).json({
        success: false,
        message: "password not matched",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failure, please try again",
      hint: error.message,
    });
  }
};

//change password
exports.changePassword = async (req, res) => {
  try {
    //data fetch from req body
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    // console.log(req.body)
    //validation
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All required fields are not filled",
      });
    }

    //find user by id
    const userDetails = await User.findById(req.user.id);

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }
    // hasUser= hasUser.toObject()
    // console.log(hasUser.password);
    //match password
    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    // try {
    // 	const emailResponse = await mailSender(
    // 		updatedUserDetails.email,
    // 		`For update password`,
    // 		`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`

    // 	);
    // 	// console.log("Email sent successfully:", emailResponse.response);
    // } catch (error) {
    // 	// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
    // 	console.error("Error occurred while sending email:", error);
    // 	return res.status(500).json({
    // 		success: false,
    // 		message: "Error occurred while sending email",
    // 		error: error.message,
    // 	});
    // }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    // console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
