export default {
    bug: 'Баг репорт',
    id: 'ID',
    position: '№',
    created_at: 'Создан',
    person: 'Ответственный',
    status: 'Статус',
    priority: 'Приоритет',
    title: 'Заголовок',
    user_actions: 'Действия',
    resolutions: 'Разрешения',
    locales: 'Языки',
    browsers: 'Браузеры',
    menu: 'См. полностью',
    show_panel: 'Открыть полностью',
    author: 'Автор',
    tooltip: {
        close: 'Закрыть',
        reopen: 'Открыть заново',
        complete: 'На проверку',
        verify: 'Подтвердить',
        discuss: 'Обсудить',
        return: 'Вернуть исполнителю',
        reproduce: 'Не воспроизводится',
        resolutions: {
            mobile: 'Мобильные',
            tablet: 'Планшетные',
            laptop: 'Лэптопы',
            desktop: 'Настольные',
            all: 'Все'
        },
        notify: 'Статус успешно изменен'
    },
    priority_type: {
        normal: 'Нормальный',
        critical: 'Критический',
        minor: 'Слабый',
        major: 'Высокий'
    },
    status_type: {
        new: 'Новый',
        to_verify: 'На проверку',
        cant_reproduce: 'Не воспроизводится',
        closed: 'Закрыт',
        to_be_discussed: 'Обсуждается',
        verified: 'Подтвержден',
        returned: 'Возвращен'
    },
    actions: {
        create: 'Создать баг-репорт',
        delete: 'Удалить баг-репорт',
        edit: 'Изменить баг-репорт'
    },
    notify: {
        created: 'Баг-репорт успешно создан',
        updated: 'Баг-репорт успешно обновлен',
        deleted: 'Баг-репорт успешно удален'
    },
    form: {
        success: 'Баг-репорт создан успешно',
        title: 'Создание баг-репорта',
        field_title: {
            label: 'Заголовок',
            placeholder: ''
        },
        desc: {
            label: 'Описание',
            placeholder: ''
        },
        priority: {
            label: 'Приоритет',
            placeholder: 'Выбрать приоритет'
        },
        status: {
            label: 'Статус',
            placeholder: 'Выбрать статус'
        },
        responsible: {
            label: 'Ответственный',
            placeholder: 'Выбрать разработчика'
        },
        locales: {
            label: 'Языки',
            placeholder: 'Выбрать языки'
        },
        browsers: {
            label: 'Браузеры',
            placeholder: 'Выбрать браузеры'
        },
        resolutions: {
            label: 'Разрешения',
            placeholder: 'Выбрать разрешения'
        }
    },
    history: {
        title: 'История изменений'
    }
}
