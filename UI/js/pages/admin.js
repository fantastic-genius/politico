const token = sessionStorage.getItem('token')
const isAdmin = sessionStorage.getItem('is_admin')
if(!token || isAdmin == 'false'){
    window.location.replace('login.html')
}
//Method to display alert message
const displayMessage = ((type, msg) => {
    const alertDiv = document.querySelector('#alert')
    let msgSpan = ''
    if(type == 'success'){
        msgSpan += `<div class='alert-msg alert-success'><span class='close-btn'>&times;</span><strong>Success!</strong> ${msg}</div>`
    }else if(type == 'warning'){
        msgSpan += `<span class='alert-msg alert-warning'><span class='close-btn'>&times;</span><strong>Warning!</strong> ${msg}</div>`
    }else if(type == 'info'){
        msgSpan += `<div class='alert-msg alert-info'><span class='close-btn'>&times;</span><strong>Info!</strong> ${msg}</div>`
    }else if(type == 'danger'){
        msgSpan += `<div class='alert-msg alert-danger'><span class='close-btn'>&times;</span><strong>Error!</strong> ${msg}</div>`
    }
 
    alertDiv.innerHTML = msgSpan

    const closebtn = document.querySelector('.close-btn') 
    closebtn.addEventListener('click', closeAlert)
})


///----####---CHANGE PASSWORD END----####----///
const password_form = document.querySelector('#change-psw-form')
const changePassword = (e) => {
    e.preventDefault()
    const newPassword = document.querySelector('#newPassword').value
    const confPassword = document.querySelector('#new-password-conf').value

    if(newPassword !== confPassword){
        displayMessage('danger', 'New password entered did not match')
    }else{
        const user_id = sessionStorage.getItem('user_id')
        const formData = new URLSearchParams(new FormData(password_form))
        fetch(`https://politico-gen.herokuapp.com/api/v1/auth/${user_id}/password`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'x-access-token': token
            },
            body: formData
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data.status == 200){
                displayMessage('success', data.message)
            }else{
                displayMessage('danger', data.error)
            }
        }).catch(error => {
            console.log(error)
        })
    }
}

if(password_form){
    password_form.addEventListener('submit', changePassword)
}

///----####---CHANGE PASSWORD END----####----///


///----####---PROFILE EDIT START----####----///
const profile_tbl = document.querySelector('#profile-table')

const editProfile = (e) => {
    e.preventDefault()
    const user_id = sessionStorage.getItem('user_id')
    const firstname = document.querySelector('#first-name').value
    const othername = document.querySelector('#other-name').value
    const lastname = document.querySelector('#last-name').value
    const phoneNumber = document.querySelector('#phone').value

    fetch(`https://politico-gen.herokuapp.com/api/v1/users/${user_id}`, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'x-access-token': token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            firstname,
            othername,
            lastname,
            phoneNumber
        })
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.status == 200){
            displayMessage('success', 'Your profile have been successfully updated')
            const name = data.data[0].firstname + ", " + data.data[0].lastname
            sessionStorage.setItem('user_name', name)
            document.querySelector('#user-name').innerHTML = name
        }else{
            displayMessage('danger', data.error)
        }
    }).catch(error => {
        console.log(error)
    })
}

const loadUserProfile = () => {
    const user_id = sessionStorage.getItem('user_id')
    fetch(`https://politico-gen.herokuapp.com/api/v1/users/${user_id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'x-access-token': token
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.status == 200){
            const {firstname, othername, lastname, email, phonenumber, passporturl} = data.data[0]
            document.querySelector('#first-name').value = firstname
            document.querySelector('#other-name').value = othername
            document.querySelector('#last-name').value = lastname
            document.querySelector('#phone').value = phonenumber
            document.querySelector('#email').innerHTML = email
            let passport_url = "../images/user.jpg"
            if(passporturl !== null){
                passport_url = passporturl
            }
            document.querySelector('#user-photo').src = passport_url

        }else{
            displayMessage('danger', data.error)
        }
    }).catch(error => {
        console.log(error)
    })
}

const uploadPassport = (e) => {
    e.preventDefault()
    const passport_form = document.querySelector('#passport-form')
    const formData = new FormData(passport_form)
    const user_id = sessionStorage.getItem('user_id')
    
    fetch(`https://politico-gen.herokuapp.com/api/v1/users/${user_id}/passport`,{
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'x-access-token': token
        },
        body: formData
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.status == 200){
            displayMessage('success', 'Image have been uploaded succesfully')

            const passport_url = data.data[0].passportUrl
            sessionStorage.setItem('passport_url', passport_url)
            document.querySelector('#user-photo').src = passport_url
            document.querySelector('#user-img').src = passport_url
        }else{
            displayMessage('danger', data.error)
        }
    })
}

if(profile_tbl){
    loadUserProfile()
    const update_btn = document.querySelector('#update-btn')
    update_btn.addEventListener('click', editProfile)

    const passport_form = document.querySelector('#passport-form')
    passport_form.addEventListener('submit', uploadPassport)
}
///----####---PROFILE EDIT END----####----///
