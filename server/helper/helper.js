import usersModel from "../model/usersModel"

class Helper{
    isValidEmail(email){
        return /\S+@\S+\.\S+/.test(email)
    }

}

const helper = new Helper()
export default helper
