import * as yup from 'yup'

function schemaApontamento() {
    return yup.object().shape({
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