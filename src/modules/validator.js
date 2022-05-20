// Настройки
const settings = {
    inputErrorClass: 'form-field_error',
    inputSuccessClass: 'form-field_success',
    inputWrapper: '.form-group',
    errorMessage: '.form-error',
};

// Получить элемент с текстом ошибки
const getErrorMessageElement = (input) => {
    const inputWrapper = input.closest(settings.inputWrapper);
    const messageElement = inputWrapper.querySelector(settings.errorMessage);

    return messageElement;
};

// Показать ошибку для невалидного поля
const showError = (input, message) => {
    input.classList.remove(settings.inputSuccessClass);
    input.classList.add(settings.inputErrorClass);

    const messageElement = getErrorMessageElement(input);
    messageElement.textContent = message;
    messageElement.style.display = 'block';
};

// Подсветить валидное поле
const showSuccess = (input) => {
    input.classList.remove(settings.inputErrorClass);
    input.classList.add(settings.inputSuccessClass);

    const messageElement = getErrorMessageElement(input);
    
    if (messageElement) {
        messageElement.textContent = '';
        messageElement.style.display = 'none';
    }
};

// Проверка поля на пустое значение
const isEmpty = (input) => {
    return input.value.trim() === '';
};

// Проверить совпадение значений полей
const isEqualValid = (input) => {  
    const comparedInputSelector = input.dataset.equalTo;
    const comparedInput = document.querySelector(comparedInputSelector);
    const isValid = input.value === comparedInput.value;

    return isValid;
};

// Проверить email
const isEmailValid = (input) => {  
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return input.value.match(regex);
};

// Проверить поле на максимальную длину
const isMaxLengthValid = (input) => {
    const { maxLength } = input.dataset;
    const isValid = input.value.length <= parseInt(maxLength);
    
    return isValid;
};

// Проверить поле на минимальную длину
const isMinLengthValid = (input) => {
    const { minLength } = input.dataset;
    const isValid = input.value.length >= parseInt(minLength);
    
    return isValid;
};

// Проверить поле на обязательность заполнения
const isRequiredValid = (input) => {
    const isRequired = input.dataset.required;
    const isInvalid = isRequired && isEmpty(input);
    const isValid = !isInvalid;
    
    return isValid;
};

// Правила валидации
const rules = {
    required: {
        isValid: isRequiredValid,
        defaultMessage: 'Поле обязательно для заполнения',
    },
    minLength: {
        isValid: isMinLengthValid,
        defaultMessage: 'Значение слишком короткое',
    },
    maxLength: {
        isValid: isMaxLengthValid,
        defaultMessage: 'Значение слишком длинное',
    },
    email: {
        isValid: isEmailValid,
        defaultMessage: 'Праверьте правильность ввода электронной почты',
    },
    equalTo: {
        isValid: isEqualValid,
        defaultMessage: 'Значение полей не совпадают',
    },
};

// Получить текст сообщения об ошибке
const getErrorMessageText = (input, rule) => {
    const { defaultMessage } = rules[rule];
    const customMessage = input.dataset[`${rule}Message`];

    return customMessage ?? defaultMessage;
};

// Обработчик события отправки формы
const formSubmitHandler = (event) => {
    event.preventDefault();

    const form = event.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isFormValid = true;

    inputs.forEach((input) => {
        const ruleNames = Object.keys(rules);

        for (const rule of ruleNames) {
            const hasInputRule = input.dataset[rule];

            if (hasInputRule) {
                const { isValid } = rules[rule];

                if (isValid(input)) {
                    showSuccess(input);
                } else {
                    isFormValid = false;

                    const message = getErrorMessageText(input, rule);
                    showError(input, message);

                    break;
                }
            }
        }
    });

    if (isFormValid) {
        // Ура,орма прошла валидацию, можно отправлять данные на сервер
    }
};

// Функция инициализации
export default (forms) => {

    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            formSubmitHandler(event);
        });
    });

};