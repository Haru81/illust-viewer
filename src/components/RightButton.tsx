import { ButtonProps } from "../types/ButtonProps"

const RightButton = ({ onClick }: ButtonProps) => {
    return (
      <div className='move-button'>
        <button onClick={onClick}>→</button>
      </div>
  )
}

export default RightButton