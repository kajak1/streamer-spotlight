import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";
import { FieldPath, UseFormRegister } from "react-hook-form";

type Props<T extends Record<string, any>> = {
	register: UseFormRegister<T>;
	id: FieldPath<T>;
	label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input<T extends Record<string, any>>({ id, label, register, ...rest }: Props<T>): JSX.Element {
	return (
		<>
			{/* <label htmlFor={id}>{label}</label> */}
			<input {...rest} id={id} {...register(id)} />
		</>
	);
}

type LabelProps = {
	text: ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ text, ...rest }: LabelProps) {
	return <label {...rest}>{text}</label>;
}
