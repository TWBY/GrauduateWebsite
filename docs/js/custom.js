//mmenu
var MenuBtn=document.getElementById("MenuBtn");
MenuBtn.onclick=function(){
    
    if(MenuBtn.classList.contains("active")){
        MenuBtn.parentElement.classList.remove("open");
        MenuBtn.classList.remove("active");
        MenuBtn.children.item(0).classList.remove("activeTop")
        MenuBtn.children.item(1).classList.remove("activeMiddle")
        MenuBtn.children.item(2).classList.remove("activeBottom")
    }else{
        MenuBtn.parentElement.classList.add("open");
        MenuBtn.classList.add("active");
        MenuBtn.children.item(0).classList.add("activeTop")
        MenuBtn.children.item(1).classList.add("activeMiddle")
        MenuBtn.children.item(2).classList.add("activeBottom")
    }
};

