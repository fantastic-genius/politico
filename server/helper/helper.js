import usersModel from "../model/usersModel"
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import debug from 'debug'

dotenv.config()
const debugg = debug('helper:')
class Helper{
    isValidEmail(email){
        return /\S+@\S+\.\S+/.test(email)
    }

    async sendMail(from, to, subject, body){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        })

        const mailOptions = {
            from,
            to,
            subject,
            html: body
        }

        try {
            const info = await transporter.sendMail(mailOptions)
            return info
        } catch (error) {
            debugg(error)
        }
    }
}

const helper = new Helper()
export default helper
