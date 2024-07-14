import { useCallback } from 'react';
import * as yup from 'yup';

const urlValidation = yup
  .string()
  .matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter correct url!',
  );

export const validationSchema = yup.object({
  name: yup.string().required('Required'),
  description: yup.string().required('Required'),
  website: urlValidation.required('Required'),
  twitter: urlValidation.required('Required'),
  instagram: urlValidation,
  facebook: urlValidation,
  tweet_id: yup.string().required('Required'),
  start_time: yup.string().required('Start date is required'),
  end_time: yup.string().required('End date is required'),
  total_rewards: yup.number().required('Required'),
});

export const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {},
          ),
        };
      }
    },
    [validationSchema],
  );
