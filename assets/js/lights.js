import { Pane } from "https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js";

const videos = {
  Synthwave: "https://assets.codepen.io/907471/video.mp4",
  Mouse: "https://assets.codepen.io/907471/mouse.mp4",
  Rainbow: "https://assets.codepen.io/907471/rainbow_s.mp4",
  Dancer: "https://assets.codepen.io/907471/dancer.mp4"
};

(() => {
  const video = document.getElementById("input");
  const canvas = document.getElementById("prerender");
  const output = document.getElementById("output");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const charsFixed = [
    "_",
    ".",
    ",",
    "-",
    "=",
    "+",
    ":",
    ";",
    "c",
    "b",
    "a",
    "!",
    "?",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    ["9", "8"],
    ["✚", "✚", "✚", "✚", "✚", "⚛︎"],
    ["☺︎", "☹︎"],
    "☀︎",
    ["@", "#"],
    ["X", "Y", "Z"],
    "'"
  ];
  let chars = [...charsFixed];
  let charsLength = chars.length;
  const MAX_COLOR_INDEX = 255;

  const updateCanvas = () => {
    const w = canvas.width;
    const h = canvas.height;
    ctx.drawImage(video, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;
    let outputText = "";
    for (let y = 0; y < h; y++) {
      let row = "";
      for (let x = 0; x < w; x++) {
        const index = (x + y * w) * 4;
        const [r, g, b] = data.slice(index, index + 3);
        const c = (r + g + b) / 3;
        const charIndex = Math.floor(
          (charsLength * ((c * 100) / MAX_COLOR_INDEX)) / 100
        );
        const result = chars[charIndex];
        const char = Array.isArray(result)
          ? result[Math.floor(Math.random() * result.length) + 0]
          : result;

        row += `<span style="color: rgb(${r}, ${g}, ${b});">${
          char ?? "&nbsp;"
        }</span>`;
      }
      outputText += `<div>${row}</div>`;
    }
    output.innerHTML = outputText;
    output.style.setProperty(
      "--color",
      `rgb(${data[0]}, ${data[1]}, ${data[2]})`
    );

    setTimeout(() => requestAnimationFrame(updateCanvas), 0);
  };

  requestAnimationFrame(() => {
    video.play();
    updateCanvas();
  });

  const config = {
    speed: 1,
    zoom: 60,
    video: videos.Synthwave,
    isolation: 0,
    brightness: 1,
    play: true
  };

  // https://tweakpane.github.io/docs/quick-tour/
  
  isolation.on("change", ({ value }) => {
    chars = [...new Array(value).fill("&nbsp;"), ...charsFixed];
    charsLength = chars.length;
  });

  const videoSelection = pane.addBinding(config, "video", { options: videos });

  videoSelection.on("change", ({ value }) => {
    video.src = value;
    video.onloadeddata = () => {
      video.play();
    };
  });

  const play = pane.addBinding(config, "play");
  play.on("change", ({ value }) => (value ? video.play() : video.pause()));
})();
