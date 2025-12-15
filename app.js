const year = new Date().getFullYear();
document.getElementById("year").textContent = year;
document.getElementById("yearFooter").textContent = year;

// Parallax MUY suave, encima del drift (se siente premium)
const glows = [
  document.querySelector(".g1"),
  document.querySelector(".g2"),
  document.querySelector(".g3")
];

let tx = 0, ty = 0, cx = 0, cy = 0;
function lerp(a,b,t){ return a + (b-a)*t; }

window.addEventListener("pointermove", (e) => {
  tx = (e.clientX / window.innerWidth) * 2 - 1;
  ty = (e.clientY / window.innerHeight) * 2 - 1;
}, { passive: true });

let start = performance.now();

function animate(now){
  const t = (now - start) / 1000;

  cx = lerp(cx, tx, 0.04);
  cy = lerp(cy, ty, 0.04);

  // movimiento continuo (dinámico) + respuesta al mouse (sutil)
  const s1x = Math.sin(t * 0.35) * 18;
  const s1y = Math.cos(t * 0.30) * 14;

  const s2x = Math.cos(t * 0.28) * 16;
  const s2y = Math.sin(t * 0.33) * 18;

  const s3x = Math.sin(t * 0.22) * 14;
  const s3y = Math.cos(t * 0.26) * 16;

  if (glows[0]) glows[0].style.transform = `translate3d(${s1x + cx*14}px, ${s1y + cy*10}px, 0)`;
  if (glows[1]) glows[1].style.transform = `translate3d(${s2x - cx*12}px, ${s2y - cy*14}px, 0)`;
  if (glows[2]) glows[2].style.transform = `translate3d(${s3x + cx*8}px,  ${s3y - cy*8}px, 0)`;

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Rotación limpia de tipografías editoriales
const ticker = document.getElementById("tickerText");

const fonts = [
  "'IBM Plex Mono', monospace",
  "'Newsreader', serif",
  "'Recursive', sans-serif"
];

let fontIndex = 0;

// transición suave
ticker.style.transition = "font-family 0.6s ease";

setInterval(() => {
  fontIndex = (fontIndex + 1) % fonts.length;
  ticker.style.fontFamily = fonts[fontIndex];
}, 5000);

// easter egg ;)
const eeg = document.getElementById("eeggBtn");
if (eeg) {
  eeg.addEventListener("click", () => {
    // abre una página oculta
    window.location.href = "easter.html";
  });
}
