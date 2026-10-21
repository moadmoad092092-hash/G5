// ضع عنوان البريد المراد استقبال الرسائل عليه قبل نشر الصفحة.
const CONTACT_EMAIL = 'replace-with-your-email@example.com';

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'فتح القائمة' : 'إغلاق القائمة');
  nav.classList.toggle('open', !isOpen);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'فتح القائمة');
}));

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  if (CONTACT_EMAIL.includes('replace-with-your-email')) {
    status.textContent = 'يرجى إضافة عنوان بريد حقيقي في app.js قبل استخدام نموذج التواصل.';
    return;
  }
  const formData = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`رسالة من ${formData.get('name')}`);
  const body = encodeURIComponent(`الاسم: ${formData.get('name')}\nالبريد: ${formData.get('email')}\n\n${formData.get('message')}`);
  status.textContent = 'جارٍ فتح تطبيق البريد لإرسال رسالتك.';
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});
