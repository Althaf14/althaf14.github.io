const nav = document.getElementById("nav");
let lastScrollY = window.scrollY;
let menu = document.getElementById("menu");
let menuIcon = document.getElementById("menu-icon");
let closeBtn = document.getElementById("closeBtn");

window.addEventListener("scroll", () => {
  if (lastScrollY < window.scrollY) {
    nav.classList.add("nav-hidden");
    nav.style.background = "none";
  } else if (lastScrollY > window.scrollY) {
    nav.classList.remove("nav-hidden");
    nav.classList.add("new-nav");
  }
  
  if (lastScrollY < 100  ) {
    nav.classList.remove("new-nav");
    nav.style.background = "none";
  }
  else {
    nav.style.background = " #ffffff07";
  }


  

 console.log(lastScrollY) ;
  lastScrollY = window.scrollY;
});

function menuOpenFn(){
  menu.style.display="block";
  menuIcon.style.display="none";
}

function menuCloseFn(){
  menu.style.display="none";
  menuIcon.style.display="block";
}