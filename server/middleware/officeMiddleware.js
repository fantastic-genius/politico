class OfficeMiddleware{
    createOfficeMiddleware(req, res, next){
        if(!req.body.type){
            return res.status(400).send({
                status: 400,
                error: "Office type not included in the data posted" 
            })
        }else if(!req.body.name){
            return res.status(400).send({
                status: 400,
                error: "Office name not included in the data posted" 
            })
        }

        next();
    }
}
const officeMiddleware = new OfficeMiddleware()
export default officeMiddleware
