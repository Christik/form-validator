import './styles/styles.less';
import validate from './modules/validator';

// Все формы, которые должны валидироваться
const forms = document.querySelectorAll('[data-validated]');

validate(forms);