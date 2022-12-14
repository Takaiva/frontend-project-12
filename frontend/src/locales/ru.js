export default {
  translation: {
    login: {
      username: 'Ваш ник',
      password: 'Пароль',
      submitButton: 'Войти',
      signup: 'Регистрация',
      newToChat: 'Нет аккаунта? ',
      header: 'Войти',
      errors: {
        username: 'Обязательное поле',
        password: 'Обязательно поле',
        authFailed: 'Неверные имя пользователя или пароль',
      },
    },
    logout: 'Выйти',
    navbarHeader: 'Station301',
    signup: {
      username: 'Имя пользователя',
      password: 'Пароль',
      confirm: 'Подтвердите пароль',
      submitButton: 'Зарегистрироваться',
      header: 'Регистрация',
      errors: {
        username: 'Обязательное поле',
        usernameMinLength: 'От 3 до 20 символов',
        usernameMaxLength: 'От 3 до 20 символов',
        password: 'Обязательное поле',
        passwordMinLength: 'Не менее 6 символов',
        confirm: 'Пароли должны совпадать',
        alreadyExists: 'Такой пользователь уже существует',
      },
    },
    chat: {
      channels: 'Каналы',
      renameChannelItem: 'Переименовать',
      removeChannelItem: 'Удалить',
      editChannel: 'Управление каналом',
      sendMessageButton: 'Отправить сообщение',
      messagesCount: 'Количество сообщений: {{count}}',
      newMessagePlaceholder: 'Введите сообщение...',
      newMessageAriaLabel: 'Новое сообщение',
    },
    notFound: {
      header: 'Страница не найдена',
      message: 'Но вы можете перейти ',
      linkText: 'на главную страницу',
    },
    errors: {
      network: 'Ошибка соединения',
      unknown: 'Неизвестная ошибка',
    },
    notifications: {
      authSuccess: 'Рады видеть тебя, {{username}}!',
      addChannelSuccess: 'Канал создан',
      updateChannelSuccess: 'Канал переименован',
      removeChannelSuccess: 'Канал удалён',
    },
    modals: {
      addChannelHeader: 'Добавить канал',
      addChannelPlaceholder: 'Имя канала',
      renameChannelHeader: 'Переименовать канал',
      renameChannelPlaceholder: 'Имя канала',
      removeChannelHeader: 'Удалить канал',
      removeChannelButton: 'Удалить',
      removeChannelBody: 'Уверены?',
      cancelButton: 'Отменить',
      submitButton: 'Отправить',
      errors: {
        required: 'Обязательное поле',
        alreadyExists: 'Канал с таким именем уже существует',
        minLength: 'Имя должно не должно быть короче 3 символов',
        maxLength: 'Имя не должно быть длиннее 20 символов',
      },
    },
  },
};
