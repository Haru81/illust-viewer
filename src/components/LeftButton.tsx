import { ButtonProps } from "../types/ButtonProps"

const LeftButton = ({ onClick }: ButtonProps) => {
    return (
      <div className="left-button">
        <button onClick={onClick}>←</button>
      </div>
    )
}

export default LeftButton