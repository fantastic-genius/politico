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

///----####---LOGIN START----####----///
const login = (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    if(email.length == 0  || (email.trim()).length == 0){
        displayMessage('danger', 'Email not provided')
    }else if(password.length == 0  || (password.trim()).length == 0){
        displayMessage('danger', 'Password not provided')
    }else{
        fetch('https://politico-gen.herokuapp.com/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data.status == 200){
                const msg = `You have successfuly Logged In`
                const name = data.data[0].user.firstname + ", " + data.data[0].user.lastname
                let {passporturl, isadmin} = data.data[0].user
                if(passporturl == null){
                    passporturl = '../images/user.jpg'
                }

                sessionStorage.clear()
                sessionStorage.setItem('token', data.data[0].token)
                sessionStorage.setItem('email', data.data[0].user.email)
                sessionStorage.setItem('user_name', name)
                sessionStorage.setItem('passport_url', passporturl)
                if(isadmin === true){
                    window.location.replace('admin_dashboard.html')
                }else{
                    window.location.replace('user_dashboard.html')
                }
                
                displayMessage('success', msg)
            }else{
                displayMessage('danger', data.error)
            }
        }).catch(error => {
            console.log(error)
        })
    }

}

const loginBtn = document.querySelector('#login')

if(loginBtn){
    loginBtn.addEventListener('click', login)
}

///----####---LOGIN END----####----///
