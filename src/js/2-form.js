const storageKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

// функція для читання даних, введених в таблиці
function readFormData() {
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  return {
    email,
    message,
  };
}

// збереження даних в локальне сховище
form.addEventListener('input', event => {
  const data = readFormData();
  event.preventDefault();
  const jsonData = JSON.stringify(data);
  localStorage.setItem(storageKey, jsonData);
});

// при наявності даних в локальному сховищі виведення даних одразу в форму
const rowData = localStorage.getItem(storageKey);
if (rowData) {
  const isData = JSON.parse(rowData);
  if (isData.email) {
    form.email.value = isData.email;
  }
  if (isData.message) {
    form.message.value = isData.message;
  }
}

// якщо всі поля заповнені: очищення сховища і форми при натисканні кнопки + виведення даних в консоль
