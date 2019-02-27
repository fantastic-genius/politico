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


///----####---GET OFFICES START----####----///
const offices_tbl = document.querySelector('#offices')
if(offices_tbl){
    fetch('https://politico-gen.herokuapp.com/api/v1/offices', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'x-access-token': token
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.status == 200){
            const tbl_body = document.querySelector('#offices > tbody')
            let rows = ''
            const offices = data.data
            offices.forEach(office => {
                rows += `<tr>
                            <td>${office.name}</td>
                            <td>${office.type}</td>
                            <td>
                                <button class="edit btn btn-warning"><a href="edit_office.html?id=${office.id}">edit</a></button>
                                <button class="delete btn btn-danger" data-id="${office.id}">delete</button>
                            </td>
                        </tr>`
            })

            tbl_body.innerHTML = rows
        }else{
            displayMessage('danger', data.error)
        }
    }).catch(error => {
        console.log(error)
    })
}

///----####---GET OFFICES END----####----///


///----####---REGISTER CANDIDATE START----####----///
const register_form = document.querySelector('#register-form')

const registerCandidate = (e) => {
    e.preventDefault()
    const formData = new URLSearchParams(new FormData(register_form))
    const user_id = document.querySelector('#user-id').value
    fetch(`https://politico-gen.herokuapp.com/api/v1/offices/${user_id}/register`, {
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
            document.querySelector('#user-id').value = ''
            document.querySelector('#email').value = ''
            const register_btn = document.querySelector('#register-btn')
            register_btn.setAttribute('disabled', 'disabled')
            displayMessage('success', 'Candidate successfully registered')
        }else{
            displayMessage('danger', data.error)
        }
    })
}

const searchUser = (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value
    if(!email || ! email.trim()){
        displayMessage('danger', "User email not provided")
    }else{
        fetch(`https://politico-gen.herokuapp.com/api/v1/users/${email}/email`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': token
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            if(data.status == 200){ 
                document.querySelector('#user-id').value = data.data[0].id
                const register_btn = document.querySelector('#register-btn')
                register_btn.removeAttribute('disabled')
                register_form.addEventListener('submit', registerCandidate)

                displayMessage('success', 'User was found. Register button enabled for registration of the politician searched for')
            }else{
                displayMessage('danger', data.error)
            }
        })
    }

}

if(register_form){
    const search_btn = document.querySelector('#search-btn')
    search_btn.addEventListener('click', searchUser)
}
///----####---REGISTER CANDIDATE END----####----///
