import * as yup from 'yup'

function schemaUserConfig() {
    return yup.object().shape({
        name: yup.string().required('O campo nome é obrigatorio'),
        email: yup.string().email().required('O campo e-mail é obrigatorio')
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
    const validationSchema = schemaUserConfig();
    try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
    } catch (error) {
        return getErrorsFromValidationError(error);
    }
  }