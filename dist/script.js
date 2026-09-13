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

