import * as React from 'react';
import cx from 'classnames';
import { IForm, FormProvider } from 'formulr';

export interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  type: 'horizontal' | 'vertical';
  form: IForm;
  prefix?: string;
}

function preventDefault(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
}

export const Form = React.forwardRef<HTMLFormElement, IFormProps>(
  (
    {
      children,
      className,
      prefix = 'zent',
      form,
      type = 'vertical',
      onSubmit = preventDefault,
      ...props
    },
    ref
  ) => {
    return (
      <FormProvider value={form.ctx}>
        <form
          ref={ref}
          {...props}
          className={cx(
            `${prefix}-form`,
            {
              [`${prefix}-form-vertical`]: type === 'vertical',
              [`${prefix}-form-horizontal`]: type === 'horizontal',
            },
            className
          )}
          onSubmit={onSubmit}
        >
          {children}
        </form>
      </FormProvider>
    );
  }
);

Form.displayName = 'ZentForm';
