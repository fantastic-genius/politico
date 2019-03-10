import debug from "debug"

const debugg = debug("uploadImageMiddleware:")

class ImageUploadMiddleware{
    uploadImage(req, res, next){
        if(req.body.logoUrl){
            next()
        }else if(req.file){
            const {url} = req.file
            req.image = {url}
            next()
        }else if(req.body.passporturl){
            next()
        }else{
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, Unable to upload image. Please try again"
            })
        }
    }

}

const imageUploadMiddleware = new ImageUploadMiddleware()
export default imageUploadMiddleware
