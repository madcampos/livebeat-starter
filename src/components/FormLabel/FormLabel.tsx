import type { ReactNode } from 'react';

interface FormLabelProps {
	children?: ReactNode,
	className?: string,
	htmlFor?: string
}

const FormLabel = ({ children, className = '', htmlFor }: FormLabelProps) => (
	<label className={`block text-sm font-bold mb-3 ${className}`} htmlFor={htmlFor}>
		{ children }
	</label>
);

export default FormLabel;
