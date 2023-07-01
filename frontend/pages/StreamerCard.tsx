import { faHeart, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StreamerCard(): JSX.Element {
	return (
		<div className="w-full flex flex-row py-1">
			<span className="inline-block aspect-square rounded-full h-14 border-2" />
			<div className="flex-1 flex-col pl-4">
				<h3>Asmongold</h3>
				<div className="flex flex-row justify-evenly">
					<span>
						<FontAwesomeIcon icon={faHeart} className="text-red-600" />
						<button>upvote: 123</button>
					</span>
					<span>
						<FontAwesomeIcon icon={faThumbsDown} />
						<button>downvote: 123</button>
					</span>
				</div>
			</div>
		</div>
	);
}

export { StreamerCard };
