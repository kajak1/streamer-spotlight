import { HTMLAttributes } from "react";
import { FieldPath, UseFormRegister } from "react-hook-form";

type Props<T extends Record<string, any>> = {
	register: UseFormRegister<T>;
	id: FieldPath<T>;
	label: string;
} & HTMLAttributes<HTMLInputElement>;

function Input<T extends Record<string, any>>({
	id,
	label,
	register,
	...rest
}: Props<T>): JSX.Element {
	return (
		<>
			<label htmlFor={label} className="pb-2">
				{label}
			</label>
			<input {...rest} id={id} {...register(id)} />
		</>
	);
}

export { Input };
