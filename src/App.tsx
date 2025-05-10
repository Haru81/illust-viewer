import { useEffect, useState } from 'react'
import './App.css'
import IllustDisplay from './components/IllustDisplay'
import LeftButton from './components/LeftButton'
import MinusButton from './components/MinusButton'
import PlusButton from './components/PlusButton'
import RightButton from './components/RightButton'
import Title from './components/Title'

const imgList = [
  '/test1.png',
  '/test2.png',
  '/test3.png',
];

function App() {
  const [index, setIndex] = useState(0);

  const hPrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : imgList.length - 1));
  };

  const hNext = () => {
    setIndex((prev) => (prev < imgList.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const hKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        hPrev();
      } else if (e.key === 'ArrowRight') {
        hNext();
      }
    };

    window.addEventListener('keydown', hKeyDown);
    return () => {
      window.removeEventListener('keydown', hKeyDown);
    };
  }, []);

  return (
    <>
      <Title />
      <IllustDisplay src={imgList[index]} />
      <LeftButton onClick={hPrev} />
      <RightButton onClick={hNext} />
      <PlusButton />
      <MinusButton />
    </>
  )
}

export default App
