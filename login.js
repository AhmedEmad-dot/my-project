document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      const icon = this.querySelector("i");
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  }
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const errorMessage = document.getElementById("errorMessage");
      const successMessage = document.getElementById("successMessage");

      errorMessage.style.display = "none";
      successMessage.style.display = "none";

      if (!email || !email.includes("@") || !email.includes(".")) {
        errorMessage.textContent = "يرجى إدخال بريد إلكتروني صالح";
        errorMessage.style.display = "block";
        return;
      }
      if (!password || password.length < 8) {
        errorMessage.textContent = "كلمة المرور يجب أن تكون 8 حروف على الأقل";
        errorMessage.style.display = "block";
        return;
      }

      successMessage.style.display = "block";
      console.log("Email:", email, "Password:", password);
    });
  }
});
