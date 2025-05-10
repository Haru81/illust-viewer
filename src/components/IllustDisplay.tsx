import { useEffect, useRef } from "react";

interface Props {
    src: string;
    scale: number;
}

const IllustDisplay = ({ src, scale }: Props) => {
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
            
            const centerX = canvasWidth / 2;
            const centerY = canvasHeight / 2;

            ctx.translate(centerX, centerY);
            ctx.scale(scale, scale);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            {console.log(scale)}
        };
    }, [src, scale]);
    return (
        <canvas ref={canvasRef} width={500} height={500}></canvas>
    );
}

export default IllustDisplay