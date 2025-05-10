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
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

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
    return () => {
      window.removeEventListener('keydown', hKeyDown);
    };
  }, []);

  useEffect(() => {
    const hWheel = (e: WheelEvent) => {
      e.preventDefault();

      const container = document.getElementById('illust-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const percentX = (offsetX / rect.width) * 100;
        const percentY = (offsetY / rect.height) * 100;
        setOrigin({ x: percentX, y: percentY });
      }

      setScale(prev => {
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newScale = Math.min(Math.max(prev + delta, 0.1), 3);
        return newScale;
      });
    };

    window.addEventListener('wheel', hWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', hWheel);
    };
  }, []);

  return (
    <>
      <Title />
      <IllustDisplay src={imgList[index]} scale={scale} origin={origin} />
      <LeftButton onClick={hPrev} />
      <RightButton onClick={hNext} />
      <PlusButton onClick={hZoomIn} />
      <MinusButton onClick={hZoomOut} />
    </>
  )
}

export default App
