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

    // Initial state: show Sign In form
    formCard.style.transform = 'translateX(0%)';
    signInForm.style.opacity = '1';
    signInForm.style.transform = 'scale(1)';
    signInForm.style.pointerEvents = 'auto';

    signUpForm.style.opacity = '0';
    signUpForm.style.transform = 'scale(0.95)';
    signUpForm.style.pointerEvents = 'none';

    btnSignIn.addEventListener('click', () => {
      formCard.style.transform = 'translateX(0%)';
      btnSignIn.classList.add('active');
      btnSignUp.classList.remove('active');

      signInForm.style.opacity = '1';
      signInForm.style.transform = 'scale(1)';
      signInForm.style.pointerEvents = 'auto';

      signUpForm.style.opacity = '0';
      signUpForm.style.transform = 'scale(0.95)';
      signUpForm.style.pointerEvents = 'none';
    });

    btnSignUp.addEventListener('click', () => {
      formCard.style.transform = 'translateX(-50%)';
      btnSignUp.classList.add('active');
      btnSignIn.classList.remove('active');

      signUpForm.style.opacity = '1';
      signUpForm.style.transform = 'scale(1)';
      signUpForm.style.pointerEvents = 'auto';

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
    sidebarLeft.style.transition = "transform 0.3s ease";
    sidebarToggle.style.transition = "left 0.3s ease";

    function updateToggleVisibility() {
      if (window.innerWidth >= 992) {
        sidebarToggle.style.display = "none";
        sidebarLeft.classList.remove("open");
        sidebarLeft.style.transform = "";
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

    sidebarToggle.addEventListener("click", function () {
      if (sidebarLeft.classList.contains("open")) {
        sidebarLeft.classList.remove("open");
        sidebarLeft.style.transform = "translateX(-100%)";
        sidebarToggle.textContent = ">";
        sidebarToggle.style.left = "10px";
      } else {
        sidebarLeft.classList.add("open");
        sidebarLeft.style.transform = "translateX(0)";
        sidebarToggle.textContent = "<";
        sidebarToggle.style.left = "260px";
      }
    });

    const navbarCollapse = document.getElementById("navbarNav");
    if (navbarCollapse) {
      navbarCollapse.addEventListener("show.bs.collapse", function () {
        sidebarToggle.style.display = "none";
      });
      navbarCollapse.addEventListener("hidden.bs.collapse", function () {
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

  // Generate calendar
  generateCalendar();
});


/************************************
 * SAMPLE QUESTIONS + CALENDAR
 ************************************/
const questions = {
  1: { title: "What is Mohr's Circle?", link: "question1.html" },
  2: { title: "Calculate the shear force on a beam.", link: "question2.html" },
  3: { title: "Explain the concept of bending moment.", link: "question3.html" },
  // Add more questions for each day...
};

function generateCalendar() {
  const calendar = document.getElementById('calendar');
  if (!calendar) return; // Guard if there's no #calendar in your HTML

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let calendarHTML = '<table class="table table-bordered">';
  calendarHTML += '<thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead>';
  calendarHTML += '<tbody><tr>';

  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDay; i++) {
    calendarHTML += '<td></td>';
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const question = questions[day];
    if (question) {
      calendarHTML += `<td class="question-day" data-link="${question.link}" title="${question.title}">${day}</td>`;
    } else {
      calendarHTML += `<td>${day}</td>`;
    }
    if ((day + firstDay) % 7 === 0) {
      calendarHTML += '</tr><tr>';
    }
  }
  calendarHTML += '</tr></tbody></table>';
  calendar.innerHTML = calendarHTML;

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

/************************************
 * MOOD BUTTONS
 ************************************/
document.addEventListener("DOMContentLoaded", function () {
  const moodButtons = document.querySelectorAll('.mood-btn');
  const selectedMoodDisplay = document.getElementById('selectedMood');

  if (!moodButtons.length || !selectedMoodDisplay) return;

  moodButtons.forEach(button => {
    button.addEventListener('click', function () {
      moodButtons.forEach(btn => btn.classList.remove('active'));

      this.classList.add('active');
      const mood = this.getAttribute('data-mood');
      selectedMoodDisplay.textContent = mood;
      adjustWorkload(mood);
    });
  });

  function adjustWorkload(mood) {
    switch (mood) {
      case 'Motivated':
        selectedMoodDisplay.style.color = '#8cd47e';
        break;
      case 'Stressed':
        selectedMoodDisplay.style.color = '#ff6961';
        break;
      case 'Neutral':
        selectedMoodDisplay.style.color = '#F8d66d';
        break;
      default:
        selectedMoodDisplay.style.color = 'inherit';
    }
  }
});

/************************************
 * READINESS DOT
 ************************************/
document.addEventListener("DOMContentLoaded", function () {
  const readinessBar = document.getElementById("readinessBar");
  const readinessDot = document.getElementById("readinessDot");
  if (!readinessBar || !readinessDot) return;

  const readinessScore = parseFloat(readinessBar.getAttribute("aria-valuenow"));
  let dotColor = "";
  if (readinessScore <= 33.33) {
    dotColor = "#ff6961";
  } else if (readinessScore <= 66.67) {
    dotColor = "#F8d66d";
  } else {
    dotColor = "#8cd47e";
  }
  readinessDot.style.backgroundColor = dotColor;
});

/************************************
 * DIFFICULTY COLORS
 ************************************/
document.addEventListener("DOMContentLoaded", function () {
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
 * STUDY.HTML SCROLL & INITIAL VIEW
 ************************************/
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for anchor links
  document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // If your anchor link is purely internal with href="#..."
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Hide all sections initially, show #home
  const sections = document.querySelectorAll('main.study-main-content');
  if (sections.length > 0) {
    sections.forEach(section => section.style.display = 'none');
    const homeSection = document.getElementById('home');
    if (homeSection) homeSection.style.display = 'block';
  }
});

/************************************
 * SHOW/HIDE STUDY SECTIONS
 ************************************/
document.addEventListener("DOMContentLoaded", function () {
  const studyLinks = document.querySelectorAll('.study-sidebar .nav-link');
  const studySections = document.querySelectorAll('.study-main-content');

  if (!studyLinks.length || !studySections.length) return;

  studyLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      studySections.forEach(section => {
        section.style.display = 'none';
      });

      const targetSection = this.getAttribute('data-section');
      if (targetSection) {
        const sectionEl = document.getElementById(targetSection);
        if (sectionEl) sectionEl.style.display = 'block';
      }

      studyLinks.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

/************************************
 * STUDY-TOPICS CAROUSEL
 ************************************/
document.addEventListener('DOMContentLoaded', function () {
  const carouselElement = document.getElementById('topicsCarousel');
  if (!carouselElement) return;

  const prevControl = carouselElement.querySelector('.carousel-control-prev');
  if (!prevControl) return;

  function updatePrevControl() {
    const activeItem = carouselElement.querySelector('.carousel-item.active');
    const items = Array.from(carouselElement.querySelectorAll('.carousel-item'));
    const activeIndex = items.indexOf(activeItem);
    if (activeIndex === 0) {
      prevControl.style.display = 'none';
    } else {
      prevControl.style.display = 'flex';
    }
  }

  updatePrevControl();
  carouselElement.addEventListener('slid.bs.carousel', function () {
    updatePrevControl();
  });
});

/************************************
 * EXAMPLE PROBLEMS SEARCH (Text / Math)
 ************************************/
document.addEventListener('DOMContentLoaded', function () {
  const btnSearchText = document.getElementById('btnSearchText');
  const btnSearchMath = document.getElementById('btnSearchMath');
  const searchInput = document.getElementById('searchInput');
  const calcKeypad = document.getElementById('calcKeypad');
  const mathPreview = document.getElementById('mathPreview');
  const mathSuggestions = document.getElementById('mathSuggestions');
  const suggestionLine = document.getElementById('suggestionLine');

  if (!btnSearchText || !btnSearchMath || !searchInput) return;

  function updateMathPreview() {
    let text = searchInput.value;
    // Basic formatting: super/subscripts, fraction, nthroot, etc.
    let formatted = text.replace(/(\w)\^(\w+)/g, '$1<sup>$2</sup>');
    formatted = formatted.replace(/(\w)_([a-zA-Z0-9]+)/g, '$1<sub>$2</sub>');
    formatted = formatted.replace(
      /(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)/g,
      '<span class="fraction"><span class="numerator">$1</span><span class="denom">$2</span></span>'
    );
    formatted = formatted.replace(/nthroot\(\)/g, '<span class="nthroot">[nth root]</span>');
    formatted = formatted.replace(
      /nthroot\(([^,]+),([^)]+)\)/g,
      '<span class="nthroot"><sup>$1</sup>&radic;<span class="radicand">$2</span></span>'
    );
    formatted = formatted.replace(/abs\(\)/g, '<span class="abs">[absolute]</span>');
    formatted = formatted.replace(/abs\(([^)]+)\)/g, '<span class="abs">|$1|</span>');
    mathPreview.innerHTML = formatted;
  }

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

  searchInput.addEventListener('input', function() {
    if (btnSearchMath.classList.contains('active')) {
      updateMathPreview();
    }
  });

  document.getElementById('btnSearch')?.addEventListener('click', function() {
    const query = searchInput.value;
    console.log("Search query:", query);
  });

  document.getElementById('photoUpload')?.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      console.log("Selected photo:", file.name);
    }
  });

  const calcButtons = document.querySelectorAll('.calc-btn');
  calcButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (this.id === 'calcClear') {
        searchInput.value = "";
      } else {
        searchInput.value += this.getAttribute('data-value');
      }
      if (btnSearchMath.classList.contains('active')) {
        updateMathPreview();
      }
    });
  });

  const suggestionButtons = document.querySelectorAll('.suggestion-btn');
  suggestionButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const suggestion = this.getAttribute('data-suggestion');
      searchInput.value = suggestion;
      updateMathPreview();
    });
  });

  // Relative Shadow Effect for Search Card
  const searchCard = document.querySelector('.custom-search-card');
  if (searchCard) {
    searchCard.addEventListener('mousemove', function(e) {
      const rect = searchCard.getBoundingClientRect();
      const offsetX = (e.clientX - rect.left - rect.width / 2) / 10;
      const offsetY = (e.clientY - rect.top - rect.height / 2) / 10;
      searchCard.style.boxShadow = `${offsetX}px ${offsetY}px 20px rgba(0, 0, 0, 0.3)`;
    });
    searchCard.addEventListener('mouseleave', function() {
      searchCard.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
  }
});

