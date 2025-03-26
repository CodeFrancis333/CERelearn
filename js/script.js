document.addEventListener("DOMContentLoaded", function () {
  console.log(" JavaScript loaded successfully!");

  /************************************
   * NAVBAR SCROLL EFFECT
   ************************************/
  function userScroll() {
    const navbar = document.querySelector('.navbar');
    const navlinks = document.querySelectorAll('.nav-link.mx-2');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add(
          'bg-danger',
          'border-bottom',
          'border-primary',
          'navbar-sticky',
          'navbar-danger'
        );
        navbar.classList.remove('navbar-light');
        navlinks.forEach(link => {
          link.classList.add('text-dark');
          link.classList.remove('text-danger');
        });
      } else {
        navbar.classList.remove(
          'bg-danger',
          'border-bottom',
          'border-primary',
          'navbar-sticky',
          'navbar-danger'
        );
        navbar.classList.add('navbar-light');
        navlinks.forEach(link => {
          link.classList.remove('text-danger');
        });
      }
    });
  }
  userScroll();

  /************************************
   * BACKGROUND IMAGE SCROLL ZOOM
   ************************************/
  function backgroundScrollZoom() {
    const coverImage = document.querySelector('.cover img');
    if (!coverImage) return;
    const scrollThreshold = 500;
    const maxScaleIncrease = 0.1;
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      const scaleFactor = 1 + (Math.min(scrollY, scrollThreshold) / scrollThreshold) * maxScaleIncrease;
      coverImage.style.transform = `scale(${scaleFactor})`;
    });
  }
  backgroundScrollZoom();

  /************************************
   * SCROLL ANIMATIONS FOR SECTIONS
   ************************************/
  function scrollAnimations() {
    const animatedElements = document.querySelectorAll('.mission-transition, .explore-transition, .feature-card');
    if (!animatedElements.length) return;
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);
    animatedElements.forEach(element => observer.observe(element));
  }
  scrollAnimations();

  /************************************
   * PRICING CARDS HOVER EFFECT
   ************************************/
  function pricingCardEffects() {
    const pricingCards = document.querySelectorAll(".pricing-card");
    if (!pricingCards.length) return;
    pricingCards.forEach(card => {
      card.addEventListener("mouseenter", () => card.style.transform = "scale(1.02)");
      card.addEventListener("mouseleave", () => card.style.transform = "scale(1)");
    });
  }
  pricingCardEffects();

  /************************************
   * ANIMATED COUNTERS
   ************************************/
  function incrementStats() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      let currentValue = 0;
      counter.innerText = "0%";
      function updateCounter() {
        if (currentValue < target) {
          currentValue++;
          counter.innerText = `${currentValue}%`;
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = `${target}%`;
        }
      }
      requestAnimationFrame(updateCounter);
    });
  }
  incrementStats();

  /************************************
   * FORM SIGN IN / SIGN UP TOGGLE
   ************************************/
  function formToggle() {
    const btnSignIn = document.getElementById('btnSignIn');
    const btnSignUp = document.getElementById('btnSignUp');
    const formCard = document.getElementById('formCard');

    if (!btnSignIn || !btnSignUp || !formCard) return;

    // Get both form wrappers (assume first is Sign In, second is Sign Up)
    const forms = formCard.querySelectorAll('.form-wrapper');
    if (forms.length < 2) return;
    const signInForm = forms[0];
    const signUpForm = forms[1];

    // Set transitions on the container and forms
    formCard.style.transition = 'transform 0.6s ease';
    [signInForm, signUpForm].forEach(form => {
      form.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Initial state: show Sign In form and position container to show first half
    formCard.style.transform = 'translateX(0%)';
    signInForm.style.opacity = '1';
    signInForm.style.transform = 'scale(1)';
    signInForm.style.pointerEvents = 'auto';

    signUpForm.style.opacity = '0';
    signUpForm.style.transform = 'scale(0.95)';
    signUpForm.style.pointerEvents = 'none';

    btnSignIn.addEventListener('click', () => {
      // Slide container to show Sign In side (first half)
      formCard.style.transform = 'translateX(0%)';
      btnSignIn.classList.add('active');
      btnSignUp.classList.remove('active');

      // Show Sign In form with fade/scale effect
      signInForm.style.opacity = '1';
      signInForm.style.transform = 'scale(1)';
      signInForm.style.pointerEvents = 'auto';

      // Hide Sign Up form with fade/scale effect
      signUpForm.style.opacity = '0';
      signUpForm.style.transform = 'scale(0.95)';
      signUpForm.style.pointerEvents = 'none';
    });

    btnSignUp.addEventListener('click', () => {
      // Slide container to show Sign Up side (second half)
      formCard.style.transform = 'translateX(-50%)';
      btnSignUp.classList.add('active');
      btnSignIn.classList.remove('active');

      // Show Sign Up form with fade/scale effect
      signUpForm.style.opacity = '1';
      signUpForm.style.transform = 'scale(1)';
      signUpForm.style.pointerEvents = 'auto';

      // Hide Sign In form with fade/scale effect
      signInForm.style.opacity = '0';
      signInForm.style.transform = 'scale(0.95)';
      signInForm.style.pointerEvents = 'none';
    });
  }

  formToggle();





  /************************************
   * SECTION NAVIGATION
   ************************************/
  window.showSection = function (section) {
    const sections = document.querySelectorAll('.section-content');
    const sidebarLinks = document.querySelectorAll(".sidebar-left .nav-link");
    // Hide all sections
    sections.forEach(sec => sec.classList.add('d-none'));
    // Show the selected section
    const targetSection = document.getElementById(section + '-section');
    if (targetSection) {
      targetSection.classList.remove('d-none');
    } else {
      console.error(`❌ Section "${section}" not found.`);
    }
    // Remove 'active' from all sidebar links and highlight the active link
    sidebarLinks.forEach(link => link.classList.remove('active', 'text-primary'));
    sidebarLinks.forEach(link => {
      if (link.getAttribute("onclick")?.includes(`'${section}'`)) {
        link.classList.add('active', 'text-primary');
      }
    });
    // Hide the global search bar if the "users" section is active; show it otherwise
    const globalSearchBar = document.getElementById('global-search-bar');
    if (globalSearchBar) {
      globalSearchBar.style.display = section === 'users' ? 'none' : 'block';
    }
  };

  /************************************
   * SIDEBAR TOGGLE FOR SMALL SCREENS
   ************************************/
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebarLeft = document.querySelector(".sidebar-left");

  if (sidebarToggle && sidebarLeft) {
    // Apply transitions for smooth movement
    sidebarLeft.style.transition = "transform 0.3s ease";
    sidebarToggle.style.transition = "left 0.3s ease";

    // Function to update toggle visibility based on screen width
    function updateToggleVisibility() {
      if (window.innerWidth >= 992) {
        sidebarToggle.style.display = "none";
        sidebarLeft.classList.remove("open");
        sidebarLeft.style.transform = ""; // Let CSS control layout on large screens
      } else {
        sidebarToggle.style.display = "block";
        if (!sidebarLeft.classList.contains("open")) {
          sidebarLeft.style.transform = "translateX(-100%)";
          sidebarToggle.style.left = "10px";
          sidebarToggle.textContent = ">";
        }
      }
    }
    updateToggleVisibility();
    window.addEventListener("resize", updateToggleVisibility);

    // Click event to toggle sidebar open/closed
    sidebarToggle.addEventListener("click", function () {
      if (sidebarLeft.classList.contains("open")) {
        // Close sidebar
        sidebarLeft.classList.remove("open");
        sidebarLeft.style.transform = "translateX(-100%)";
        sidebarToggle.textContent = ">";
        sidebarToggle.style.left = "10px";
      } else {
        // Open sidebar
        sidebarLeft.classList.add("open");
        sidebarLeft.style.transform = "translateX(0)";
        sidebarToggle.textContent = "<";
        sidebarToggle.style.left = "260px"; // 250px sidebar width + 10px margin
      }
    });

    // --- New: Hide toggle button when hamburger (navbar collapse) is open ---
    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse) {
      navbarCollapse.addEventListener("show.bs.collapse", function () {
        // Hide sidebar toggle when hamburger is open
        sidebarToggle.style.display = "none";
      });
      navbarCollapse.addEventListener("hidden.bs.collapse", function () {
        // Show sidebar toggle when hamburger is closed
        sidebarToggle.style.display = "block";
      });
    }
  }

  // Prevent page reload on left sidebar nav links
  const sidebarLinks = document.querySelectorAll(".sidebar-left .nav-link");
  sidebarLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const section = this.getAttribute("onclick").match(/'([^']+)'/)[1];
      showSection(section);
    });
  });

  // Default to "Home" section
  showSection("home");

  // Call generateCalendar to display the calendar
  generateCalendar();
});

