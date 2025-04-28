import './App.css'
import IllustDisplay from './components/IllustDisplay'
import LeftButton from './components/LeftButton'
import MinusButton from './components/MinusButton'
import PlusButton from './components/PlusButton'
import RightButton from './components/RightButton'
import Title from './components/Title'

function App() {
  return (
    <div>
      <Title />
      <IllustDisplay />
      <LeftButton />
      <RightButton />
      <PlusButton />
      <MinusButton />
    </div>
  )
}

export default App
