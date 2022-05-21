// Настройки
const settings = {
    hiddenClass: 'is-hidden',
    shownClass: 'is-shown',
    button: '[data-toggle]',
};

// Изменить тип у инпута
const toggleType = (input) => {
    const currentType = input.type;
    
    input.type = (currentType === 'password') ? 'text' : 'password';
};

// Изменить класс
const toggleClass = (password) => {
    password.classList.toggle(settings.hiddenClass);
    password.classList.toggle(settings.shownClass);
};

export default (passwords) => {
    passwords.forEach((password) => {
        const button = password.querySelector(settings.button);
        const input = password.querySelector('input');

        button.addEventListener('click', (event) => {
            toggleClass(password);
            toggleType(input);
        });
    });
};
