import type { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
	children?: ReactNode,
	className?: string,
	color?: string,
	onClick?: MouseEventHandler<HTMLButtonElement>,
	isSubmitting?: boolean
}

const Button = ({ children, className = '', color = 'slate', onClick, isSubmitting }: ButtonProps) => {
	let buttonColor = 'text-white bg-slate-600 hover:bg-slate-500 dark:bg-slate-500 dark:hover:bg-slate-400';

	if (color === 'red') {
		buttonColor = 'text-white bg-red-600 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400';
	}

	if (isSubmitting) {
		buttonColor = 'text-white bg-gray-400 cursor-not-allowed dark:bg-gray-600 dark:hover:bg-gray-500';
	}

	return (
		<button
			onClick={(evt) => {
				if (isSubmitting) {
					return;
				}

				onClick?.(evt);
			}}
			className={`inline-block rounded py-2.5 px-6 text-sm font-bold uppercase ${buttonColor} ${className}`}
			aria-busy={isSubmitting ? 'true' : 'false'}
			aria-disabled={isSubmitting ? 'true' : 'false'}
			aria-label={isSubmitting ? 'Submitting data' : undefined}
		>
			{ children }
		</button>
	);
};

export default Button;
