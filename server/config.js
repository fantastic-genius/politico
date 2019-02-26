import {Pool} from "pg"
import dotenv from "dotenv"
import cloudinary from 'cloudinary'
import cloudinaryStorage from 'multer-storage-cloudinary'

dotenv.config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})

const storage = cloudinaryStorage({
    cloudinary,
    folder: 'politico',
    allowedFormat: ['jpg', 'png']
})

export {pool, storage}
