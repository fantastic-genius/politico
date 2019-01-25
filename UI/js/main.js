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
