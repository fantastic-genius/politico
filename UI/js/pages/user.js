const token = sessionStorage.getItem('token')
const isAdmin = sessionStorage.getItem('is_admin')
if(!token || isAdmin == 'true'){
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

///----####---GET ALL PARTIES END----####----///