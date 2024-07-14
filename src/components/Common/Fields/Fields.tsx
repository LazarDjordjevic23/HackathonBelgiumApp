import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TextField from './TextField';
import './Fields.scss';

const Field = ({ field, error, ...rest }) => {
  switch (field.tag) {
    default:
      return <TextField {...rest} {...field} error={error} />;
  }
};

export interface Field {
  id?: string;
  name: string;
  type?: string;
  tag?: string;
  label: string;
  className?: string;
  renderField?: ({ values, errors, touched, setValues, field, setTouched }) => React.ReactNode;
}

export default function Fields({
  fields = [],
  initialValues,
  onSubmit,
  children,
  validationSchema = yup.object().shape({}),
  onValuesChanges,
}: {
  children: (props: { disabled: boolean; errors: Record<string, boolean> }) => React.ReactNode;
  fields: Field[];
  initialValues?: any;
  onSubmit: (values: any) => void;
  validationSchema: yup.ObjectSchema<{}, yup.AnyObject, {}, ''>;
  onValuesChanges: (value: any, setValues, errors) => void;
}) {
  const [values, setValues] = useState({});
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const valuesMergedValue = Object.values(values).join(' ');

  const rawTouched = Object.entries(touched)
    .filter(([key, value]) => value)
    .map(([key, value]) => key);

  const hasErrors = !!Object.values(errors).length;

  // const mockInitialValues = useMemo(() => fromFieldsToMockValues(fields, ''), [fields]);
  const stringifiedVersionOfInitialValues = JSON.stringify(initialValues ?? {});
  const initialValuesWithMock = useMemo(() => ({ ...values, ...initialValues }), [initialValues]);

  const handleChange = (e) => {
    const value = e?.target?.value;
    const name = e?.target?.name;
    const validatedValue = value;
    const dataObj = {
      [name]: validatedValue,
    };
    setValues((_values) => ({ ..._values, ...dataObj }));
  };
  const handleBlur = ({ target: { name } }) => setTouched({ ...touched, [name]: true });

  const handleSubmit = (e) => {
    const allFieldsKey = fields.map((field) => field.name).reduce((prev, curr) => ({ ...prev, [curr]: true }), {});

    e.preventDefault();
    setTouched(allFieldsKey);
    if (!hasErrors) onSubmit(values);
  };

  useEffect(() => {
    onValuesChanges(values, setValues, errors);
  }, [valuesMergedValue]);

  const fromValuesToTouched = () => {
    let result = {}; // array of { [fieldName]: true } for touched fields
    Object.entries({ ...initialValues, ...initialValues } ?? {}).forEach(([key, value]) => {
      if (Number.isFinite(value) || value) result = { ...result, [key]: true };
    });
    setTouched({ ...touched, ...result });
  };

  const validate = async () => {
    validationSchema
      ?.validate(values, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch(({ inner }) => {
        const innerErrors = inner
          .map((innerError) => ({ [innerError.params.path]: innerError.errors }))
          .reduce((prev, curr) => ({ ...prev, ...curr }));
        setErrors(innerErrors);
      });
  };

  useEffect(() => {
    validate();
  }, [values, initialValuesWithMock]);

  const getError = useCallback(
    (field) => {
      const allFieldsErrors = errors?.[field.name];
      const showError = touched?.[field.name];
      const errorMsg = (showError && allFieldsErrors) || '';
      return { showError, errorMsg };
    },
    [errors, touched],
  );
  const formDisabled = !!Object.keys(errors)?.length;

  const passedProps = {
    values,
    setValues,
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div
        className={clsx('flex flex-col w-full gap-4 default-fields-wrapper d-flex flex-wrap  gap-md')}
        onSubmit={handleSubmit}
      >
        {fields.map((field) => (
          <div key={field.id} className={clsx('custom-field-wrapper', field.className)}>
            <div className="label-wrapper">
              {field.label && (
                <label className="text-white" htmlFor={field.id}>
                  {field.label}
                </label>
              )}
              {/* {!!field.secondHint && (
                <div className="field-tooltip-hint">
                  {addPropsToChildren(field.secondHint, { ...passedProps, field })}
                </div>
              )} */}
            </div>
            <div className="field-container">
              {field?.renderField ? (
                field?.renderField({ values, errors, touched, setValues, field, setTouched })
              ) : (
                <Field
                  value={values?.[field.name]}
                  onBlur={handleBlur}
                  error={getError(field).errorMsg || ''}
                  field={{ ...field, value: values?.[field.name] }}
                  onChange={(e) => handleChange(e)}
                />
              )}
              <div className="text-error-content">{getError(field).errorMsg}</div>
            </div>
          </div>
        ))}
      </div>
      {children({ disabled: hasErrors, errors })}
      {/* {children?.({
        disabled: formDisabled,
        errors,
        values,
        touched,
        defaultWrapperClass: 'btns-wrapper',
        triggerOnSubmit: handleSubmit,
      })} */}
    </form>
  );
}

//   {!!field.inlineHint && <div className="field-inline-hint">{field.inlineHint}</div>}
//   {!!field.hint && <div className="field-hint">{field.hint({ values })}</div>}

//   {!getError(field).errorMsg && <div className="bottom-hint">{field?.help?.()}</div>}
