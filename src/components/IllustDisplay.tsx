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
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0);
            {console.log(scale)}
        };
    }, [src, scale]);
    return (
        <canvas ref={canvasRef} width={500} height={500}></canvas>
    );
}

export default IllustDisplay