// Sample questions for each day of the month
const questions = {
  1: { title: "What is Mohr's Circle?", link: "question1.html" },
  2: { title: "Calculate the shear force on a beam.", link: "question2.html" },
  3: { title: "Explain the concept of bending moment.", link: "question3.html" },
  // Add more questions for each day
};

// Generate calendar for the current month
function generateCalendar() {
  const calendar = document.getElementById('calendar');
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let calendarHTML = '<table class="table table-bordered">';
  calendarHTML += '<thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead>';
  calendarHTML += '<tbody><tr>';

  // Get the first day of the month
  const firstDay = new Date(year, month, 1).getDay();
  // Fill in the days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarHTML += '<td></td>';
  }
  // Fill in the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const question = questions[day];
    if (question) {
      calendarHTML += `<td class="question-day" data-link="${question.link}" title="${question.title}">${day}</td>`;
    } else {
      calendarHTML += `<td>${day}</td>`;
    }
    // Break the row after Saturday
    if ((day + firstDay) % 7 === 0) {
      calendarHTML += '</tr><tr>';
    }
  }
  calendarHTML += '</tr></tbody></table>';
  calendar.innerHTML = calendarHTML;

  // Add event listeners for hover and click on calendar cells
  document.querySelectorAll('.question-day').forEach(day => {
    day.addEventListener('mouseover', function () {
      this.style.cursor = 'pointer';
      this.style.backgroundColor = '#f0f0f0';
    });
    day.addEventListener('mouseout', function () {
      this.style.backgroundColor = '';
    });
    day.addEventListener('click', function () {
      window.location.href = this.getAttribute('data-link');
    });
  });
}


