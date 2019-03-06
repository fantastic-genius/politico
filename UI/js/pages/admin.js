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
