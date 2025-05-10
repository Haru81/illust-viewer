import { ButtonProps } from "../types/ButtonProps"

const LeftButton = ({ onClick }: ButtonProps) => {
    return (
      <div className="move-button">
        <button onClick={onClick}>←</button>
      </div>
    )
}

export default LeftButton