import usersModel from '../model/usersModel' 

class UserController{
    getUserByEmail(req, res){
        const value = [req.params.email]
        const user = usersModel.selectAUser(value)
        user.then(rows => {
            if(rows.length > 0){
                const {id} = rows[0]
                return res.status(200).send({
                    status: 200,
                    data: [{
                        id
                    }]
                })
            }else{
                return res.status(404).send({
                    status: 404,
                    error: "No such user exist"
                })
            }
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })
    }

    getUserById(req, res){
        const value = [req.params.id]
        const user = usersModel.selectUserById(value)
        user.then(rows => {
            if(rows.length > 0){
                delete rows[0].password
                return res.status(200).send({
                    status: 200,
                    data: [rows[0]]
                })
            }else{
                return res.status(404).send({
                    status: 404,
                    error: "No such user exist"
                })
            }
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })
    }

    editUser(req, res){
        const {id} = req.params
        const {firstname, othername, lastname, phoneNumber} = req.body
        const values = [firstname, othername, lastname, phoneNumber, id]
        const user = usersModel.updateUser(values)
        user.then(rows => {
            if(rows.length > 0){
                delete rows[0].password
                return res.status(200).send({
                    status: 200,
                    data: [rows[0]]
                })
            }else{
                return res.status(500).send({
                    status: 500,
                    error: "Something went wrong, cannot process your request. Pleae try again"
                })
            }
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })
    }

    editUserPassport(req, res){
        const {id} = req.params
        const {passporturl} = req.body
        const values = [passporturl, id]
        const user = usersModel.updateUserPassport(values)
        user.then(rows => {
            if(rows.length > 0){
                const passportUrl = rows[0].passporturl
                return res.status(200).send({
                    status: 200,
                    data: [{
                        id: rows[0].id,
                        passportUrl
                    }]
                })
            }else{
                return res.status(500).send({
                    status: 500,
                    error: "Something went wrong, cannot process your request. Pleae try again"
                })
            }
        }).catch(error => {
            return res.status(500).send({
                status: 500,
                error: "Something went wrong, cannot process your request. Pleae try again"
            })
        })
    }
}

const userController = new UserController()
export default userController
