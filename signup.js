const firstName = document.getElementById("firstName"); const lastName = document.getElementById("lastName"); const dateOfBirth = document.getElementById("dateOfBirth"); const email = document.getElementById("email"); let password = document.getElementById("password"); const phoneNumber = document.getElementById("phoneNumber"); let confirmPassword= document.getElementById("confirmPassword"); const submitForm = document.getElementById("submitForm"); const inputInfo = document.querySelectorAll(".inputInfo"); const pin = document.getElementById("pin");
let today = new Date();
submitForm.addEventListener("click", () => {
    if (
        firstName.value === "" ||
        lastName.value === "" ||
        dateOfBirth.value === "" ||
        email.value === "" ||
        password.value === "" ||
        confirmPassword.value === "" ||
        phoneNumber.value === "" ||
        pin.value === ""
    ) {
        alert("Input All Values");
        inputInfo.forEach((inputInfo) => {
            inputInfo.value = "";
        });
    } else if (password.value !== confirmPassword.value) {
        let message = document.getElementById("message");
        message.textContent = "Please the password doesn't match. Input a match password";
        message.style.paddingTop = "25px";
        confirmPassword.value = "";
        password.value = "";
    } else {
        // Store data in localStorage
        localStorage.setItem("firstName", firstName.value);
        localStorage.setItem("lastName", lastName.value);
        localStorage.setItem("dateOfBirth", dateOfBirth.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("phoneNumber", phoneNumber.value);
         localStorage.setItem("password", password.value);
        localStorage.setItem("pin", pin.value);
        localStorage.setItem("today", today);

        alert("You have successfully created a Nisha Bank Account. Enjoy our Services");
        window.location.href = "Home.html";
    }
});
console.log(pin);