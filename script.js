const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const strengthBar = document.getElementById("strengthBar");
const feedback = document.getElementById("feedback");

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

lengthEl.addEventListener("input", () => {
    lengthValue.textContent = lengthEl.value;
});

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

function generatePassword() {
    let selectedSets = [];
    if (uppercaseEl.checked) selectedSets.push(upper);
    if (lowercaseEl.checked) selectedSets.push(lower);
    if (numbersEl.checked) selectedSets.push(numbers);
    if (symbolsEl.checked) selectedSets.push(symbols);

    if (selectedSets.length === 0) {
        alert("Selecione pelo menos uma opção.");
        return;
    }

    let password = "";

    selectedSets.forEach(set => {
        password += set[Math.floor(Math.random() * set.length)];
    });

    let allChars = selectedSets.join("");

    for (let i = password.length; i < lengthEl.value; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    password = shuffle(password);

    passwordEl.value = password;
    checkStrength(password);
}

function shuffle(str) {
    return str.split('').sort(() => 0.5 - Math.random()).join('');
}

function copyPassword() {
    if (!passwordEl.value) return;

    navigator.clipboard.writeText(passwordEl.value);
    copyBtn.textContent = "Copiado!";
    setTimeout(() => {
        copyBtn.textContent = "Copiar";
    }, 1500);
}

function checkStrength(password) {
    let strength = 0;

    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const width = strength * 25;
    strengthBar.style.width = width + "%";

    if (width <= 25) {
        strengthBar.style.background = "#ef4444";
        feedback.textContent = "Senha fraca";
    } else if (width <= 50) {
        strengthBar.style.background = "#f97316";
        feedback.textContent = "Senha média";
    } else if (width <= 75) {
        strengthBar.style.background = "#eab308";
        feedback.textContent = "Senha boa";
    } else {
        strengthBar.style.background = "#22c55e";
        feedback.textContent = "Senha forte";
    }
}