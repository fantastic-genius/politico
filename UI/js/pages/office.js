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


///----####---CREATE AN OFFICE START----####----///
const office_form = document.querySelector('#add-office')

const createParty = (e) => {
    e.preventDefault()

    const formData = new URLSearchParams(new FormData(office_form))
    fetch('https://politico-gen.herokuapp.com/api/v1/offices', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'x-access-token': token
        },
        body: formData
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.status == 201){
            const msg = `You have successfuly created office for ${data.data[0].name}`
            displayMessage('success', msg)
            document.querySelector('#name').value = ''
        }else{
            displayMessage('danger', data.error)
        }
    })
}

if(office_form){
    office_form.addEventListener('submit', createParty)
}

///----####---CREATE AN OFFICE END----####----///
