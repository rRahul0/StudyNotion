const mongoose = require('mongoose')
const { mailSender } = require('../utilis/mailSender')

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {  
        type: Date,
        default: Date.now(),
        expires: 5*60*1000,
    }
})

async function sendVerificationEmail(email, otp) {
    try {
        await mailSender(email, "Verification Email Form StudyNotion", otp)
        // console.log("Email sent sucessfully  ", mailresponse)
    } catch (error) {
        console.log("error occured at sending email", error)
        throw error
    }
}


otpSchema.pre("save", async function (next) {
    console.log("New document saved to database");

    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
        // try {
        // const mailresponse = await mailSender(this.email, "Verification Email Form StudyNotion", this.otp)
        // } catch (error) {
        // console.log("error occured at sending email", error)
        // throw error
        // }
    }
    next();
})

module.exports = mongoose.model("OTP", otpSchema)