const updateClock = () => {
  const clockEl = document.getElementById("navClock");
  if (!clockEl) {
    return;
  }
  const now = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const dateNum = now.getDate();
  const yearNum = now.getFullYear();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  clockEl.textContent = `${dayName}, ${monthName} ${dateNum}, ${yearNum} | ${hours}:${minutes}:${seconds}`;
};

const setupFormValidation = () => {
  const form = document.getElementById("mainForm");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("usrName");
    const emailInput = document.getElementById("usrEmail");
    const subjectInput = document.getElementById("usrSubject");
    const msgInput = document.getElementById("usrMsg");

    const nameErr = document.getElementById("errMsgName");
    const emailErr = document.getElementById("errMsgEmail");
    const subjectErr = document.getElementById("errMsgSubject");
    const msgErr = document.getElementById("errMsgMsg");
    const formFeedback = document.getElementById("formFeedback");

    let isValid = true;

    const errorElements = [nameErr, emailErr, subjectErr, msgErr];
    for (let i = 0; i < errorElements.length; i++) {
      if (errorElements[i]) {
        errorElements[i].textContent = "";
      }
    }

    const inputs = [nameInput, emailInput, subjectInput, msgInput];
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i]) {
        inputs[i].classList.remove("is-invalid", "is-valid");
      }
    }

    if (!nameInput.value.trim()) {
      isValid = false;
      nameInput.classList.add("is-invalid");
      nameErr.textContent = "Please enter your name.";
    } else {
      nameInput.classList.add("is-valid");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      isValid = false;
      emailInput.classList.add("is-invalid");
      emailErr.textContent = "Please enter your email.";
    } else if (!emailPattern.test(emailInput.value.trim())) {
      isValid = false;
      emailInput.classList.add("is-invalid");
      emailErr.textContent = "Please enter a valid email address.";
    } else {
      emailInput.classList.add("is-valid");
    }

    if (!subjectInput.value.trim()) {
      isValid = false;
      subjectInput.classList.add("is-invalid");
      subjectErr.textContent = "Please provide a subject.";
    } else {
      subjectInput.classList.add("is-valid");
    }

    if (!msgInput.value.trim()) {
      isValid = false;
      msgInput.classList.add("is-invalid");
      msgErr.textContent = "Please enter your message.";
    } else {
      msgInput.classList.add("is-valid");
    }

    if (isValid) {
      formFeedback.className = "alert alert-success mt-3 d-block";
      formFeedback.textContent = "Thank you! Your message has been sent successfully.";
      form.reset();
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i]) {
          inputs[i].classList.remove("is-valid");
        }
      }
    } else {
      formFeedback.className = "alert alert-danger mt-3 d-block";
      formFeedback.textContent = "Please correct the errors in the form before submitting.";
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  updateClock();
  setInterval(() => {
    updateClock();
  }, 1000);
  setupFormValidation();
});
