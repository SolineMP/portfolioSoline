// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}
// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}
// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");
    // Load the JSON file
    fetch("../data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" alt="icone liée à la compétence"/>
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;
                // Append the card to the current row
                row.appendChild(card);
                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}
//Carroussel project 
fetch("../data/portfolio.json")
  .then(response => response.json())
  .then(slides => {
    // Récupérer la référence de la div du carrousel
    const carouselInner = document.querySelector(".carousel-inner");
    if (!carouselInner) {
      console.error("Carousel inner container not found.");
      return;
    }
    // Ajouter les diapositives dynamiquement
    slides.forEach((slide, index) => {
      if (!slide || !slide.image || !slide.title || !slide.text) {
        console.error("Invalid slide data at index:", index);
        return;
      }
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      // Ajouter la classe active à la première diapositive
      if (index === 0) {
        carouselItem.classList.add("active");
      }
    carouselItem.innerHTML = `
        <img src="../images/${slide.image}" class="d-block w-50 rounded mx-auto rounded" alt="${slide.title}">
        <div class="text-center d-md-block text-white">
            <h3 class="mt-2 mb-3 col-xs-1 text-center">${slide.title}</h3>
            <p class="mb-3 col-xs-1 text-center ms-1 me-1 carouselText">${slide.text}</p>
            <a href="${slide.link}" target="_blank" class="btnCarouselLg text-decoration-none text-light">Lien</a>
            <a href="${slide.link}" target="_blank" class="btnCarouselSm text-decoration-none text-light">+</a>
        </div>
    `;
      // Ajouter la diapositive à la div du carrousel
      carouselInner.appendChild(carouselItem);
    });
  })
  .catch(error => {
    console.error("Error fetching or processing data:", error);
  });
// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
