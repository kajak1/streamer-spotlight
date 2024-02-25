import { ReactNode } from "react";

interface Props {
  buttons: [ReactNode, ReactNode];
}

export function VoteButtonGroup({ buttons }: Props) {
  return (
    <div className="grid justify-items-end gap-3 self-center rounded-md">
      {/* <div className="flex flex-col items-center justify-center rounded-md"> */}
      {buttons[0]}
      {/* <span className="flex-shrink-1 w-[1px] bg-gray-700/90"></span> */}
      {buttons[1]}
    </div>
  );
  // return (
  //   <div className="flex gap-3 rounded-md border-2 border-gray-700 bg-red-400/70 px-2 py-1">
  //     {buttons[0]}
  //     <span className="flex-shrink-1 w-[1px] bg-red-700/90"></span>
  //     {buttons[1]}
  //   </div>
  // );
}
