fetch("../controls/control.json")
  .then((response) => response.json())
  .then((data) => {
    //ordering the pages using js
    let order = data.orderOfPages;
    let body = document.querySelector("body");
    for (let i = 0; i < order.length; i++) {
      if (order[i] == "discover") {
        body.innerHTML += discoverSectionHtml;
      } else if (order[i] == "about") {
        body.innerHTML += aboutSectionHtml;
      } else if (order[i] == "services") {
        body.innerHTML += servicesSectionHtml;
      } else if (order[i] == "testimonial") {
        body.innerHTML += testimonialSectionHtml;
      } else if (order[i] == "contact") {
        body.innerHTML += contactSectionHtml;
      } else if (order[i] == "footer") {
        body.innerHTML += footerSectionHtml;
      }
    }

    // js for home section
    let bannerHeading = document.querySelector(".banner-text h1");
    let bannerText = document.querySelector(".banner-text p");
    let hirePhone = document.querySelector(".hire-btn div");

    bannerHeading.innerText = data.homeSection.bannerHeading;
    bannerText.innerText = data.homeSection.bannerText;
    hirePhone.innerHTML = `<i class="fas fa-phone-alt"></i>${data.mobileNumber}`;

    //js for discover section
    let allPhotos = data.discoverSection.allPhotos;
    // load more button
    let loadBtn = document.querySelector(".load-btn");
    loadBtn.addEventListener("click", () => {
      loadImages();
      document.querySelector(".preloader").classList.remove("fade-out");
      document.querySelector(".preloader").style.display = "flex";
      preloaderFade();
    });

    //stock photos loader
    let row = document.querySelector(".discover .stock .row");
    let count = 0;
    let c = 0,
      c_album = 0;
    function loadImages() {
      let n = 10;
      for (let i = 0; i < n; i++) {
        if (c_album < allPhotos.length) {
          c++;
          if (c <= allPhotos[c_album].numberOfPhotos) {
            let folder = allPhotos[c_album].albumName;
            let imageName = `photo (${c}).png`;
            let src = `resources/images/${folder}/${imageName}`;
            let col = document.createElement("div");
            col.classList.add("col");
            let img = document.createElement("img");
            img.src = src;
            col.appendChild(img);
            row.appendChild(col);
          } else {
            c = 0;
            c_album++;
          }
        }
      }
    }

    loadImages();
    //video loading
    let discoverVideo = document.querySelector(".discover-video .row");
    let videos = data.discoverSection.allVideos;
    for(let i =0;i<videos.length;i++){
      let html = `<div class="video">
               <iframe src="https://www.youtube.com/embed/${videos[i]}"
                  title="YouTube video player" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen></iframe>
            </div>`;
      discoverVideo.innerHTML += html;
    }

    //js for about section
    let aboutSection = data.aboutSection;
    let aboutText = document.querySelector(".about .text");
    let aboutImg = document.querySelector(".about .img img");
    let teamInner = document.querySelector(".about .team .team-inner");

    aboutText.innerText = aboutSection.aboutText;
    aboutImg.src = `resources/${aboutSection.aboutPhoto}`;
    for (let i = 0; i < aboutSection.employees.length; i++) {
      let html = `<!-- employee detail starts -->
            <div class="member glass">
               <div class="img">
                  <img src="resources/${aboutSection.employees[i].photo}" alt="">
               </div>
               <h3>${aboutSection.employees[i].name}</h3>
               <h4>${aboutSection.employees[i].role}</h4>
            </div>
            <!-- employee detail ends -->`;
      teamInner.innerHTML += html;
    }

    //js for services section
    let servicesSection = data.servicesSection;
    let services = document.querySelector(".services .row");

    for (let i = 0; i < servicesSection.length; i++) {
      let html = `<div class="service">
            <i class="fas fa-${servicesSection[i].logo}"></i>
            <h2>${servicesSection[i].service}</h2>
            <p>${servicesSection[i].description}</p>
         </div>`;
      services.innerHTML += html;
    }

    //js for testimonial section
    let testimonialSection = data.testimonialSection;
    let testimonials = document.querySelector(".testi-slider-container");

    for (let i = 0; i < testimonialSection.length; i++) {
      let html = `<!-- testimonial item start -->
                     <div class="testi-item glass">
                        <p>${testimonialSection[i].description}</p>
                        <img src="resources/${testimonialSection[i].photo}" alt="testimonial">
                        <span>${testimonialSection[i].name}</span>
                     </div>
                     <!-- testimonial item end -->`;

      testimonials.innerHTML += html;
    }
    const sliderContainer = document.querySelector(".testi-slider-container"),
      slides = document.querySelectorAll(".testi-item"),
      slideWidth = sliderContainer.offsetWidth;
    // Set width of all slides
    for (let i = 0; i < slides.length; i++) {
      const element = slides[i];
      element.style.width = slideWidth + "px";
    }
    sliderContainer.style.width = slideWidth * slides.length + "px";

    const sliderPrevBtn = document.querySelector(".testi-slider-nav .prev"),
      sliderNextBtn = document.querySelector(".testi-slider-nav .next");
    let testimonialSlideIndex = 0;

    sliderNextBtn.addEventListener("click", () => {
      console.log("next");
      if (testimonialSlideIndex < slides.length - 1) testimonialSlideIndex++;
      else testimonialSlideIndex = 0;
      showTestimonial();
    });

    sliderPrevBtn.addEventListener("click", () => {
      console.log("prev");
      if (testimonialSlideIndex > 0) testimonialSlideIndex--;
      else testimonialSlideIndex = slides.length - 1;
      showTestimonial();
    });

    function showTestimonial() {
      sliderContainer.style.marginLeft =
        -(testimonialSlideIndex * slideWidth) + "px";
    }

    //js for contact section
    let addressBox = document.querySelector(
      ".contact .container .contact-info .box:first-child .text p"
    );
    let phoneBox = document.querySelector(
      ".contact .container .contact-info .box:nth-child(2) .text p"
    );
    let emailBox = document.querySelector(
      ".contact .container .contact-info .box:nth-child(3) .text p"
    );
    addressBox.innerHTML = data.address;
    phoneBox.innerHTML = data.mobileNumber;
    emailBox.innerHTML = data.emailAddress;
  })