/************************************
 * FORMULAS (MSTE/HGE/PSAD)
 ************************************/
document.addEventListener('DOMContentLoaded', function() {
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
    // Add other subtopics here...
  };

  function clearCategoryActive() {
    document.querySelectorAll('#category-group .category-part').forEach(el => {
      el.classList.remove('active');
    });
  }

  function loadSubtopics(category) {
    const subtopicContainer = document.getElementById('subtopic-buttons');
    if (!subtopicContainer) return;
    subtopicContainer.innerHTML = '';
    const subtopics = categorySubtopics[category];
    if (subtopics && subtopics.length > 0) {
      subtopics.forEach(subtopic => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-dark btn-sm m-1 subtopic-btn';
        btn.textContent = subtopic;
        btn.setAttribute('data-subtopic', subtopic);
        btn.addEventListener('click', function() {
          const subtopicName = this.getAttribute('data-subtopic');
          const content = subtopicContent[subtopicName] 
            || `<h5>${subtopicName}</h5><p>Formulas and explanations for ${subtopicName} go here.</p>`;
          document.getElementById('formulas-content').innerHTML = content;
        });
        subtopicContainer.appendChild(btn);
      });
      subtopicContainer.style.display = 'block';
    } else {
      subtopicContainer.style.display = 'none';
    }
  }

  document.querySelectorAll('#category-group .category-part').forEach(el => {
    el.addEventListener('click', function() {
      const tooltipText = document.getElementById('tooltip-text');
      if (tooltipText) {
        tooltipText.style.display = 'none';
      }
      
      const category = this.getAttribute('data-category');
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
});

/************************************
 * PRACTICE QUIZZES
 ************************************/
document.addEventListener('DOMContentLoaded', function() {
  const searchTab = document.getElementById("search-tab");
  const aiTab = document.getElementById("ai-tab");
  const searchSection = document.getElementById("search-section");
  const aiSection = document.getElementById("ai-section");
  if (searchTab && aiTab && searchSection && aiSection) {
    searchTab.addEventListener("click", function() {
      searchSection.style.display = "block";
      aiSection.style.display = "none";
      this.classList.add("pq-tab-active");
      aiTab.classList.remove("pq-tab-active");
    });
    aiTab.addEventListener("click", function() {
      searchSection.style.display = "none";
      aiSection.style.display = "block";
      this.classList.add("pq-tab-active");
      searchTab.classList.remove("pq-tab-active");
    });
  }

  const aiPrompt = document.getElementById("ai-prompt");
  const wordLimitError = document.getElementById("wordLimitError");
  const wordCount = document.getElementById("wordCount");

  if (aiPrompt && wordCount) {
    aiPrompt.addEventListener("input", function() {
      let words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
      if (words.length > 100) {
        this.value = words.slice(0, 100).join(" ");
        words = words.slice(0, 100);
        if (wordLimitError) wordLimitError.style.display = "block";
      } else {
        if (wordLimitError) wordLimitError.style.display = "none";
      }
      wordCount.textContent = words.length + "/100";
    });
  }

  // Pagination
  const quizCardsRow = document.getElementById("quizCardsRow");
  if (quizCardsRow) {
    const quizCards = Array.from(quizCardsRow.querySelectorAll(".quiz-card"));
    const paginationEl = document.getElementById("pagination");
    if (quizCards.length && paginationEl) {
      let currentPage = 1;
      const cardsPerPage = 6;
      const totalPages = Math.ceil(quizCards.length / cardsPerPage);

      function showPage(page) {
        quizCards.forEach(card => card.style.display = "none");
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        quizCards.slice(start, end).forEach(card => card.style.display = "block");
      }

      function setupPagination() {
        paginationEl.innerHTML = "";

        // Prev
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

        // Next
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
    }
  }

  // PQ Card Shadow
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
});

/************************************
 * STUDY SIDEBAR TOGGLE
 ************************************/
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.querySelector(".study-sidebar");
  if (!toggleBtn || !sidebar) return;

  let sidebarVisible = false;
  toggleBtn.addEventListener("click", () => {
    sidebarVisible = !sidebarVisible;
    if (sidebarVisible) {
      sidebar.classList.add("show");
      toggleBtn.textContent = "<";
      toggleBtn.style.left = "calc(240px + 1rem)";
    } else {
      sidebar.classList.remove("show");
      toggleBtn.textContent = ">";
      toggleBtn.style.left = "1rem";
    }
  });
});

/************************************
 * CHATBOT
 ************************************/
document.addEventListener('DOMContentLoaded', function() {
  const chatbotIcon = document.getElementById("chatbot-icon");
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotClose = document.getElementById("chatbot-close");
  const chatInput = document.getElementById("chat-input");
  const chatBody = document.getElementById("chatbot-body");
  const sendBtn = document.getElementById("send-btn");

  if (!chatbotIcon || !chatbotWindow || !chatbotClose || !chatInput || !chatBody || !sendBtn) return;

  // Toggle chat window on icon click
  chatbotIcon.addEventListener("click", () => {
    chatbotWindow.classList.toggle("active");
    chatbotWindow.setAttribute(
      "aria-hidden",
      chatbotWindow.classList.contains("active") ? "false" : "true"
    );
    if (chatbotWindow.classList.contains("active")) {
      chatInput.focus();
    }
  });

  // Hide chat window on close
  chatbotClose.addEventListener("click", () => {
    chatbotWindow.classList.remove("active");
    chatbotWindow.setAttribute("aria-hidden", "true");
  });

  // Send message
  sendBtn.addEventListener("click", () => {
    const userText = chatInput.value.trim();
    if (userText) {
      const userMessage = document.createElement("p");
      userMessage.textContent = userText;
      userMessage.style.textAlign = "right";
      chatBody.appendChild(userMessage);

      chatInput.value = "";
      chatInput.focus();
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  });

  // Send on Enter key
  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendBtn.click();
    }
  });
});
