'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// ...existing code...

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
} // End of navigation loop

// Certificate view and modal functionality - Moved outside the navigation loop
document.addEventListener('DOMContentLoaded', () => {
  const certificateButtons = document.querySelectorAll('.view-certificate-btn');
  let currentModal = null;

  certificateButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Remove existing modal if present
      if (currentModal) {
        currentModal.remove();
      }

      const certificateImg = button.closest('.certificate-header').querySelector('img');
      
      // Create modal
      const modal = document.createElement('div');
      currentModal = modal;
      modal.className = 'certificate-modal';
      modal.innerHTML = `
        <div class="certificate-modal-content">
          <button class="close-certificate-modal" aria-label="Close modal">
            <ion-icon name="close-outline"></ion-icon>
          </button>
          <img src="${certificateImg.src}" alt="Certificate full view">
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Show modal with animation
      requestAnimationFrame(() => {
        modal.classList.add('active');
      });
      
      // Close modal function
      const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
          modal.remove();
          currentModal = null;
        }, 300);
        // Remove event listeners
        document.removeEventListener('keydown', handleEscape);
        modal.removeEventListener('click', handleOutsideClick);
      };
      
      // Event handler functions
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };

      const handleOutsideClick = (e) => {
        if (e.target === modal) {
          closeModal();
        }
      };
      
      // Add event listeners
      const closeButton = modal.querySelector('.close-certificate-modal');
      closeButton.addEventListener('click', closeModal, { once: true });
      modal.addEventListener('click', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
    });
  });
});

// ...existing code...

// Add the button group functionality
document.addEventListener('DOMContentLoaded', () => {
  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-group';

  // Get the existing buttons
  const infoBtn = document.querySelector('.info_more-btn');
  const themeBtn = document.querySelector('.mobile-theme-btn');

  // Get parent element
  const sidebarInfo = document.querySelector('.sidebar-info');

  // Rearrange buttons
  if (infoBtn && themeBtn && sidebarInfo) {
    // Remove buttons from current position
    infoBtn.parentNode.removeChild(infoBtn);
    themeBtn.parentNode.removeChild(themeBtn);

    // Add buttons to container
    buttonContainer.appendChild(infoBtn);
    buttonContainer.appendChild(themeBtn);

    // Add container to sidebar
    sidebarInfo.appendChild(buttonContainer);
  }

  // Handle responsive behavior
  const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 580) {
      document.querySelector('.site-logo').style.opacity = '0';
      document.querySelector('.theme-btn').style.display = 'none';
      document.querySelector('.mobile-theme-btn').style.display = 'flex';
    } else {
      document.querySelector('.site-logo').style.opacity = '1';
      document.querySelector('.theme-btn').style.display = 'flex';
      document.querySelector('.mobile-theme-btn').style.display = 'none';
    }
  };

  // Initial check
  handleResize();

  // Listen for window resize
  window.addEventListener('resize', handleResize);
});

// ...rest of existing code...

  
