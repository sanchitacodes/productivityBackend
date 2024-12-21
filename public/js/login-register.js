document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.container');
  const registerBtn = document.querySelector('.toggle-register-btn');
  const loginBtn = document.querySelector('.toggle-login-btn');

  // Show the registration form
  registerBtn.addEventListener('click', function() {
      container.classList.add('active');  // Show register form
  });

  // Show the login form
  loginBtn.addEventListener('click', function() {
      container.classList.remove('active');  // Show login form
  });
});
