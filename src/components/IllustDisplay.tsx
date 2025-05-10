import { useEffect, useRef } from "react";

interface Props {
    src: string;
}

const IllustDisplay = ({ src }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = src;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    }, [src]);
    return (
        <canvas ref={canvasRef} width={500} height={500}></canvas>
    );
}

export default IllustDisplay