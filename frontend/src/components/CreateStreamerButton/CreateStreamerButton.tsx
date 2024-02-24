interface Props {
  onClick: () => void;
}

export function CreateStreamerButton({ onClick }: Props): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="hover:font-regular mb-6 w-full self-stretch rounded-md border-0 border-gray-800 bg-gray-800 py-3 font-semibold text-white shadow-md hover:border-gray-700 hover:bg-gray-700 active:font-thin"
    >
      ADD YOURS
    </button>
  );
}

// <button
//   onClick={onClick}
//   className="hover:font-regular w-full self-stretch rounded-md border-2 border-gray-800 bg-gray-800 py-2 text-white hover:border-gray-700 hover:bg-gray-700 active:font-thin"
// >
//   Add your streamer!
// </button>
