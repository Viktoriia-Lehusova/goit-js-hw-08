import throttle from 'lodash.throttle';
const SAVED_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

const formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));
onPopulateForm();

function onFormSubmit(evt) {
  evt.preventDefault();

  const savedForm = localStorage.getItem(SAVED_KEY);
  const parseForm = JSON.parse(savedForm);

  if (
    parseForm === null ||
    parseForm.email === '' ||
    parseForm.message === ''
  ) {
    alert('Всі поля повинні бути заповнені');
  } else {
    evt.target.reset();
    localStorage.removeItem(SAVED_KEY);
  }
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  console.log(formData);

  localStorage.setItem(SAVED_KEY, JSON.stringify(formData));
}

function onPopulateForm() {
  const savedForm = localStorage.getItem(SAVED_KEY);
  const parseForm = JSON.parse(savedForm);

  if (parseForm) {
    console.log('ok');
    if (parseForm.email) {
      input.value = parseForm.email;
    }
    if (parseForm.message) {
      textarea.value = parseForm.message;
    }
  }
}
