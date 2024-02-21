import type { ReactNode } from 'react';

interface FormRowProps {
	children?: ReactNode,
	className?: string
}

const FormRow = ({ children, className = '' }: FormRowProps) => (
	<div className={className}>
		{ children }
	</div>
);

export default FormRow;
