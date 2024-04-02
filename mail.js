const sgMail = require('@sendgrid/mail') // to send mail
require('dotenv').config()
const {SENDGRID_EMAIL, SENDGRID_KEY, HOST} = process.env
sgMail.setApiKey(SENDGRID_KEY)

module.exports.sendEmail = (data) => {
  let mail = {}
  if (data.type == 'forgotPassword') {
    mail = {
      to: `${data.email}`,
      from: `Sparkle Account Forgot Password <${SENDGRID_EMAIL}>`,
      subject: 'Forgot Password Request',
      text: 'Some useless text',
      html: `<p>You are receiving this because you have requested for a password changed for your account.\n\n Your verification code is ${data.verifyCode} \n\n  Have a Sparkling day.\n reset password <a href='${HOST}/reset-password?email=${data.email}&code=${data.verifyCode}'>here</a> </p>`,
    }
  } else {
    mail = {
      to: `${data.email}`,
      from: `Sparkle Account Change Password <${SENDGRID_EMAIL}>`,
      subject: 'Change Password Request',
      text: 'Some useless text',
      html: `<p>You are receiving this because you have successfully change password for your account.\n\n  Have a Sparkling day.\n </p>`,
    }
  }

  sgMail
    .send(mail)
    .then((res) => {
      return res[0].statusCode
    })
    .catch((error) => {
      return console.error(error)
    })
}
