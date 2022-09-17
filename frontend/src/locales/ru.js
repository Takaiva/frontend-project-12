export default {
    translation: {
        login: {
            username: 'Имя пользователя',
            password: 'Пароль',
            submitButton: 'Войти',
            signup: 'Регистрация',
            newToChat: 'Нет аккаунта? ',
            header: 'Войти',
            errors: {
                username: 'Обязательное поле',
                password: 'Обязательно поле',
                authFailed: 'Неверные имя пользователя или пароль',
            }
        },
        logout: 'Выйти',
        signup: {
            username: 'Имя пользователя',
            password: 'Пароль',
            confirm: 'Подтвердите пароль',
            submitButton: 'Зарегистрироваться',
            header: 'Регистрация',
            errors: {
                username: 'Обязательное поле',
                usernameMinLength: 'Имя не должно быть короче 3 символов',
                usernameMaxLength: 'Имя не должно быть длиннее 20 символов',
                password: 'Обязательное поле',
                passwordMinLength: 'Пароль не должен быть короче 6 символов',
                confirm: 'Пароли должны совпадать',
                alreadyExists: 'Такой пользователь уже существует',
            }
        },
        chat: {
            channels: 'Каналы',
            renameChannelItem: 'Переименовать',
            removeChannelItem: 'Удалить',
            editChannel: 'Редактировать канал',
            sendMessageButton: 'Отправить сообщение',
            messagesCount: 'Количество сообщений: {{count}}',
            typeInPlaceholder: 'Введите сообщение...',
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
            addChannelSuccess: 'Канал успешно добавлен!',
            updateChannelSuccess: 'Канал успешно обновлен!',
            removeChannelSuccess: 'Канал успешно удалён!',
        },
        modals: {
            addChannelHeader: 'Добавить канал',
            addChannelPlaceholder: 'Имя канала',
            renameChannelHeader: 'Переименовать канал',
            renameChannelPlaceholder: 'Новое имя канала',
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
            }
        },
    }
}
