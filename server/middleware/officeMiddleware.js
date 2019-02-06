import {offices} from "../db/db"
class OfficeMiddleware{
    createOfficeMiddleware(req, res, next){
        if(!req.body.type || !(req.body.type).trim()){
            return res.status(400).send({
                status: 400,
                error: "Office type not included in the data posted" 
            })
        }else if(!req.body.name || !(req.body.name).trim()){
            return res.status(400).send({
                status: 400,
                error: "Office name not included in the data posted" 
            })
        }else if(!isNaN(parseInt(req.body.type))){
            return res.status(400).send({
                status: 400,
                error: "Office type contains an integer instead of a string" 
            })
        }else if(!isNaN(parseInt(req.body.name))){
            return res.status(400).send({
                status: 400,
                error: "Office name contains an integer instead of a string" 
            })
        }

        offices.map(office => {
            if(office.name === req.body.name){
                return res.status(412).send({
                    status: 412,
                    error: `${req.body.name} already existed` 
                })
            }
        })

        next();
    }
}
const officeMiddleware = new OfficeMiddleware()
export default officeMiddleware
