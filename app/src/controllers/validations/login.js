import * as yup from 'yup'

function schemaLogin() {
    return yup.object().shape({
        email: yup.string().email().required('O campo e-mail é obrigatorio'),
        password: yup.string().required('O campo de senha é necessario')
    })
}

function getErrorsFromValidationError(validationError) {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR]
        };
    }, {});
}

export default function validate(values) {
    const validationSchema = schemaLogin();
    try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
    } catch (error) {
        return getErrorsFromValidationError(error);
    }
  }