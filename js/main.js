// menuCloseBtn = "";
window.addEventListener("click", (e) => {
  let nav = document.querySelector("nav");
  if (e.target.classList.contains("menu-close-btn")) {
    nav.classList.toggle("active");
    e.target.querySelector("i").style.transform = nav.classList.contains(
      "active"
    )
      ? "rotate(0deg)"
      : "rotate(180deg)";
  }
});

// this is the preloader
window.addEventListener("load", preloaderFade);
function preloaderFade() {
  setTimeout(() => {
    document.querySelector(".preloader").classList.add("fade-out");
  }, 600);
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 1200);
}

// close nav menu on scroll
window.onscroll = function (e) {
  let menuCloseBtn = document.querySelector(
    "body .home .navbar nav div.menu-close-btn"
  );
  let nav = document.querySelector("nav");
  if (window.scrollY == 0) {
    nav.classList.add("active");
    menuCloseBtn.querySelector("i").style.transform = `rotate(0deg)`;
  } else {
    nav.classList.remove("active");
    menuCloseBtn.querySelector("i").style.transform = `rotate(180deg)`;
  }
};
