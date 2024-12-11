import { toTypedSchema } from '@vee-validate/zod';
import { ZodSchema } from 'zod';
import { useField, useForm, useResetForm } from 'vee-validate';

export const useValidation = <T = any>(schema: ZodSchema, model?: T) => {
	const validationSchema = toTypedSchema(schema);

	const {
		handleSubmit,
		errors,
		isSubmitting,
		isValidating,
		values,
		errorBag,
		resetForm,
		setErrors,
		setFieldError,
		setFieldValue,
	} = useForm({
		validationSchema,
		initialValues: model,
	});

	return {
		isSubmitting,
		isValidating,
		values,
		errorBag,
		handleSubmit,
		errors,
		setErrors,
		useField,
		setFieldError,
		setFieldValue,
		resetForm,
	};
};