document.addEventListener("DOMContentLoaded", function () {
  const moodButtons = document.querySelectorAll('.mood-btn');
  const selectedMoodDisplay = document.getElementById('selectedMood');

  moodButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from all mood buttons
      moodButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to the clicked button
      this.classList.add('active');

      // Get the selected mood from the data attribute
      const mood = this.getAttribute('data-mood');
      selectedMoodDisplay.textContent = mood;

      // Adjust workload and update the display color based on mood
      adjustWorkload(mood);
    });
  });

  // Function to adjust workload according to mood and update text color
  function adjustWorkload(mood) {
    switch (mood) {
      case 'Motivated':
        console.log('Suggest more challenging questions');
        selectedMoodDisplay.style.color = '#8cd47e';
        // Additional code for motivated mood here.
        break;
      case 'Stressed':
        console.log('Provide lighter workload with encouragement');
        selectedMoodDisplay.style.color = '#ff6961';
        // Additional code for stressed mood here.
        break;
      case 'Neutral':
        console.log('Standard workload');
        selectedMoodDisplay.style.color = '#F8d66d';
        // Additional code for neutral mood here.
        break;
      default:
        console.log('No mood selected');
        selectedMoodDisplay.style.color = 'inherit';
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const readinessBar = document.getElementById("readinessBar");
  const readinessDot = document.getElementById("readinessDot");

  // Retrieve the readiness score from the progress bar (as a number)
  const readinessScore = parseFloat(readinessBar.getAttribute("aria-valuenow"));

  // Set the dot color based on the score range
  let dotColor = "";
  if (readinessScore <= 33.33) {
    dotColor = "#ff6961";
  } else if (readinessScore <= 66.67) {
    dotColor = "#F8d66d";
  } else {
    dotColor = "#8cd47e";
  }

  // Apply the determined color to the dot
  readinessDot.style.backgroundColor = dotColor;
});

