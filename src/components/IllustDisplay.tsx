import { useEffect, useRef, useState } from "react";

interface Props {
    src: string;
    scale: number;
    setScale: (s: number) => void;
    offset: { x: number; y: number };
    setOffset: (o: { x: number; y: number }) => void;
}

const IllustDisplay = ({ src, scale, setScale, offset, setOffset }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dragging, setDragging] = useState(false);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = src;
        img.onload = () => {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.translate(offset.x, offset.y);
            ctx.scale(scale, scale);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
        };
    }, [src, scale, offset]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const hWheel = (e: WheelEvent) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const worldX = (mouseX - offset.x) / scale;
            const worldY = (mouseY - offset.y) / scale;

            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            const newScale = Math.min(Math.max(scale + delta, 0.1), 3);

            const newOffsetX = mouseX - worldX * newScale;
            const newOffsetY = mouseY - worldY * newScale;

            setScale(newScale);
            setOffset({ x: newOffsetX, y: newOffsetY });
        };

        canvas.addEventListener('wheel', hWheel, { passive: false });
        return () => canvas.removeEventListener('wheel', hWheel);
    }, [scale, offset, setScale, setOffset]);

    const hMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        setLastPos({ x: e.clientX, y: e.clientY });
    };

    const hMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;
        const dx = e.clientX - lastPos.x;
        const dy = e.clientY - lastPos.y;
        setOffset({ x: offset.x + dx, y: offset.y +dy });
        setLastPos({ x: e.clientX, y: e.clientY });
    };

    const hMouseUp = () => {
        setDragging(false);
    };

    return (
        <div id="illust-container" style={{ width: 500, height: 500 }}>
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                onMouseDown={hMouseDown}
                onMouseMove={hMouseMove}
                onMouseUp={hMouseUp}
                onMouseLeave={hMouseUp}
            ></canvas>
        </div>
    );
}

export default IllustDisplay