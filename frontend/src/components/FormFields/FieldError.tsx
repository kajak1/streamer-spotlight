interface Props {
	when: boolean;
	message: string | undefined;
}

function FieldError({ when, message }: Props): JSX.Element {
	return (
		<span className="text-sm py-1 text-red-600">
			{when && <p>{message}</p>}
		</span>
	);
}

export { FieldError };
