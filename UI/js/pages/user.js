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


///----####---VOTE START----####----///
const candidates_tbl = document.querySelector('#candidates-table')

const loadAspirants = () => {
    const alert_div = document.querySelector('#alert')
    alert_div.innerHTML = ''
    const office_id = document.querySelector('#office-select').value
    fetch(`http://localhost:5000/api/v1/offices/${office_id}/candidates`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'x-access-token': token
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        const tbl_body = document.querySelector('#candidates-table > tbody')
        if(data.status == 200){
            const candidates = data.data
            let rows = ''
            candidates.forEach(candidate => {
                const name = candidate.firstname + " " + candidate.othername + " " + candidate.lastname
                let passportUrl = "../images/user.jpg"
                if(candidate.passporturl){
                    passportUrl = candidate.passporturl
                }
                rows += `<tr>
                            <td><input type="checkbox" class="choice" name="choice"></td>
                            <td><img src="${passportUrl}" alt="${candidate.firstname}"></td>
                            <td><a href="aspirant_profile.html?id=${candidate.userid}">${name}</a></td>
                            <td>${candidate.partyname}</td>
                            <td><img src="${candidate.logourl}" alt="Logo"></td>
                            <td>
                                <button class="btn btn-warning hide" onclick=voteCandidate(event) data-candidate="${candidate.id}">Vote</button>
                            </td>
                        </tr>`
            })
            tbl_body.innerHTML = rows
            activateChoiceEvent()
        }else if(data.status == 404){
            tbl_body.innerHTML = ''
            displayMessage('info', data.error)
        }else{
            displayMessage('danger', data.error)
        }
    }).catch(error => {
        console.log(error)
    })
}

const getVotedOffices = async () => {
    try{
        const user_id = sessionStorage.getItem('user_id')
        const offices = await fetch(`http://localhost:5000/api/v1/votes/${user_id}/user`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-access-token': token
            }
        })

        const data = await offices.json()
        let offices_voted = []
        if(data.status == 200){
            const candidates = data.data
            candidates.forEach(candidate => {
                offices_voted.push(candidate.officeid)
            })
        }
        return offices_voted
    } catch(error){
        console.log(error)
    }
}

const activateChoiceEvent = () => {
    let choices = document.querySelectorAll('.choice');

    choices.forEach(choice => {
        choice.addEventListener('click', (e) => {
            choice.checked = true;
            let parent_tr = choice.closest('tr');
            let cor_btn = parent_tr.querySelectorAll('button');
            cor_btn[0].classList.remove('hide');

            choices.forEach(choic => {
                if(choic !== choice){
                    choic.checked = false;
                    let parent_tr = choic.closest('tr');
                    let cor_btn = parent_tr.querySelectorAll('.btn');
                    if(!cor_btn[0].classList.contains('hide')){
                        cor_btn[0].classList.add('hide');
                    }
                    
                }
            })
        })
    })
}

const voteCandidate = (e) => {
    const target = e.target
    const candidate_id = target.dataset.candidate
    const office_id = document.querySelector('#office-select').value
    fetch('http://localhost:5000/api/v1/votes', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'x-access-token': token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            office: office_id,
            candidate: candidate_id
        })
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.status == 201){
            displayMessage('success', 'You have succesfully voted')
            loadOffices()
        }else{
            displayMessage('danger', data.error)
        }
    }).catch(error => {
        console.log(error)
    })

}

const loadOffices = () => {
    fetch('http://localhost:5000/api/v1/offices', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'x-access-token': token
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data.status == 200){
            const offices = data.data
            const office_select = document.querySelector('#office-select')
            let options = ''
            const votedOfficesResp = getVotedOffices()
            votedOfficesResp.then(votedOffices => {
                offices.forEach(office => {
                    if(votedOffices.length > 0){
                        let isOfficeVoted = false
                        votedOffices.forEach(officeid => {
                            if(officeid == office.id){
                                isOfficeVoted = true
                            }
                        })

                        if(isOfficeVoted !== true){
                            options += `<option value="${office.id}">${office.name}</option>`
                        }
                    }else{
                        options += `<option value="${office.id}">${office.name}</option>`
                    }
                })
    
                office_select.innerHTML = options
                loadAspirants()
            })
            
        }else{
            displayMessage('danger', data.error)
        }
    }).catch(error => {
        console.log(error)
    })
}

if(candidates_tbl){
    loadOffices()
    const office_select = document.querySelector('#office-select')
    office_select.addEventListener('change', loadAspirants)
}
///----####---VOTE END----####----///
