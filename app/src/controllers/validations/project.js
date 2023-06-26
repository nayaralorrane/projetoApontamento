import * as yup from 'yup'

function schemaProject() {
    return yup.object().shape({
        name: yup.string().required('O campo e-mail é obrigatorio')
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
    const validationSchema = schemaProject();
    try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
    } catch (error) {
        return getErrorsFromValidationError(error);
    }
  }