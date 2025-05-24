import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

interface Props {
    src: string;
    scale: number;
    setScale: (s: number) => void;
    offset: { x: number; y: number };
    setOffset: (o: { x: number; y: number }) => void;
}

const IllustDisplay = forwardRef<HTMLCanvasElement, Props>(({ src, scale, setScale, offset, setOffset }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useImperativeHandle(ref, () => canvasRef.current!);

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
            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height;
            const initScale = Math.min(scaleX, scaleY, 1);
            setScale(initScale);

            setOffset({
                x: canvas.width / 2,
                y: canvas.height / 2
            });

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.scale(initScale, initScale);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
        };
    }, [src, setScale, setOffset]);

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
            
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            const newScale = Math.min(Math.max(scale + delta, 0.1), 3);

            let pivotX = mouseX;
            let pivotY = mouseY;
            
            if (newScale < 0.3) {
                pivotX = canvas.width / 2;
                pivotY = canvas.height / 2;
            }

            const worldX = (pivotX - offset.x) / scale;
            const worldY = (pivotY - offset.y) / scale;

            const newOffsetX = pivotX - worldX * newScale;
            const newOffsetY = pivotY - worldY * newScale;

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
        <div id="illust-container" style={{ width: 600, height: 600, position: "relative" }}>
            <canvas
                ref={canvasRef}
                width={600}
                height={600}
                onMouseDown={hMouseDown}
                onMouseMove={hMouseMove}
                onMouseUp={hMouseUp}
                onMouseLeave={hMouseUp}
                style={{ display: "block" }}
            ></canvas>
        </div>
    );
});

export default IllustDisplay