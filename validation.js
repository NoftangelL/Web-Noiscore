// validation.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("membershipForm");

  // Set max date for DOB input (today)
  const dobInput = document.getElementById("dob");
  dobInput.max = new Date().toISOString().substring(0, 10);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    clearErrors();

    let valid = true;

    // Name validation: non-empty & letters/spaces only
    let nameVal = form.name.value.trim();
    if (!nameVal) {
      showError("error-name", "Name is required.");
      valid = false;
    } else if (!onlyLettersSpaces(nameVal)) {
      showError("error-name", "Name can only contain letters and spaces.");
      valid = false;
    }

    // Email validation: non-empty & contains '@' and '.' after '@'
    let emailVal = form.email.value.trim();
    if (!emailVal) {
      showError("error-email", "Email is required.");
      valid = false;
    } else if (!validEmail(emailVal)) {
      showError("error-email", "Please enter a valid email.");
      valid = false;
    }

    // Gender validation: one must be checked
    let genderElems = form.gender;
    let genderChecked = false;
    for (let i = 0; i < genderElems.length; i++) {
      if (genderElems[i].checked) {
        genderChecked = true;
        break;
      }
    }
    if (!genderChecked) {
      showError("error-gender", "Please select your gender.");
      valid = false;
    }

    // DOB validation: non-empty, valid date, 13+ years old
    let dobVal = dobInput.value;
    if (!dobVal) {
      showError("error-dob", "Date of birth is required.");
      valid = false;
    } else if (!validDOB(dobVal)) {
      showError("error-dob", "Date of birth is invalid.");
      valid = false;
    } else if (!atLeast13(dobVal)) {
      showError("error-dob", "You must be at least 13 years old.");
      valid = false;
    }

    // Password validation: at least 8 characters
    let pwdVal = form.password.value;
    if (pwdVal.length < 8) {
      showError("error-password", "Password must be at least 8 characters.");
      valid = false;
    }

    // Agreement: must be checked
    if (!form.agreement.checked) {
      showError(
        "error-agreement",
        "You must agree to the terms and conditions."
      );
      valid = false;
    }

    if (valid) {
      alert("Form submitted successfully!");
      form.reset();
    }
  });

  function clearErrors() {
    let errors = document.querySelectorAll(".error");
    errors.forEach((e) => (e.textContent = ""));
  }

  function showError(id, msg) {
    let el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  // Validate only letters and spaces for name
  function onlyLettersSpaces(str) {
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if (
        !(c >= 65 && c <= 90) && // A-Z
        !(c >= 97 && c <= 122) && // a-z
        c !== 32 // space
      ) {
        return false;
      }
    }
    return true;
  }

  // Email validation without regex
  function validEmail(email) {
    let atPos = email.indexOf("@");
    let dotPos = email.lastIndexOf(".");
    return atPos > 0 && dotPos > atPos + 1 && dotPos < email.length - 1;
  }

  // Check if date string is valid date
  function validDOB(dob) {
    let d = new Date(dob);
    return d instanceof Date && !isNaN(d);
  }

  // Check if age >= 13
  function atLeast13(dob) {
    let dobDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    let monthDiff = today.getMonth() - dobDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }
    return age >= 13;
  }
});

/// Filter functionality with debugging logs (product)
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  console.log("Filter buttons found:", filterBtns.length);
  console.log("Product cards found:", productCards.length);

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Clicked button:", btn);
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      let filter = btn.getAttribute("data-filter");
      console.log("Filter applied:", filter);

      productCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
