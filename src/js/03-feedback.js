import throttle from 'lodash.throttle';
const SAVED_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');

let formData = {
  email: '',
  message: '',
};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));
onPopulateForm();

if (!localStorage.getItem(SAVED_KEY)) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(formData));
}
email.required = 'true';
message.required = 'true';

function onFormSubmit(evt) {
  evt.preventDefault();

  const savedForm = localStorage.getItem(SAVED_KEY);
  const parseForm = JSON.parse(savedForm);
  console.log(parseForm);

  formData.email = '';
  formData.message = '';

  localStorage.setItem(SAVED_KEY, JSON.stringify(formData));

  evt.target.reset();
  localStorage.removeItem(SAVED_KEY);
}

function onFormInput() {
  formData.email = email.value;
  formData.message = message.value;

  localStorage.setItem(SAVED_KEY, JSON.stringify(formData));
}

function onPopulateForm() {
  const savedForm = localStorage.getItem(SAVED_KEY);
  const parseForm = JSON.parse(savedForm);

  if (parseForm) {
    email.value = parseForm.email;
    message.value = parseForm.message;
  }
}
