const scrollToTopBtn = document.getElementById('scrollToTopBtn');

if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const signupForm = document.querySelector('.signup-form');
const successMessage = document.getElementById('success-message');
const closeSuccess = document.querySelector('.close-success');

if (signupForm && successMessage && closeSuccess) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!signupForm.checkValidity()) {
      signupForm.reportValidity();
      return;
    }

    const sessionMap = {
      online: 5000,
      physical: 8000,
    };

    const selectedSession = signupForm.elements.session.value;
    const selectedCourse = signupForm.elements.course.value;
    const participantName = signupForm.elements.name.value.trim();

    const selectedTrackText =
      Array.from(signupForm.elements.course.options).find(
        (option) => option.value === selectedCourse
      )?.text || 'Not selected';

    const attendanceMode =
      selectedSession === 'online'
        ? 'Online Session'
        : selectedSession === 'physical'
          ? 'Physical Session'
          : 'Not selected';

    const calculatedAmount = sessionMap[selectedSession] ?? 0;

    document.getElementById('summary-name').textContent = participantName || 'N/A';
    document.getElementById('summary-track').textContent = selectedTrackText;
    document.getElementById('summary-mode').textContent = attendanceMode;
    document.getElementById('summary-amount').textContent = `₦${calculatedAmount.toLocaleString()}`;

    signupForm.reset();
    successMessage.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  closeSuccess.addEventListener('click', () => {
    successMessage.hidden = true;
  });
}
