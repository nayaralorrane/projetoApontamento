import * as yup from 'yup'
//validação do fomrulário de apontamento
function schemaApontamento() {
    return yup.object().shape({ //yup é um validador de formulário
        date: yup.string().required('Este campo é obrigatorio'),
        description: yup.string().required('Este campo é obrigatorio'),
        projetoId: yup.string().required('Este campo é obrigatorio'),
        startTime: yup.string().required('Este campo é obrigatorio'),
        endTime: yup.string().required('Este campo é obrigatorio')
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
    const validationSchema = schemaApontamento();
    try {
        validationSchema.validateSync(values, { abortEarly: false });
        return {};
    } catch (error) {
        return getErrorsFromValidationError(error);
    }
  }