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


///----####---CREATE PARTY START----####----///
const addPartyForm = document.querySelector('#add-party')
const addParty = (e) => {
    e.preventDefault();
    const formData = new FormData(addPartyForm)
    fetch('https://politico-gen.herokuapp.com/api/v1/parties', {
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
            let i = 1
            inputFields.forEach(field => {
                if(i < inputFields.length){
                    field.value = ''
                    i++
                }
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

///----####---CREATE PARTY END----####----///


///----####---GET ALL PARTIES START----####----///
const parties_tbl = document.querySelector('#parties')

if(parties_tbl){
    fetch('https://politico-gen.herokuapp.com/api/v1/parties', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-access-token': token
        },
        mode: 'cors'
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.status == 200){
            const tbl_body = document.querySelector('#parties > tbody')
            const parties = data.data
            let rows = ''
            parties.forEach(party => {
                rows += `<tr>
                            <td><img src="${party.logoUrl}" alt="Logo"></td>
                            <td>${party.name}</td>
                            <td>${party.hqAddress}</td>
                            <td>
                                <button class="edit btn btn-warning" data-id="${party.id}">edit</button>
                                <button class="delete btn btn-danger" data-id="${party.id}"><a href="#">delete</a></button>
                            </td>
                        </tr>`
            })
            tbl_body.innerHTML = rows
            const edit_btns = document.querySelectorAll('.edit')
            edit_btns.forEach(edit_btn => {
                edit_btn.addEventListener('click', () => {
                    const id = edit_btn.dataset.id
                    window.location.href = 'edit_party.html?id='+id
                })
            })
            
        }else{
            displayMessage('danger', data.error)
        }
    }).catch(error => {
        console.log(error)
    })
}

///----####---GET ALL PARTIES END----####----///

///----####---EDIT PARTY START----####----///
const edit_form = document.querySelector('#edit-party')

const editParty = (e) => {
    e.preventDefault()
    const url = new URL(window.location.href)
    const party_id = url.searchParams.get('id')
    const formData = new URLSearchParams(new FormData(edit_form))
    fetch(`https://politico-gen.herokuapp.com/api/v1/parties/${party_id}/name/`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'x-access-token': token
        },
        body: formData
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.status == 200){
            const msg = `The party have successfully being edited`
            displayMessage('success', msg)
            window.location.href = 'political-parties.html'
        }else{
            displayMessage('danger', data.error)
        }
    }).catch(error => {
        console.log(error)
    })
}

if(edit_form){
    const url = new URL(window.location.href)
    const party_id = url.searchParams.get('id')

    fetch(`https://politico-gen.herokuapp.com/api/v1/parties/${party_id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-access-token': token
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.status == 200){
            const name_field = document.querySelector('#name')
            const party = data.data[0]
            name_field.value = party.name
        }else{
            displayMessage('danger', data.error)
        }
    }).catch(error => {
        console.log(error)
    })

    const edit_btn = document.querySelector('#edit-btn')
    edit_btn.addEventListener('click', editParty)
}

///----####---EDIT PARTY END----####----///
