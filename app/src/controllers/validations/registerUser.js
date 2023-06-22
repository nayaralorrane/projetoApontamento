import * as yup from 'yup'
//validação formulário de cadastro de usuário
function schemaRegisterUser() {
    return yup.object().shape({
        name: yup.string().required('O campo nome é obrigatorio'),
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
    const validationSchema = schemaRegisterUser();
    try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
    } catch (error) {
        return getErrorsFromValidationError(error);
    }
  }