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
form.addEventListener('submit', event => {
  event.preventDefault(); // скидаємо значення за замовчуванням
  const email = event.target.elements.email.value;
  const message = event.target.elements.message.value;

  if (email === '' || message === '') {
    //якщо хоч одне поле не заповнене виводимо повідомлення про необхідність заповнення всіх полів
    return alert('All form fields must be filled in');
  }
  if (getLocalStorageData() !== null) {
    //перевірка якщо є дані, то виводимо в консоль
    console.log(getLocalStorageData());
  }

  localStorage.removeItem(STORAGE_KEY); //очищаємо локальне сховище
  form.reset(); // очищаємо дані форми
});
