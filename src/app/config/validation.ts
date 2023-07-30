const ALLOWED_LETTER_CHARS = 'а-яА-ЯёЁa-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆŠŽ∂ð'

export const VALIDATION_RULES = {
    MESSAGE: {
        MAX_LENGTH: 1500,
        MIN_LENGTH: 2,
        REGEX: new RegExp(/[a-zA-Zа-яА-Я\d]{2,100}/gm),
    },
    NAME: {
        MAX_LENGTH: 64,
        MIN_LENGTH: 2,
        REGEX: new RegExp(`^(?!.*-.*-.*-.*)(?!.*'.*'.*'.*)(?!.*\\s.*\\s.*\\s.*)[${ALLOWED_LETTER_CHARS}' -]+[${ALLOWED_LETTER_CHARS}]$`),
    },
    PASSWORD: {
        MAX_LENGTH: 64,
        MIN_LENGTH: 8,
        REGEX: new RegExp(/[^a-zA-Z0-9_!@#$%^&*]/g)
    },
    TITLE: {
        MAX_LENGTH: 150,
        MIN_LENGTH: 2,
    },
}
