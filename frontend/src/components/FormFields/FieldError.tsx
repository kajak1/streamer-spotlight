import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
	when: boolean;
	message: string | undefined;
}

function FieldError({ when, message }: Props): JSX.Element {
	return (
		<>
			{when && (
				<span className="text-sm text-red-600 flex gap-2 items-baseline mt-1">
					<FontAwesomeIcon icon={faCircleExclamation} />
					<p>{message}</p>
				</span>
			)}
		</>
	);
}

export { FieldError };
