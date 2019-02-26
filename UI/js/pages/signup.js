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


///----####---SIGNUP START----####----///
const signupForm = document.querySelector('#signup-form')
const signUp = (e) => {
    e.preventDefault();
    const password = document.querySelector('#password').value
    const passwordconf = document.querySelector('#password-conf').value

    if(password.length < 8){
        displayMessage('danger', 'Invalid Password Provided. Password must be not be less than 8 characters')
    }else if(password !== passwordconf){
        displayMessage('danger', 'Passwords provided doesn\'t not match')
    }else{
        const formData = new URLSearchParams(new FormData(signupForm))
        fetch('https://politico-gen.herokuapp.com/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data.status == 201){
                const msg = `You have successfuly Registered. 
                            You can log into you acount here  <a href='login.html'>Login</a>`
                displayMessage('success', msg)

                const inputFields = document.querySelectorAll('input')
                inputFields.forEach(field => {
                    field.value = ''
                })
            }else{
                displayMessage('danger', data.error)
            }
        }).catch(error => {
            console.log(error)
        })
    }

}

if(signupForm){
    signupForm.addEventListener('submit', signUp)
}

///----####---SIGNUP END----####----///
