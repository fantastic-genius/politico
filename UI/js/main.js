let treeviews = document.querySelectorAll('.treeview');

treeviews.forEach(treeview => {
    treeview.addEventListener('click', event => {
        let treeview_children = treeview.childNodes;
        let treeview_menu = treeview_children[3];
        treeview_menu.classList.toggle('hide');
        let sub_menus = document.querySelectorAll('.treeview-menu');
        
        sub_menus.forEach(sub_menu => {
            if(sub_menu !== treeview_menu && sub_menu.classList.contains('hide') === false){
                sub_menu.classList.add('hide');
            }  
        });
         
    })
});


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

const edit_profile = document.querySelector("#edit-profile");
const cancel_edit = document.querySelector("#cancel-edit");


if(edit_profile){
    edit_profile.addEventListener("click", (e) => {
        const fields = document.querySelectorAll(".profile-box input");
    
        fields.forEach(field => {
            field.removeAttribute('readonly');
        })
    
        cancel_edit.classList.remove('hide');
        edit_profile.classList.add("hide")
    })
}

if(cancel_edit){
    cancel_edit.addEventListener("click", (e) => {
        const fields = document.querySelectorAll(".profile-box input");
    
        fields.forEach(field => {
            field.setAttribute("readonly", true);
        })
    
        edit_profile.classList.remove('hide');
        cancel_edit.classList.add("hide")
    })
}



//Method to close alert message
const closeAlert = () => {
    const alertmsg = document.querySelector('.alert-msg')
    alertmsg.classList.add('hide')
}

//Logout Functionality
const logout = () => {
    sessionStorage.clear()
    window.location.href = '../index.html'
}

const logoutBtn = document.querySelector('#logout')
if(logoutBtn){
    logoutBtn.addEventListener('click', logout)
}
