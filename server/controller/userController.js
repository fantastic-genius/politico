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
}

const userController = new UserController()
export default userController
