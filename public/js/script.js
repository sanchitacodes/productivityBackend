(() => {
  'use strict';

  // Bootstrap validation logic
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
          }
          form.classList.add('was-validated');
      }, false);
  });

  // Toggle functionality for login and registration forms
  const loginForm = document.querySelector('.form-box.login');
  const registerForm = document.querySelector('.form-box.register');
  const loginBtn = document.querySelector('.login-btn');
  const registerBtn = document.querySelector('.register-btn');

  if (loginBtn && registerBtn) {
      // Show login form and hide registration form
      loginBtn.addEventListener('click', () => {
          loginForm.style.display = 'block';
          registerForm.style.display = 'none';
      });

      // Show registration form and hide login form
      registerBtn.addEventListener('click', () => {
          loginForm.style.display = 'none';
          registerForm.style.display = 'block';
      });
  }
})();