const storageKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

// Функция для чтения данных, введенных в форму
function readFormData() {
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  return {
    email,
    message,
  };
}

// Сохранение данных в локальное хранилище при вводе данных в форму
form.addEventListener('input', event => {
  const data = readFormData();
  event.preventDefault();
  const jsonData = JSON.stringify(data);
  localStorage.setItem(storageKey, jsonData);
});

// При наличии данных в локальном хранилище выводим их в форму сразу
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

// Если все поля заполнены: очищаем хранилище и форму при отправке формы + выводим данные в консоль
form.addEventListener('submit', event => {
  event.preventDefault();
  if (form.email.value.trim() !== '' && form.message.value.trim() !== '') {
    console.log(readFormData());
    localStorage.removeItem(storageKey);
    form.reset();
  } else {
    return;
  }
});
