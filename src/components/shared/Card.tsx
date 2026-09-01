import type { ReactNode } from "react";

export interface CardProps {
  className?: string;
  children?: ReactNode;
}

function Card() {
  return (
    <div>Card</div>
  )
}

export default Card;
