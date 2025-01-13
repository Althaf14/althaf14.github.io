const nav = document.getElementById("nav");
let lastScrollY = window.scrollY;

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
  else if (lastScrollY == 653) {
    nav.classList.remove("new-nav");
    nav.style.background = "none";
  } else {
    nav.style.background = " #ffffff07";
  }


  

  console.log(lastScrollY);
  lastScrollY = window.scrollY;
});
