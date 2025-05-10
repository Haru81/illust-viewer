import { ButtonProps } from "../types/ButtonProps";

const PlusButton = ({ onClick }: ButtonProps) => {
    return (
        <button onClick={onClick}>+</button>
    );
}

export default PlusButton