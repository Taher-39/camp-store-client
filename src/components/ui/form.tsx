import * as React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form = ({ children, ...props }: FormProps) => {
  return <form {...props}>{children}</form>;
};

interface FormFieldProps {
  name: string;
  children: React.ReactNode;
}

const FormField = ({ name, children }: FormFieldProps) => {
  const { register } = useFormContext();
  
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...register(name),
        ...child.props,
      });
    }
    return child;
  });
};

interface FormItemProps {
  children: React.ReactNode;
  className?: string;
}

const FormItem = ({ children, className }: FormItemProps) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

interface FormLabelProps {
  children: React.ReactNode;
  className?: string;
}

const FormLabel = ({ children, className }: FormLabelProps) => {
  return (
    <label className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
      {children}
    </label>
  );
};

interface FormControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
}

const FormControl = React.forwardRef<HTMLInputElement, FormControlProps>(
  ({ asChild = false, ...props }, ref) => {
    if (asChild) {
      return <>{props.children}</>;
    }
    return <input ref={ref} {...props} />;
  }
);

interface FormMessageProps {
  children?: React.ReactNode;
  className?: string;
}

const FormMessage = ({ children, className }: FormMessageProps) => {
  return (
    <p className={`text-xs text-red-500 mt-1 ${className}`}>
      {children}
    </p>
  );
};

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
};