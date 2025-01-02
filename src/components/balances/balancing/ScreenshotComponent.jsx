import { toPng } from "html-to-image";
import {useRef} from "react";

const ScreenshotComponent = () => {
    const ref = useRef(null);

    const handleScreenshot = async () => {
        if (ref.current) {
            const dataUrl = await toPng(ref.current); // Captura el contenido como PNG
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "screenshot.png";
            link.click(); // Descarga la imagen
        }
    };

    return (
        <div>
            <div
                ref={ref}
                style={{
                    padding: "10px",
                    border: "1px solid black",
                    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                }}
            >
                <h1>¡Esto es lo que se capturará!</h1>
                <p>Captura este contenido como una imagen.</p>
            </div>
            <button onClick={handleScreenshot}>Tomar Captura</button>
        </div>
    );
};

export default ScreenshotComponent;