const navToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const bookingForm = document.querySelector('#booking-form');
if (bookingForm) {
  const requestedService = new URLSearchParams(window.location.search).get('service');
  if (requestedService) {
    const serviceSelect = bookingForm.querySelector('#service');
    const serviceValues = { starter: 'Starter Website — KSh 10,400', midlevel: 'Midlevel Website — KSh 16,800', ecommerce: 'E-Commerce Website — KSh 35,200' };
    if (serviceSelect && serviceValues[requestedService]) serviceSelect.value = serviceValues[requestedService];
  }

  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }

    const formData = new FormData(bookingForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    const whatsappText = `Hello Gill Tech Developments, my name is ${name}. I am interested in the ${service} package. Email: ${email}. Phone: ${phone}. Project details: ${message}`;
    const whatsappUrl = `https://wa.me/254143123507?text=${encodeURIComponent(whatsappText)}`;
    const emailUrl = `mailto:davililowebsites@gmail.com?subject=${encodeURIComponent('Project enquiry from ' + name)}&body=${encodeURIComponent(whatsappText)}`;
    const status = document.querySelector('#form-status');
    status.innerHTML = `Thanks, ${name}. Your request is ready to continue on <a href="${whatsappUrl}" target="_blank" rel="noopener">WhatsApp</a> or by <a href="${emailUrl}">email</a>.`;
    status.classList.add('visible');
    window.location.href = emailUrl;
    bookingForm.reset();
  });
}

const doBothButton = document.querySelector('[data-contact-both]');
if (doBothButton) {
  doBothButton.addEventListener('click', () => {
    const payload = new URLSearchParams(window.location.search).toString();
    const popup = window.open(`contact-send.html${payload ? `?${payload}` : ''}`, 'gilltechSendChoice', 'width=440,height=540,noopener');
    if (popup) popup.focus();
  });
}

const sendChoicePage = document.querySelector('#send-choice-page');
if (sendChoicePage) {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || 'there';
  const email = params.get('email') || 'davililowebsites@gmail.com';
  const phone = params.get('phone') || '+254143123507';
  const service = params.get('service') || 'website package';
  const message = params.get('message') || 'I would like to start a project.';
  const whatsappText = `Hello Gill Tech Developments, my name is ${name}. I am interested in the ${service} package. Email: ${email}. Phone: ${phone}. Project details: ${message}`;
  const emailUrl = `mailto:davililowebsites@gmail.com?subject=${encodeURIComponent('Project enquiry from ' + name)}&body=${encodeURIComponent(whatsappText)}`;
  const whatsappUrl = `https://wa.me/254143123507?text=${encodeURIComponent(whatsappText)}`;
  const emailButton = document.querySelector('[data-send-email]');
  const whatsappButton = document.querySelector('[data-send-whatsapp]');
  if (emailButton) emailButton.href = emailUrl;
  if (whatsappButton) whatsappButton.href = whatsappUrl;
}

(() => {
  const tourStorageKey = 'gilltech-tour-seen';
  const pageName = document.body.dataset.page || window.location.pathname.split('/').pop().replace('.html', '') || 'home';
  const sharedSteps = [
    { target: '.site-header', title: 'Find your way around', text: 'Use the navigation to explore the studio, services, portfolio and contact page.' },
    { target: '.page-hero, .hero', title: 'Start with the big picture', text: 'This is the quickest overview of what Gill Tech Developments can help you build.' },
    { target: '.btn-primary', title: 'Take the next step', text: 'Primary buttons lead you to the most useful action on each page.' }
  ];
  const pageSteps = {
    home: [
      { target: '.service-grid', title: 'Choose the right direction', text: 'Browse the service options and find the starting point that fits your project.' },
      { target: '.cta-band', title: 'Ready to talk?', text: 'When you know what you need, book a conversation and share the details.' }
    ],
    services: [{ target: '.service-grid', title: 'Compare services', text: 'Review the packages, then use a booking button to start with your chosen service.' }],
    portfolio: [{ target: '.portfolio-grid', title: 'See the work', text: 'Explore recent projects and open live examples where available.' }],
    contact: [{ target: '#booking-form', title: 'Tell us about your project', text: 'Complete the short form and choose how you would like to continue.' }],
    about: [{ target: '.value-grid, .split', title: 'Get to know the approach', text: 'Learn how the studio works and what guides each project.' }]
  };

  const steps = [...sharedSteps, ...(pageSteps[pageName] || [])]
    .map((step) => ({ ...step, element: document.querySelector(step.target) }))
    .filter((step) => step.element);
  if (!steps.length) return;

  const tour = document.createElement('div');
  tour.className = 'site-tour';
  tour.setAttribute('aria-live', 'polite');
  tour.innerHTML = `<button class="tour-launch" type="button" aria-label="Open Website Guide" title="Website Guide">?</button>
    <div class="tour-backdrop" hidden></div>
    <section class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title" hidden>
      <div class="tour-card-top"><span class="tour-progress"></span><button class="tour-close" type="button" aria-label="Close tour">&times;</button></div>
      <h2 id="tour-title"></h2><p class="tour-text"></p>
      <div class="tour-controls"><button class="tour-skip" type="button">Skip Tour</button><div><button class="tour-back" type="button">Back</button><button class="tour-next btn btn-primary btn-small" type="button">Next</button></div></div>
    </section>`;
  document.body.appendChild(tour);

  const launch = tour.querySelector('.tour-launch');
  const backdrop = tour.querySelector('.tour-backdrop');
  const card = tour.querySelector('.tour-card');
  const progress = tour.querySelector('.tour-progress');
  const title = tour.querySelector('#tour-title');
  const text = tour.querySelector('.tour-text');
  const back = tour.querySelector('.tour-back');
  const next = tour.querySelector('.tour-next');
  let currentStep = 0;
  let activeElement = null;

  const finish = () => {
    localStorage.setItem(tourStorageKey, 'true');
    card.hidden = true;
    backdrop.hidden = true;
    document.body.classList.remove('tour-is-open');
    if (activeElement) activeElement.classList.remove('tour-highlight');
    activeElement = null;
  };
  const render = () => {
    const step = steps[currentStep];
    if (activeElement) activeElement.classList.remove('tour-highlight');
    activeElement = step.element;
    activeElement.classList.add('tour-highlight');
    activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    title.textContent = step.title;
    text.textContent = step.text;
    progress.textContent = `${currentStep + 1} of ${steps.length}`;
    back.disabled = currentStep === 0;
    next.textContent = currentStep === steps.length - 1 ? 'Finish' : 'Next';
    requestAnimationFrame(() => card.classList.add('is-visible'));
  };
  const start = () => {
    currentStep = 0;
    card.hidden = false;
    backdrop.hidden = false;
    document.body.classList.add('tour-is-open');
    render();
    next.focus();
  };
  launch.addEventListener('click', start);
  next.addEventListener('click', () => currentStep === steps.length - 1 ? finish() : (currentStep += 1, render()));
  back.addEventListener('click', () => { if (currentStep > 0) { currentStep -= 1; render(); } });
  tour.querySelector('.tour-skip').addEventListener('click', finish);
  tour.querySelector('.tour-close').addEventListener('click', finish);
  backdrop.addEventListener('click', finish);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') finish();
    if (event.key === 'ArrowRight') next.click();
    if (event.key === 'ArrowLeft') back.click();
  });
  if (!localStorage.getItem(tourStorageKey)) window.setTimeout(start, 700);
})();

