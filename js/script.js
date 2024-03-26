document.addEventListener("DOMContentLoaded", function () {
    
    window.scrollTo(0, 0);

    const navbar = document.querySelector(".navbar, .navbar_semar, .navbar_p2l, .navbar_wadahPecel");
    const navLinks = document.querySelectorAll('.navbar a');

    const setActiveNavbar = (sectionId) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', function () {
        
        const scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(function (section) {
            
            const sectionId = section.getAttribute('id');
            const sectionOffset = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionOffset && scrollPosition < (sectionOffset + sectionHeight)) {
                setActiveNavbar(sectionId);
            }
        });
    });

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.style.display = "flex";
        } else {
            navbar.style.display = "none";
        }
    });

    var sections = document.querySelectorAll('.about, .portofolio, .contact, .description_semar, .description_p2l, .description_wadahPecel, .gallery');
    var screenHeight = window.innerHeight;

    window.addEventListener('scroll', function () {
        sections.forEach(function (section) {
            var sectionPosition = section.getBoundingClientRect().top;
            if (sectionPosition < screenHeight) {
                section.classList.add('active');
            }
        });
    });
    


    //image slider
    const initSlider = () => {
        const imageList = document.querySelector(".slider-wrapper .image-list");
        const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
        const sliderScrollbar = document.querySelector(".gallery-container .slider-scrollbar");
        const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
        const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

        scrollbarThumb.addEventListener("mousedown", (e) => {
            const startX = e.clientX;
            const thumbPosition = scrollbarThumb.offsetLeft;

            const handleMouseMove = (e) => {
                const deltaX = e.clientX - startX;
                const newThumbPosition = thumbPosition + deltaX;
                const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

                const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
                const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

                scrollbarThumb.style.left = `${boundedPosition}px`;
                imageList.scrollLeft = scrollPosition;
            }
            
            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            }

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        })

        slideButtons.forEach(button => {
            button.addEventListener("click", () => {
                const direction = button.id === "prev-slide" ? -1 : 1;
                const scrollAmount = imageList.clientWidth * direction;
                imageList.scrollBy({ left: scrollAmount, behaviour: "smooth" });
            });
        });

        const handleSlideButtons = () => {
            slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
            slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
        }

        const updateScrollThumbPosition = () => {
            const scrollPosition = imageList.scrollLeft;
            const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
            scrollbarThumb.style.left = `${thumbPosition}px`;
        }
        
        imageList.addEventListener("scroll", () => {
            handleSlideButtons();
            updateScrollThumbPosition();
        });
    }

    window.addEventListener("load", initSlider);

});
