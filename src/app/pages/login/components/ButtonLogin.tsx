import { ReactNode } from "react";

interface IButtonLoginProps {
  type?: "button" | "submit" | "reset" | undefined;
  onClick: () => void;

  children: ReactNode;
}

export const ButtonLogin: React.FC<IButtonLoginProps> = ({ type, onClick, children }) => {
  return (
    <button type={ type } onClick={ onClick }>
      { children }
    </button>
  )
}