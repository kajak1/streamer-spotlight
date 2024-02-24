import { HTMLAttributes, ReactNode, useId } from "react";

type Props = {
  amount: number;
  onClick: () => void;
  children: ReactNode;
} & Pick<HTMLAttributes<HTMLSpanElement>, "className">;

export function VoteButton({
  amount,
  children,
  onClick,
  className,
}: Props): JSX.Element {
  const btnId = useId();

  return (
    <span className={`${className ?? ""}`}>
      <label
        htmlFor={btnId}
        className="w-5 text-center text-xl font-semibold text-gray-600"
      >
        {amount ?? "loading"}
      </label>
      <button
        id={btnId}
        className="transition-transform hover:scale-125"
        onClick={onClick}
      >
        {children}
      </button>
    </span>
  );
}
