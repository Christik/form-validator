import './styles/styles.less';
import validate from './modules/validator';
import togglePassword from './modules/toggle-password';

// Все формы, которые должны валидироваться
const forms = document.querySelectorAll('[data-validated]');

validate(forms);

// Все элементы с паролями
const passwords = document.querySelectorAll('.form-password');

togglePassword(passwords);