document.addEventListener("DOMContentLoaded", function () {
  // Select all table cells that include a difficulty class
  const difficultyCells = document.querySelectorAll("td[class*='difficulty-']");

  difficultyCells.forEach(cell => {
    if (cell.classList.contains("difficulty-easy")) {
      cell.style.color = "#8cd47e";
    } else if (cell.classList.contains("difficulty-medium")) {
      cell.style.color = "#F8d66d";
    } else if (cell.classList.contains("difficulty-hard")) {
      cell.style.color = "#ff6961";
    }
  });
});


/************************************
 * STUDY HTML
 ************************************/

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('main.study-main-content').forEach(function(section) {
    section.style.display = 'none';
  });
  document.getElementById('home').style.display = 'block';
});

document.querySelectorAll('.study-sidebar .nav-link').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.study-main-content').forEach(section => {
      section.style.display = 'none';
    });

    const targetSection = this.getAttribute('data-section');
    document.getElementById(targetSection).style.display = 'block';

    document.querySelectorAll('.study-sidebar .nav-link').forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
  });
});

// Study-Topics Carousel

document.addEventListener('DOMContentLoaded', function () {
  var carouselElement = document.getElementById('topicsCarousel');
  var prevControl = carouselElement.querySelector('.carousel-control-prev');

  // Function to update the display of the previous control
  function updatePrevControl() {
    var activeItem = carouselElement.querySelector('.carousel-item.active');
    var items = Array.from(carouselElement.querySelectorAll('.carousel-item'));
    var activeIndex = items.indexOf(activeItem);
    // Hide the prev control on the first slide (index 0)
    if (activeIndex === 0) {
      prevControl.style.display = 'none';
    } else {
      prevControl.style.display = 'flex';
    }
  }

  // Initial check on page load
  updatePrevControl();

  // Update on each slide transition
  carouselElement.addEventListener('slid.bs.carousel', function () {
    updatePrevControl();
  });
});

// Example Problems

// Elements
const btnSearchText = document.getElementById('btnSearchText');
const btnSearchMath = document.getElementById('btnSearchMath');
const searchInput = document.getElementById('searchInput');
const calcKeypad = document.getElementById('calcKeypad');
const mathPreview = document.getElementById('mathPreview');
const mathSuggestions = document.getElementById('mathSuggestions');
const suggestionLine = document.getElementById('suggestionLine');

// Function to update the math preview with basic formatting
function updateMathPreview() {
  let text = searchInput.value;
  // Superscript: e.g., x^2 → x<sup>2</sup>
  let formatted = text.replace(/(\w)\^(\w+)/g, '$1<sup>$2</sup>');
  // Subscript: e.g., x_2 → x<sub>2</sub>
  formatted = formatted.replace(/(\w)_([a-zA-Z0-9]+)/g, '$1<sub>$2</sub>');
  // Fraction: transform patterns like 1/2 into a vertical fraction display
  formatted = formatted.replace(/(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)/g,
      '<span class="fraction"><span class="numerator">$1</span><span class="denom">$2</span></span>');
  // nth root: nthroot(index, radicand)
  formatted = formatted.replace(/nthroot\(\)/g, '<span class="nthroot">[nth root]</span>');
  formatted = formatted.replace(/nthroot\(([^,]+),([^)]+)\)/g, '<span class="nthroot"><sup>$1</sup>&radic;<span class="radicand">$2</span></span>');
  // Absolute value: abs(content)
  formatted = formatted.replace(/abs\(\)/g, '<span class="abs">[absolute]</span>');
  formatted = formatted.replace(/abs\(([^)]+)\)/g, '<span class="abs">|$1|</span>');
  // Matrix: matrix([[]]) or matrix([...])
  formatted = formatted.replace(/matrix\(\[\[\]\]\)/g, '<span class="matrix">[matrix]</span>');
  formatted = formatted.replace(/matrix\(\[([^\)]+)\]\)/g, '<span class="matrix">matrix([$1])</span>');
  // Derivative and Integral: left as entered
  mathPreview.innerHTML = formatted;
}

