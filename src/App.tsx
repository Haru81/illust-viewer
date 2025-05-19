import { useEffect, useState } from 'react'
import IllustDisplay from './components/IllustDisplay'
import LeftButton from './components/LeftButton'
import MinusButton from './components/MinusButton'
import PlusButton from './components/PlusButton'
import RightButton from './components/RightButton'
import Title from './components/Title'
import './App.css'

const imgList = [
  '/test4.png',
  '/test5.png',
  '/test6.png',
];

function App() {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const hPrev = () => {
    setIndex(prev => (prev > 0 ? prev - 1 : imgList.length - 1));
  };

  const hNext = () => {
    setIndex(prev => (prev < imgList.length - 1 ? prev + 1 : 0));
  };

  const hZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 3));
  };

  const hZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.1));
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
    return () => window.removeEventListener('keydown', hKeyDown);
  }, []);

  return (
    <>
      <Title />
      <IllustDisplay
        src={imgList[index]}
        scale={scale}
        setScale={setScale}
        offset={offset}
        setOffset={setOffset}
      />
      <LeftButton onClick={hPrev} />
      <RightButton onClick={hNext} />
      <PlusButton onClick={hZoomIn} />
      <MinusButton onClick={hZoomOut} />
    </>
  )
}

export default App
