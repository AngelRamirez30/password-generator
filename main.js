document.getElementById('generate-passwords').addEventListener('click', generatePasswords);

function generatePasswords() {
  let baseString = document.getElementById('base-string').value;
  baseString = baseString.replace(/\s+/g, ''); // Eliminar todos los espacios
  const passwordList = document.getElementById('password-list');
  passwordList.innerHTML = '';

  if (!baseString) {
    showNotification('Por favor, ingresa una cadena de texto.', true);
    return;
  }

  for (let i = 0; i < 5; i++) {
    const password = generateSecurePassword(baseString);
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span class="material-icons" onclick="copyToClipboard('${password}')">content_copy</span> ${password}`;
    passwordList.appendChild(listItem);
  }
}

function generateSecurePassword(base) {
  const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const numbers = '0123456789';
  let password = base.split('').map(char => {
    if (Math.random() < 0.5) {
      return char.toUpperCase();
    } else {
      return char.toLowerCase();
    }
  }).join('');

  // Insert at least one special character
  const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
  const specialCharIndex = Math.floor(Math.random() * password.length);
  password = password.slice(0, specialCharIndex) + randomSpecialChar + password.slice(specialCharIndex);

  // Insert at least one number
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  const numberIndex = Math.floor(Math.random() * password.length);
  password = password.slice(0, numberIndex) + randomNumber + password.slice(numberIndex);

  // Ensure password length is at least 8 characters
  while (password.length < 14) {
    const extraChar = specialChars + numbers;
    password += extraChar[Math.floor(Math.random() * extraChar.length)];
  }

  return password;
}

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Contraseña copiada al portapapeles');
  }).catch(err => {
    showNotification('Error al copiar la contraseña', true);
    console.error('Error al copiar la contraseña: ', err);
  });
}

function showNotification(message, isError = false) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = isError ? 'show error' : 'show';

  setTimeout(() => {
    notification.className = 'hidden';
  }, 3000);
}