// "Search as Text" button click event
btnSearchText.addEventListener('click', function() {
  if (this.classList.contains('active')) return;
  this.classList.add('active', 'btn-primary');
  this.classList.remove('btn-outline-primary', 'btn-outline-secondary');
  btnSearchMath.classList.remove('active', 'btn-primary');
  btnSearchMath.classList.add('btn-outline-primary');
  searchInput.placeholder = "Search as text...";
  calcKeypad.style.display = "none";
  mathPreview.style.display = "none";
  mathSuggestions.style.display = "none";
  suggestionLine.style.display = "none";
});

// "Search in Math Mode" button click event
btnSearchMath.addEventListener('click', function() {
  if (this.classList.contains('active')) {
    // Toggle back to text mode
    this.classList.remove('active', 'btn-primary');
    this.classList.add('btn-outline-primary');
    btnSearchText.classList.add('active', 'btn-primary');
    btnSearchText.classList.remove('btn-outline-primary', 'btn-outline-secondary');
    searchInput.placeholder = "Search as text...";
    calcKeypad.style.display = "none";
    mathPreview.style.display = "none";
    mathSuggestions.style.display = "none";
    suggestionLine.style.display = "none";
  } else {
    // Activate math mode
    this.classList.add('active', 'btn-primary');
    this.classList.remove('btn-outline-primary');
    btnSearchText.classList.remove('active', 'btn-primary');
    btnSearchText.classList.add('btn-outline-secondary');
    searchInput.placeholder = "Enter equation...";
    calcKeypad.style.display = "block";
    mathPreview.style.display = "block";
    suggestionLine.style.display = "block";
    mathSuggestions.style.display = "block";
    updateMathPreview();
  }
});

// Update math preview as the user types (only in math mode)
searchInput.addEventListener('input', function() {
  if (btnSearchMath.classList.contains('active')) {
    updateMathPreview();
  }
});

// "Search" button event (trigger search)
document.getElementById('btnSearch').addEventListener('click', function() {
  const query = searchInput.value;
  console.log("Search query:", query);
  // Place your search logic here
});

// File upload event (for "Search as Photo")
document.getElementById('photoUpload').addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    console.log("Selected photo:", file.name);
    // Process the uploaded file as needed
  }
});

// Calculator keypad button events
const calcButtons = document.querySelectorAll('.calc-btn');
calcButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    if (this.id === 'calcClear') {
      searchInput.value = "";
    } else {
      // Insert the button’s data-value (templates like nthroot() or abs() can be edited by the user)
      searchInput.value += this.getAttribute('data-value');
    }
    if (btnSearchMath.classList.contains('active')) {
      updateMathPreview();
    }
  });
});

// Math suggestions click events
const suggestionButtons = document.querySelectorAll('.suggestion-btn');
suggestionButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const suggestion = this.getAttribute('data-suggestion');
    searchInput.value = suggestion;
    updateMathPreview();
  });
});

// Relative Shadow Effect for Search Card
// Get the search card element
const searchCard = document.querySelector('.custom-search-card');

// Update box-shadow relative to the cursor position
searchCard.addEventListener('mousemove', function(e) {
  const rect = searchCard.getBoundingClientRect();
  // Calculate the offset relative to the center (divided by 10 to soften the effect)
  const offsetX = (e.clientX - rect.left - rect.width / 2) / 10;
  const offsetY = (e.clientY - rect.top - rect.height / 2) / 10;
  searchCard.style.boxShadow = `${offsetX}px ${offsetY}px 20px rgba(0, 0, 0, 0.3)`;
});

// Reset to default box-shadow when the mouse leaves the card
searchCard.addEventListener('mouseleave', function() {
  searchCard.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
});

/***************** Formulas ***********************/

