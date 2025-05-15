import { ButtonProps } from "../types/ButtonProps"

const RightButton = ({ onClick }: ButtonProps) => {
    return (
      <div className='right-button'>
        <button onClick={onClick}>→</button>
      </div>
  )
}

export default RightButton