const lockScreen = document.getElementById("lockScreen");
const loginScreen = document.getElementById("loginScreen");
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");
const error = document.getElementById("error");
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const successSound = document.getElementById("successSound");
const greenFlash = document.getElementById("greenFlash");
const fadeWhite = document.getElementById("fadeWhite");

/* CLOCK */
function updateClock(){
  const now = new Date();
  timeElement.textContent = now.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  dateElement.textContent = now.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
}
setInterval(updateClock,1000);
updateClock();

/* DUST PARTICLES */
const dustCanvas = document.getElementById('dustCanvas');
const ctx = dustCanvas.getContext('2d');
let dustParticles = [];
const NUM_PARTICLES = 60;
function resizeCanvas(){dustCanvas.width=window.innerWidth; dustCanvas.height=window.innerHeight;}
window.addEventListener('resize',resizeCanvas);
resizeCanvas();
function initDust(){
  dustParticles=[];
  for(let i=0;i<NUM_PARTICLES;i++){
    dustParticles.push({x:Math.random()*dustCanvas.width,y:Math.random()*dustCanvas.height,radius:Math.random()*2+1,speed:Math.random()*0.2+0.05,alpha:Math.random()*0.5+0.2});
  }
}
function drawDust(){
  ctx.clearRect(0,0,dustCanvas.width,dustCanvas.height);
  dustParticles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${p.alpha})`;
    ctx.fill();
    p.y -= p.speed;
    if(p.y<0)p.y=dustCanvas.height;
  });
  requestAnimationFrame(drawDust);
}
initDust();
drawDust();

/* SHOW LOGIN */
lockScreen.addEventListener("click",()=>{
  lockScreen.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  passwordInput.focus();
});

/* Keep focus on password */
document.addEventListener("click",()=>{
  if(!loginScreen.classList.contains("hidden")){
    setTimeout(()=>passwordInput.focus(),10);
  }
});

/* LOGIN */
loginButton.addEventListener("click",login);
passwordInput.addEventListener("keypress",(e)=>{if(e.key==="Enter") login();});

function login(){
  if(passwordInput.value==="21344"){
    successSound.currentTime=0; successSound.play();
    error.textContent="Logging in...";
    passwordInput.disabled=true; loginButton.disabled=true;

    // Flash green
    greenFlash.style.opacity="0.8";
    setTimeout(()=>{greenFlash.style.transition="opacity .6s ease"; greenFlash.style.opacity="0";},120);

    // Fade to white
    setTimeout(()=>{fadeWhite.classList.add("active");},500);

    // Redirect to desktop.html
    setTimeout(()=>{window.location.href="desktop.html";},1200);

  } else {
    error.textContent="Incorrect password";
    passwordInput.classList.add("shake");
    setTimeout(()=>passwordInput.classList.remove("shake"),400);
  }
}

/* CURSOR TRAIL */
const trailCanvas=document.getElementById('cursorTrail');
const tCtx=trailCanvas.getContext('2d');
trailCanvas.width=window.innerWidth; trailCanvas.height=window.innerHeight;
let trail=[];
document.addEventListener('mousemove',e=>{trail.push({x:e.clientX,y:e.clientY,radius:Math.random()*4+2,alpha:1});});
function drawTrail(){
  tCtx.clearRect(0,0,trailCanvas.width,trailCanvas.height);
  for(let i=trail.length-1;i>=0;i--){
    const p=trail[i];
    tCtx.beginPath();
    tCtx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    tCtx.fillStyle=`rgba(0,200,255,${p.alpha})`;
    tCtx.shadowColor="rgba(0,200,255,1)";
    tCtx.shadowBlur=12;
    tCtx.fill();
    p.alpha-=0.03;
    if(p.alpha<=0) trail.splice(i,1);
  }
  requestAnimationFrame(drawTrail);
}
drawTrail();