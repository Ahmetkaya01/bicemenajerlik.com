import { execFileSync } from "node:child_process";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const imageDir = path.join(root, "public/images/google-ads");
const ffmpeg = ffmpegInstaller.path;

const fadeDuration = 0.8;
const fps = 30;
const padColor = "0x0a0a0f";

function createVideo({ output, width, height, slides }) {
  const inputs = slides.flatMap((slide) => [
    "-loop",
    "1",
    "-t",
    String(slide.duration),
    "-i",
    path.join(imageDir, slide.file),
  ]);

  const scaleFilters = slides
    .map(
      (_, index) =>
        `[${index}:v]scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=${padColor},setsar=1,fps=${fps},format=yuv420p,trim=duration=${slides[index].duration},setpts=PTS-STARTPTS[v${index}]`,
    )
    .join(";");

  let filterComplex = scaleFilters;
  let previous = "v0";

  for (let index = 1; index < slides.length; index += 1) {
    const offset =
      slides.slice(0, index).reduce((total, slide) => total + slide.duration, 0) -
      fadeDuration * index;
    const current = index === slides.length - 1 ? "out" : `vx${index}`;
    filterComplex += `;[${previous}][v${index}]xfade=transition=fade:duration=${fadeDuration}:offset=${offset}[${current}]`;
    previous = current;
  }

  execFileSync(
    ffmpeg,
    [
      "-y",
      ...inputs,
      "-filter_complex",
      filterComplex,
      "-map",
      "[out]",
      "-c:v",
      "libx264",
      "-profile:v",
      "high",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-an",
      output,
    ],
    { stdio: "inherit" },
  );

  console.log(`Video created: ${output}`);
}

const landscapeSlides = [
  { file: "landscape-kons-ilanlari.jpg", duration: 5 },
  { file: "landscape-gunluk-odeme.jpg", duration: 5 },
  { file: "landscape-58-il.jpg", duration: 5 },
  { file: "square-hemen-basvur.jpg", duration: 5 },
];

const squareSlides = [
  { file: "square-hemen-basvur.jpg", duration: 5 },
  { file: "square-guven.jpg", duration: 5 },
  { file: "portrait-whatsapp-basvur.jpg", duration: 5 },
  { file: "landscape-kons-ilanlari.jpg", duration: 5 },
];

createVideo({
  output: path.join(imageDir, "bice-menajerlik-reklam.mp4"),
  width: 1920,
  height: 1080,
  slides: landscapeSlides,
});

createVideo({
  output: path.join(imageDir, "bice-menajerlik-reklam-kare.mp4"),
  width: 1080,
  height: 1080,
  slides: squareSlides,
});
