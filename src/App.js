import { useState, useEffect, useRef } from "react";
import "./App.css";

const localDataLength = parseInt(localStorage.getItem("dataLength")) || 21;
const localSec = parseInt(localStorage.getItem("sec")) || 5;
const localColor = localStorage.getItem("color") || "#000000";
const localBg = localStorage.getItem("bg") || "#ffffff";

const ran = () => ~~(Math.random() * 10) - 5;

const data = new Array(localDataLength).fill(0).map((_, i) => ({
  x: (i + 1) * 5,
  y: (i % 2 === 0 ? 10 + i * 4 : 5 + i * 4) + ran(),
}));

const d = data.map(({ x, y }) => `L ${x} ${y}`);

const App = () => {
  const [show, setShow] = useState(false);
  const [length, setLength] = useState(1000);
  const [dataLength, setDataLength] = useState(localDataLength);
  const [sec, setSec] = useState(localSec);
  const [color, setColor] = useState(localColor);
  const [bg, setBg] = useState(localBg);
  const ref = useRef(null);

  useEffect(() => {
    setLength(ref.current.getTotalLength());
  }, []);

  useEffect(() => {
    localStorage.setItem("dataLength", dataLength);
    localStorage.setItem("sec", sec);
    localStorage.setItem("color", color);
    localStorage.setItem("bg", bg);
  }, [dataLength, sec, color, bg]);

  const toggleShow = (e) => {
    if (e.key === "Enter") {
      setShow(!show);
    }
  };
  return (
    <div className="App" onKeyDown={toggleShow} tabIndex="0">
      <svg
        width="90%"
        height="700"
        viewBox="0 1 100 100"
        style={{ backgroundColor: bg }}
      >
        <path
          ref={ref}
          className="path"
          style={{
            strokeDasharray: length,
            strokeDashoffset: length,
            animation: `dash ${sec}s linear forwards`,
            animationDelay: "1s",
          }}
          fill="none"
          strokeWidth="1"
          stroke={color}
          d={`M 0 0 ${d}`}
        />
      </svg>
      {show && (
        <div className="config">
          <div>
            Duration:
            <input
              type="number"
              value={sec}
              onChange={(e) => setSec(e.target.value)}
            />
          </div>
          <div>
            Data points:
            <input
              type="number"
              value={dataLength}
              onChange={(e) => setDataLength(e.target.value)}
            />
          </div>
          <div>
            Color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div>
            Background color:
            <input
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
