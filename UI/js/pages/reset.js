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

///----####---RESET START----####----///
const reset_form = document.querySelector('#reset-form')
const resetPassword = (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value
    const cur_url = window.location.href
    let url_arr = cur_url.split('/')
    url_arr.pop()
    url_arr.push('reset_password.html')
    const new_url = url_arr.join('/')
    const baseUrl = new_url

    fetch('https://politico-gen.herokuapp.com/api/v1/auth/reset',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            baseUrl
        })
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.status == 200){
            displayMessage('success', data.data[0].message)
            document.querySelector('#email').value = ''
        }else{
            displayMessage('danger', data.error)
        }
    })
}

if(reset_form){
    reset_form.addEventListener('submit', resetPassword)
}

///----####---RESET END----####----///


///----####---PASSWORD RESET START----####----///
const password_form = document.querySelector('#password-form')
const changePassword = (e) => {
    e.preventDefault()
    const url = new URL(window.location.href)
    const resetToken = url.searchParams.get('reset')
    const password = document.querySelector('#password').value
    const conf_password = document.querySelector('#conf-password').value
    if(password !== conf_password){
        displayMessage('danger', "Password entered doesn't match")
    }else{
        fetch('https://politico-gen.herokuapp.com/api/v1/auth/reset/password', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                resetToken,
                password
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data.status == 200){
                const login_url = `Login here <a href='login.html'>LOGIN</a>`
                displayMessage('success', data.message + '. ' + login_url)
            }else{
                displayMessage('error', data.error)
            }
        })
    }
}

if(password_form){
    password_form.addEventListener('submit', changePassword)
}
///----####---PASSWORD RESET END----####----///