// Define subtopics for each category
const categorySubtopics = {
  "MSTE": [
    "Calculus", "Differential Equations", "Engineering Data Analysis",
    "Numerical Methods", "Physics for Engineers", "Economics", 
    "Construction Surveying and Layout", "Materials for Construction",
    "Highway Engineering", "Construction Occupational Safety and Health",
    "Transportation Engineering", "Quantity Surveying",
    "Construction Management Principles and Methods"
  ],
  "HGE": [
    "Fluid Properties", "Hydrostatics", "Fluid Flow",
    "Buoyancy and Flotation", "Relative Equilibrium of Liquids", "Hydrodynamics",
    "Water Supply Soil Properties", "Soils Classification", "Fluid Flow through Soil Mass",
    "Stresses in Soil Mass", "Soil Strength and Tests", "Bearing Capacity",
    "Compaction", "Consolidation and Settlement", "Lateral Earth Pressures", "Slope Stability"
  ],
  "PSAD": [
    "Engineering Mechanics", "Strength of Materials",
    "Theory of Structures", "Reinforced Concrete Beams and Columns",
    "Prestressed Concrete Beams", "Steel Beams, Columns and Connections, Footings, Construction Materials Testing",
    "Application of the Governing Codes of Practice"
  ]
};

// Define content for subtopics (example for Calculus)
const subtopicContent = {
  "Calculus": `
    <h5>Calculus</h5>
    <p>
      Calculus is the study of continuous change and is fundamental in engineering analysis.
      Key formulas include derivatives, integrals, and the Fundamental Theorem of Calculus.
    </p>
    <ul>
      <li><strong>Derivative:</strong> <code>f'(x) = limₕ→0 (f(x+h) - f(x))/h</code></li>
      <li><strong>Integral:</strong> <code>∫ f(x) dx</code></li>
    </ul>
    <p>
      These formulas are essential for understanding rates of change and accumulation in engineering systems.
    </p>
  `
  // Additional subtopic content can be added here...
};

// Utility: Clear active state from category segments
function clearCategoryActive() {
  document.querySelectorAll('#category-group .category-part').forEach(el => {
    el.classList.remove('active');
  });
}

// Function: Load subtopic buttons for a given category
function loadSubtopics(category) {
  const subtopicContainer = document.getElementById('subtopic-buttons');
  subtopicContainer.innerHTML = ''; // Clear previous buttons
  const subtopics = categorySubtopics[category];
  if (subtopics && subtopics.length > 0) {
    subtopics.forEach(subtopic => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-dark btn-sm m-1 subtopic-btn';
      btn.textContent = subtopic;
      btn.setAttribute('data-subtopic', subtopic);
      btn.addEventListener('click', function() {
        const subtopicName = this.getAttribute('data-subtopic');
        const content = subtopicContent[subtopicName] || `<h5>${subtopicName}</h5><p>Formulas and explanations for ${subtopicName} go here.</p>`;
        document.getElementById('formulas-content').innerHTML = content;
      });
      subtopicContainer.appendChild(btn);
    });
    subtopicContainer.style.display = 'block';
  } else {
    subtopicContainer.style.display = 'none';
  }
}

// Event handler for unified category button clicks with tooltip logic
document.querySelectorAll('#category-group .category-part').forEach(el => {
  el.addEventListener('click', function() {
    // Hide the tooltip on first click
    document.getElementById('tooltip-text').style.display = 'none';
    
    const category = this.getAttribute('data-category');
    // If the clicked segment is already active, toggle it off (hide subtopics)
    if (this.classList.contains('active')) {
      this.classList.remove('active');
      document.getElementById('subtopic-buttons').style.display = 'none';
    } else {
      clearCategoryActive();
      this.classList.add('active');
      loadSubtopics(category);
    }
  });
});

/***************** Practice Quizzes ***********************/

// Tab Switching
document.getElementById("search-tab").addEventListener("click", function() {
  document.getElementById("search-section").style.display = "block";
  document.getElementById("ai-section").style.display = "none";
  this.classList.add("pq-tab-active");
  document.getElementById("ai-tab").classList.remove("pq-tab-active");
});

document.getElementById("ai-tab").addEventListener("click", function() {
  document.getElementById("search-section").style.display = "none";
  document.getElementById("ai-section").style.display = "block";
  this.classList.add("pq-tab-active");
  document.getElementById("search-tab").classList.remove("pq-tab-active");
});

