import { useEffect, useRef } from "react";

interface Props {
    src: string;
    scale: number;
    origin: { x: number, y: number };
}

const IllustDisplay = ({ src, scale, origin }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = src;
        img.onload = () => {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            
            const percentX = origin.x / 100;
            const percentY = origin.y / 100;
            const centerX = canvasWidth * percentX;
            const centerY = canvasHeight * percentY;

            ctx.translate(centerX, centerY);
            ctx.scale(scale, scale);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            {console.log(`scale: ${scale}, origin: (${origin.x}, ${origin.y})`)}
        };
    }, [src, scale, origin]);
    return (
        <div id="illust-container" style={{ width: 500, height: 500 }}>
            <canvas ref={canvasRef} width={500} height={500}></canvas>
        </div>
    );
}

export default IllustDisplay