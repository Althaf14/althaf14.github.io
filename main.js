const nav = document.querySelector(".nav");
let lastScrollY = window.scrollY;

window.addEventListener("scroll",()=>{
    if(lastScrollY < window.scrollY){
        nav.classList.add("nav-hidden");
        
    }
    else if(lastScrollY > window.scrollY){
        nav.classList.remove("nav-hidden");
        nav.classList.add("new-nav");
    }
    else if( lastScrollY === window.scrollY){
        nav.classList.remove("new-nav");
    }

    lastScrollY = window.scrollY;
})
