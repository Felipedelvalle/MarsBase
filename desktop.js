const icons = document.querySelectorAll(".icon");
const hoverSound = document.getElementById("hoverSound");
const clickSound = document.getElementById("clickSound");

/* ICON HOVER & CLICK */
icons.forEach(icon => {

  icon.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });

  icon.addEventListener("click", () => {

    clickSound.currentTime = 0;
    clickSound.play();

    setTimeout(() => {
      window.location.href = icon.dataset.link;
    }, 200); // delay so sound can play

  });

});
/* STARS */

const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for(let i = 0; i < 120; i++){
  stars.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*1.5,
    a: Math.random(),
    speed: Math.random()*0.02
  });
}

function draw(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  stars.forEach(s=>{

    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);

    ctx.fillStyle=`rgba(255,255,255,${s.a})`;
    ctx.fill();

    /* sparkle animation */
    s.a += s.speed;

    if(s.a >= 1 || s.a <= 0){
      s.speed *= -1;
    }

  });

  requestAnimationFrame(draw);

}

draw();

/* IDLE RESET */
let idleTimer;
function resetTimer(){
  clearTimeout(idleTimer);
  idleTimer = setTimeout(()=>{ window.location.href="index.html"; },30000);
}

["mousemove","click","keypress"].forEach(event=>{
  document.addEventListener(event,resetTimer);
});

resetTimer();

/* CURSOR TRAIL */
const trailCanvas = document.getElementById('cursorTrail');
const tCtx = trailCanvas.getContext('2d');

trailCanvas.width = window.innerWidth;
trailCanvas.height = window.innerHeight;

let trail = [];

document.addEventListener('mousemove', e => {
  trail.push({x: e.clientX, y: e.clientY, radius: Math.random()*4 + 2, alpha: 1});
});

function drawTrail(){
  tCtx.clearRect(0,0,trailCanvas.width,trailCanvas.height);
  for(let i = trail.length - 1; i >= 0; i--){
    const p = trail[i];
    tCtx.beginPath();
    tCtx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
    tCtx.fillStyle = `rgba(46,123,255,${p.alpha})`; // matches #2e7bff
    tCtx.shadowColor = "rgba(46,123,255,1)";
    tCtx.shadowBlur = 12;
    tCtx.fill();
    p.alpha -= 0.03;
    if(p.alpha <= 0) trail.splice(i,1);
  }
  requestAnimationFrame(drawTrail);
}

drawTrail();

/* Resize handling for canvases */
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;
});

/* LOG OUT BUTTON */

const logoutBtn = document.getElementById("logoutButton");

logoutBtn.addEventListener("mouseenter", () => {
  hoverSound.currentTime = 0;
  hoverSound.play();
});

logoutBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();

  setTimeout(() => {
    window.location.href = "index.html";
  }, 200);
});