// Limit AI Prompt to 100 Words and update word count in real time
document.getElementById("ai-prompt").addEventListener("input", function() {
  let words = this.value.trim().split(/\s+/).filter(function(word) {
    return word.length > 0;
  });
  const errorEl = document.getElementById("wordLimitError");
  if (words.length > 100) {
    // Limit input to first 100 words and show error message
    this.value = words.slice(0, 100).join(" ");
    words = words.slice(0, 100);
    errorEl.style.display = "block";
  } else {
    errorEl.style.display = "none";
  }
  document.getElementById("wordCount").textContent = words.length + "/100";
});

// Pagination Functionality
document.addEventListener("DOMContentLoaded", function() {
  const cardsPerPage = 6;
  let currentPage = 1;
  const quizCards = Array.from(document.querySelectorAll("#quizCardsRow .quiz-card"));
  const totalPages = Math.ceil(quizCards.length / cardsPerPage);

  function showPage(page) {
    // Hide all cards
    quizCards.forEach(card => card.style.display = "none");
    // Show cards for current page
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    quizCards.slice(start, end).forEach(card => card.style.display = "block");
  }

  function setupPagination() {
    const paginationEl = document.getElementById("pagination");
    paginationEl.innerHTML = "";

    // Previous button (only show if not on page 1)
    if (currentPage > 1) {
      const prevLi = document.createElement("li");
      prevLi.classList.add("page-item");
      const prevLink = document.createElement("a");
      prevLink.classList.add("page-link");
      prevLink.href = "#";
      prevLink.textContent = "Previous";
      prevLink.addEventListener("click", function(e) {
        e.preventDefault();
        if (currentPage > 1) {
          currentPage--;
          showPage(currentPage);
          setupPagination();
        }
      });
      prevLi.appendChild(prevLink);
      paginationEl.appendChild(prevLi);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.classList.add("page-item");
      if (i === currentPage) li.classList.add("active");
      const link = document.createElement("a");
      link.classList.add("page-link");
      link.href = "#";
      link.textContent = i;
      link.addEventListener("click", function(e) {
        e.preventDefault();
        currentPage = i;
        showPage(currentPage);
        setupPagination();
      });
      li.appendChild(link);
      paginationEl.appendChild(li);
    }

    // Next button (only show if not on last page)
    if (currentPage < totalPages) {
      const nextLi = document.createElement("li");
      nextLi.classList.add("page-item");
      const nextLink = document.createElement("a");
      nextLink.classList.add("page-link");
      nextLink.href = "#";
      nextLink.textContent = "Next";
      nextLink.addEventListener("click", function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
          currentPage++;
          showPage(currentPage);
          setupPagination();
        }
      });
      nextLi.appendChild(nextLink);
      paginationEl.appendChild(nextLi);
    }
  }

  showPage(currentPage);
  setupPagination();
});

document.querySelectorAll('.pq-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left - rect.width / 2) / 20;
    const offsetY = (e.clientY - rect.top - rect.height / 2) / 20;
    card.style.transition = 'box-shadow 0.1s ease';
    card.style.boxShadow = `${-offsetX}px ${-offsetY}px 20px rgba(0, 0, 0, 0.2)`;
  });
  card.addEventListener('mouseleave', function() {
    card.style.transition = 'box-shadow 0.3s ease';
    card.style.boxShadow = `0 4px 8px rgba(0, 0, 0, 0.1)`;
  });
});

/***************** Sidebar Toggle (Study Materials) ***********************/

const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".study-sidebar");

let sidebarVisible = false; // track open/closed state

toggleBtn.addEventListener("click", () => {
  sidebarVisible = !sidebarVisible;
  
  if (sidebarVisible) {
    // Slide sidebar in and update button position
    sidebar.classList.add("show");
    toggleBtn.textContent = "<";
    toggleBtn.style.left = "calc(240px + 1rem)"; // moves with the sidebar
  } else {
    // Slide sidebar out and reset button position
    sidebar.classList.remove("show");
    toggleBtn.textContent = ">";
    toggleBtn.style.left = "1rem";
  }
});