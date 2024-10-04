// HTML Elements
const addMoney = document.getElementById("addMoney");
const TotalLastMonthAmount = document.getElementById("TotalLastMonthAmount");
const balance = document.getElementById("balance");
const notification = document.getElementById("notification");
const normalEye = document.getElementById("normalEye");
const phoneNo = document.getElementById("phoneNo");
const ExpireDate = document.getElementById("ExpireDate");
const Receive = document.getElementById("Receive");
const Send = document.getElementById("Send");
const withdraws = document.getElementById("withdraw");
const transactionDetails = document.getElementById("transactionDetails");

// Variables
let accountBalance = 0;
let dateWritten = new Date();
let minuteDate = dateWritten.getMinutes();
let hourDate = dateWritten.getHours();
let minutesDetermination = (minuteDate < 10) ? `0${minuteDate}` : minuteDate;
let hoursDetermination = (hourDate < 10) ? `0${hourDate}` : hourDate;
let dates = `${hoursDetermination}:${minutesDetermination}`;

// Retrieve the data from localStorage
const firstName = localStorage.getItem("firstName");
const lastName = localStorage.getItem("lastName");
const pin = localStorage.getItem("pin");
const phoneNumber = localStorage.getItem("phoneNumber");

// Set Welcome Message
if (firstName) {
    const welcomeMessage = document.getElementById("welcome");
    welcomeMessage.textContent = `Hi ${firstName}, welcome to Nisha Bank`;
} else {
    window.location.href = "signup.html"; // Redirect if no data
}

// Retrieve account balance from localStorage
accountBalance = Number(localStorage.getItem("accountBalance")) || 0;
balance.innerHTML = `$${accountBalance.toFixed(2)}`;

// Retrieve and display existing transactions from localStorage
let transactionHistory = JSON.parse(localStorage.getItem("transactionHistory")) || [];
transactionHistory.forEach(transaction => {
    transactionDetails.insertAdjacentHTML('beforeend', `<div class="date">${transaction.date}</div><div class="transaction-details">${transaction.details}</div>`);
});

// Function to update account balance in localStorage
function updateAccountBalance() {
    localStorage.setItem("accountBalance", accountBalance);
    balance.innerHTML = `$${accountBalance.toFixed(2)}`;
}

// Function to add transaction to history and update localStorage
function addTransaction(details) {
    const transaction = {
        date: dates,
        details: details
    };
    transactionHistory.push(transaction);
    localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));
    transactionDetails.insertAdjacentHTML('beforeend', `<div class="date">${transaction.date}</div><div class="transaction-details">${transaction.details}</div>`);
}

// Function for adding money
let addmoney = function() {
    let money = Number(prompt("How much money do you want to add to your account?"));
    if (!isNaN(money) && money >= 100 && money <= 100000000000) {
     if (enterPin() === false) {
            return; // Exit if PIN is incorrect
        }
        alert("Money successfully added to your bank account.");
        accountBalance += money;
        updateAccountBalance();
        addTransaction(`A transfer of $${money} has been done to you.`);
    } else {
        alert("Invalid amount.");
    }
}
addMoney.addEventListener("click", addmoney);

// Function for receiving money
let receivemoney = function() {
    let money = Number(prompt("How much money do you want to add to your account?"));
    if (!isNaN(money) && money >= 100 && money <= 100000000000) {
       if (enterPin() === false) {
            return; // Exit if PIN is incorrect
        }
        alert("Money successfully added to your bank account.");
        accountBalance += money;
        updateAccountBalance();
        addTransaction(`You successfully received a sum of $${money}.`);
    } else {
        alert("Invalid amount.");
    }
}
Receive.addEventListener("click", receivemoney);

// Function for sending money
let sendmoney = function() {
    let money = Number(prompt("How much money do you want to send?"));
    if (accountBalance < money) {
        alert("Insufficient funds. Add money to your wallet.");
    } else if (!isNaN(money) && money >= 100 && money <= 100000000000) {
         if (enterPin() === false) {
            return; // Exit if PIN is incorrect
        }
        alert("Amount sent successfully.");
        accountBalance -= money;
        updateAccountBalance();
        addTransaction(`You successfully sent a sum of $${money}.`);
    } else {
        alert("Invalid amount.");
    }
}
Send.addEventListener("click", sendmoney);

// Function for withdrawing money
let withdraw = function() {
    let money = Number(prompt("How much money do you want to withdraw?"));
    if (accountBalance < money) {
        alert("Insufficient funds. Add money to your wallet.");
    } else if (!isNaN(money) && money >= 100 && money <= 100000000000) {
        if (enterPin() === false) {
            return; // Exit if PIN is incorrect
        }
        alert("Amount withdrawn successfully.");
        accountBalance -= money;
        updateAccountBalance();
        addTransaction(`You successfully withdrew a sum of $${money}.`);
    } else {
        alert("Invalid amount.");
    }
}
withdraws.addEventListener("click", withdraw);

// Function for entering PIN
const enterPin = function() {
    let enterpin = Number(prompt("Enter Your PIN"));
    let pins = Number(pin);
    if (pins === enterpin) {
        alert("PIN is correct");
    } else {
        alert("Incorrect PIN");
        return false;
    }
}

// Display phone number (last 4 digits)
let phoneno = phoneNumber.toString();
let lastFourDigit = phoneno.slice(-4);
phoneNo.innerHTML = lastFourDigit;
phoneNo.style.fontWeight = 200;
phoneNo.style.paddingTop = "10px";
phoneNo.style.textAlign = "center";

// Display expiry date (5 years from now)
let Ex = dateWritten.getFullYear();
let day = dateWritten.getMonth() + 1;
let fiveYrsTime = Ex + 5;
ExpireDate.innerHTML = `${day}/${fiveYrsTime}`;
ExpireDate.style.fontWeight = 200;
ExpireDate.style.paddingTop = "10px";
ExpireDate.style.textAlign = "center";

// Toggle balance visibility
let invisible = false;
normalEye.addEventListener("click", () => {
    if (invisible) {
        balance.textContent = `$${accountBalance.toFixed(2)}`;
        normalEye.className = "fa-solid fa-eye";
        invisible = false;
    } else {
        balance.textContent = "****";
        normalEye.className = "fa-regular fa-eye-slash";
        invisible = true;
    }
});