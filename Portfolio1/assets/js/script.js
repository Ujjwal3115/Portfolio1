'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}

// Sidebar functionality
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); 
});

// Testimonials functionality
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Custom select functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { 
  elementToggleFunc(this); 
});

// Filter functionality
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

// Add event to select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Filter button functionality
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

// Contact form functionality
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

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
}

// Theme and Button Group functionality
document.addEventListener('DOMContentLoaded', () => {
  // Create burst animation
  function createBurst(x, y) {
    const emojis = ['💫', '✨', '⭐', '🌟'];
    const numberOfEmojis = 20;

    for (let i = 0; i < numberOfEmojis; i++) {
      const emoji = document.createElement('div');
      emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.classList.add('burst-emoji');
      document.body.appendChild(emoji);

      const angle = (Math.random() * Math.PI * 2);
      const velocity = 1 + Math.random() * 3;
      const tx = x + Math.cos(angle) * 100;
      const ty = y + Math.sin(angle) * 100;
      
      emoji.style.left = `${x}px`;
      emoji.style.top = `${y}px`;
      
      anime({
        targets: emoji,
        left: tx,
        top: ty,
        opacity: 0,
        easing: 'easeOutExpo',
        duration: 1000,
        complete: () => emoji.remove()
      });
    }
  }

  // Theme toggle functionality
  const themeButtons = document.querySelectorAll('[data-theme-btn]');
  
  function createBurst(x, y) {
    // Create multiple emojis that flow from right to left
    const numberOfEmojis = 20;

    for (let i = 0; i < numberOfEmojis; i++) {
      setTimeout(() => {
        const emoji = document.createElement('div');
        emoji.className = 'burst-emoji';
        emoji.textContent = '🍃';
        
        // Start from right side of screen
        emoji.style.right = '-50px';
        // Random vertical position
        emoji.style.top = Math.random() * window.innerHeight + 'px';
        
        // Random size
        const size = 20 + Math.random() * 30;
        emoji.style.fontSize = `${size}px`;
        
        // Random animation duration
        emoji.style.animationDuration = (1.5 + Math.random()) + 's';
        
        document.body.appendChild(emoji);
        
        // Remove after animation
        setTimeout(() => {
          emoji.remove();
        }, 2000);
      }, i * 100); // Stagger the creation of emojis
    }
  }

  function toggleTheme(e) {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    
    themeButtons.forEach(button => {
      const icon = button.querySelector('ion-icon');
      if (icon) {
        icon.setAttribute('name', newTheme === 'dark' ? 'moon-outline' : 'sunny-outline');
      }
    });

    localStorage.setItem('theme', newTheme);

    if (!e.target.closest('.mobile-theme-btn')) {
      createBurst(e.clientX, e.clientY);
    }
  }

  themeButtons.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Set initial theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  
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

  handleResize();
  window.addEventListener('resize', handleResize);

  // Button group setup
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-group';

  const infoBtn = document.querySelector('.info_more-btn');
  const themeBtn = document.querySelector('.mobile-theme-btn');
  const sidebarInfo = document.querySelector('.sidebar-info');

  if (infoBtn && themeBtn && sidebarInfo) {
    infoBtn.parentNode.removeChild(infoBtn);
    themeBtn.parentNode.removeChild(themeBtn);
    buttonContainer.appendChild(infoBtn);
    buttonContainer.appendChild(themeBtn);
    sidebarInfo.appendChild(buttonContainer);
  }
});
