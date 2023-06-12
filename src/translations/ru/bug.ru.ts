export default {
    bug: 'Баг репорт',
    list: 'Список баг-репортов',
    id: 'ID',
    position: '№',
    created_at: 'Создан',
    updated_at: 'Изменен',
    person: 'Ответственный',
    status: 'Статус',
    priority: 'Приоритет',
    title: 'Заголовок',
    user_actions: 'Действия',
    resolutions: 'Разрешения',
    type: 'Тип',
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
    type_type: {
        func: 'Функциональность',
        report: 'Отчетность',
        ui: 'Интерфейс',
        vulnerability: 'Уязвимость'
    },
    role_type: {
        qa: 'Проверяющий',
        guest: 'Гость',
        dev: 'Исполнитель'
    },
    status_type: {
        fulfilment: 'Выполнение',
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
        error: 'Ошибка создания баг-репорта',
        title: 'Создание баг-репорта',
        submit: 'Подтвердить',
        create: 'Создать баг-репорт',
        update: 'Обновить баг-репорт',
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
            placeholder: 'Выбрать ответственного'
        },
        type: {
            label: 'Тип',
            placeholder: 'Выбрать тип'
        }
    },
    history: {
        title: 'История изменений'
    }
}
