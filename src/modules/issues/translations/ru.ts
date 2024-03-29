export default {
    bug: 'Баг репорт',
    list: 'Список баг-репортов',
    id: 'ID',
    position: '№',
    created_at: 'Создан',
    updated_at: 'Изменен',
    person: 'Ответственный',
    comments: 'Комментарии',
    description: 'Описание',
    status: 'Статус',
    priority: 'Приоритет',
    title: 'Заголовок',
    user_actions: 'Действия',
    goto: 'Перейти',
    type: 'Тип',
    menu: 'См. полностью',
    show_panel: 'Открыть полностью',
    author: 'Автор',
    tooltip: {
        close: 'Закрыть',
        reopen: 'Открыть заново',
        complete: 'На проверку',
        verify: 'Подтвердить',
        discuss: 'Обсудить',
        notify: 'Статус успешно изменен'
    },
    priority_type: {
        normal: 'Нормальный',
        critical: 'Критический',
        minor: 'Низкий',
        major: 'Высокий'
    },
    type_type: {
        func: 'Реализация',
        report: 'Отчет',
        ui: 'Другое',
        vulnerability: 'Ошибка'
    },
    role_type: {
        qa: 'Проверяющий',
        guest: 'Гость',
        dev: 'Исполнитель'
    },
    status_type: {
        fulfilment: 'В работе',
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
        update: 'Изменить баг-репорт'
    },
    notify: {
        created: 'Баг-репорт успешно создан',
        not_created: 'Ошибка создания баг-репорта',
        updated: 'Баг-репорт успешно обновлен',
        not_updated: 'Ошибка обновления баг-репорта',
        deleted: 'Баг-репорт успешно удален',
        not_deleted: 'Ошибка удаления баг-репорта'
    },
    form: {
        success: 'Баг-репорт создан успешно',
        error: 'Ошибка создания баг-репорта',
        title: 'Создание баг-репорта',
        submit: 'Подтвердить',
        create: 'Создать баг-репорт',
        create_short: 'Создать',
        update: 'Обновить баг-репорт',
        update_short: 'Обновить',
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
}
