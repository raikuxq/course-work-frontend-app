import * as yup from 'yup';
import {VALIDATION_RULES} from "@/app/config/validation";
// @ts-ignore
import {useI18n} from "vue-i18n";


/**
 * Набор стандартных валидаций (yup инстансы)
 */
export const useValidation = () => {

    const {t} = useI18n()

    const VALIDATION_EMAIL = yup.string()
        .required(t('validations.common.required'))
        .email(t('validations.field.email.default'))

    const VALIDATION_PASSWORD = yup.string()
        .required(t('validations.common.required'))
        .min(VALIDATION_RULES.PASSWORD.MIN_LENGTH,
            `${t('validations.common.min')}${VALIDATION_RULES.PASSWORD.MIN_LENGTH}`)
        .max(VALIDATION_RULES.PASSWORD.MAX_LENGTH,
            `${t('validations.common.max')}${VALIDATION_RULES.PASSWORD.MAX_LENGTH}`)

    const VALIDATION_PASSWORD_CONFIRM = (ref: string) => VALIDATION_PASSWORD
        .oneOf([ yup.ref(ref) ], `${t('validations.field.password.sameAs')}`)

    const VALIDATION_FIRSTNAME = yup.string()
        .required(t('validations.common.required'))
        .min(VALIDATION_RULES.NAME.MIN_LENGTH,
            `${t('validations.common.min')}${VALIDATION_RULES.NAME.MIN_LENGTH}`)
        .max(VALIDATION_RULES.NAME.MAX_LENGTH,
            `${t('validations.common.max')}${VALIDATION_RULES.NAME.MAX_LENGTH}`)
        .matches(VALIDATION_RULES.NAME.REGEX, `${t('validations.common.matches')}`)

    const VALIDATION_LASTNAME = yup.string()
        .required(t('validations.common.required'))
        .min(VALIDATION_RULES.NAME.MIN_LENGTH,
            `${t('validations.common.min')}${VALIDATION_RULES.NAME.MIN_LENGTH}`)
        .max(VALIDATION_RULES.NAME.MAX_LENGTH,
            `${t('validations.common.max')}${VALIDATION_RULES.NAME.MAX_LENGTH}`)
        .matches(VALIDATION_RULES.NAME.REGEX, `${t('validations.common.matches')}`)


    return {
        VALIDATION_EMAIL,
        VALIDATION_PASSWORD,
        VALIDATION_PASSWORD_CONFIRM,
        VALIDATION_FIRSTNAME,
        VALIDATION_LASTNAME,
    }
}
