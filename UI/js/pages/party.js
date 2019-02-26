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


///----####---SIGNUP START----####----///
const addPartyForm = document.querySelector('#add-party')
const addParty = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token')
    const formData = new FormData(addPartyForm)
    fetch('http://localhost:5000/api/v1/parties', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'x-access-token': token
        },
        body: formData
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.status == 201){
            const msg = `You have successfuly created a new party`
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

if(addPartyForm){
    addPartyForm.addEventListener('submit', addParty)
}

///----####---SIGNUP END----####----///