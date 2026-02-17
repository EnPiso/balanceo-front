import { useEffect, useState } from "react";
import { Player } from "@remotion/player";
import { Slider } from "@nextui-org/react";
import { OffthreadVideo } from "remotion";

const VideoEditorUpdate = ({ videoBlob, videoDuration }) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(videoDuration);

  useEffect(() => {
    console.log(videoDuration);
  }, [videoDuration]);

  const handleTrimChange = (newValue) => {
    const [newStart, newEnd] = newValue;
    if (newStart < newEnd) {
      setStart(newStart);
      setEnd(newEnd);
    }
  };

  const durationInFrames = end - start;

  return (
    <div className="flex flex-col items-center p-4">
      {durationInFrames > 0 ? (
        <Player
          component={() => (
            <OffthreadVideo src={videoBlob} startFrom={start} endAt={end} />
          )}
          durationInFrames={durationInFrames}
          compositionWidth={320}
          compositionHeight={180}
          fps={30}
          controls
          loop
          style={{ width: "100%", maxWidth: "320px", borderRadius: "8px" }}
        />
      ) : (
        <p>Selecciona un rango válido para reproducir el video.</p>
      )}
      <div className="w-full mt-4">
        <Slider
          value={[start, end]}
          onChange={handleTrimChange}
          step={1}
          minValue={0}
          maxValue={videoDuration}
          className="w-full"
        />
      </div>
      <button className="mt-4">Guardar Recorte</button>
    </div>
  );
};

export default VideoEditorUpdate;
