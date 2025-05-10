import { ButtonProps } from "../types/ButtonProps";

const MinusButton = ({ onClick }: ButtonProps) => {
    return (
        <button onClick={onClick}>-</button>
    );
}

export default MinusButton