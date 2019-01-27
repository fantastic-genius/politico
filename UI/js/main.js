let treeviews = document.querySelectorAll('.treeview');

treeviews.forEach(treeview => {
    treeview.addEventListener('click', event => {
        let treeview_children = treeview.childNodes;
        let treeview_menu = treeview_children[3];
        treeview_menu.classList.toggle('hide');
        console.log(treeview_menu);
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
