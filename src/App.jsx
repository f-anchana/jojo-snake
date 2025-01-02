import Board from "./components/Board/Board";
import Toggle from "./components/Toggle/Toggle";
import {useDropzone} from 'react-dropzone';
import useStore from "./utils/store";



function App() {
  const { skin, setSkin } = useStore();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg": [],
      "image/webp": [],
      "image/gif": [],
    },
    maxFiles: 1,
    noClick: true,
    onDrop: (file) => onDrop(file),
  });

  const onDrop = (file) => {
    const src = URL.createObjectURL(file[0]);
    setSkin(src);
  };

  return (
    <div>
        <audio src="/audio/wryyyy.mp3" id="die-audio" className="die-audio"></audio>

      <video
        src="/audio/ZAWARUDO.mp4"
        id="nether-video"
        className="nether-video"
        autoPlay
      ></video>

      <video
        src="/audio/Arrivederci.mp4"
        id="ariari"
        className="ariari"
        autoPlay
      ></video>

      <video
        src="/audio/7pagemuda.mp4"
        id="muda"
        className="muda"
        autoPlay
      ></video>

      <video
        src="/audio/ohmygood.mp4"
        id="omg"
        className="omg"
        autoPlay
        muted
      ></video>

      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {skin && <img src={skin} alt="" />}
      </div>

      <div className="flashbang"></div>
      <Board />
      <div className="toggle-wrapper">
        <Toggle mode={"corner"} />
        <Toggle mode={"impossible"} />
        <Toggle mode={"reversed"} />
      </div>
    </div>
  );
}

export default App;
