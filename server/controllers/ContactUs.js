const { contactUsEmail } = require("../mail/template/contactFormRes")
const { mailSender } = require("../utilis/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  try {
    await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )

    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong..." + error.message,
    })
  }
}
