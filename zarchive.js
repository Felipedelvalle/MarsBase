const lockScreen = document.getElementById("lockScreen");
const loginScreen = document.getElementById("loginScreen");
const desktop = document.getElementById("desktop");
const passwordInput = document.getElementById("passwordInput");
const loginButton = document.getElementById("loginButton");
const error = document.getElementById("error");
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const hoverSound = document.getElementById("hoverSound");
const clickSound = document.getElementById("clickSound");
const typingSound = document.getElementById("typingSound");
const successSound = document.getElementById("successSound");
const icons = document.querySelectorAll(".icon");
let inactivityTimer;

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
function resizeCanvas(){ const rect = lockScreen.getBoundingClientRect(); dustCanvas.width=rect.width; dustCanvas.height=rect.height; }
window.addEventListener('resize', resizeCanvas);
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
    if(p.y<0) p.y=dustCanvas.height;
  });
  requestAnimationFrame(drawDust);
}
initDust();
drawDust();

/* SCREENSAVER CLICK TO SHOW LOGIN */
lockScreen.addEventListener("click", () => {
  lockScreen.classList.add("hidden");        // Hide screensaver
  loginScreen.classList.remove("hidden");    // Show login box
  loginScreen.classList.add("fade-in");
  setTimeout(()=>{ loginScreen.classList.remove("fade-in"); }, 500);
});

/* LOGIN */
loginButton.addEventListener("click",login);
passwordInput.addEventListener("keypress",(e)=>{if(e.key==="Enter") login()});
passwordInput.addEventListener("input",(e)=>{
  if(e.inputType==="insertText"){
    typingSound.currentTime=0;
    typingSound.play();
  }
});
function login(){
  if(passwordInput.value==="21344"){
    successSound.currentTime = 0;
    successSound.play();
    error.textContent="Logging in...";
    passwordInput.disabled=true;
    loginButton.disabled=true;
    const overlay = document.getElementById("loginGlowOverlay");
    overlay.classList.add("active");
    setTimeout(()=>{
      loginScreen.classList.add("hidden");
      overlay.classList.remove("active");
      desktop.classList.remove("hidden");
      showIcons();
      startInactivityTimer();
    },1200);
  } else {
    error.textContent="Incorrect password";
    passwordInput.classList.add("shake");
    setTimeout(()=>{passwordInput.classList.remove("shake")},400);
  }
}

/* ICONS */
function showIcons(){ icons.forEach((icon,i)=>{ setTimeout(()=>{icon.classList.add("show")},i*200); }); }
icons.forEach(icon=>{
  icon.addEventListener("mouseenter",()=>{ hoverSound.currentTime=0; hoverSound.play(); });
  icon.addEventListener("click",(e)=>{
    e.preventDefault();
    clickSound.currentTime=0;
    clickSound.play();
    desktop.classList.add("fade-out");
    setTimeout(()=>{ window.location.href=icon.dataset.link; },800);
  });
});

/* INACTIVITY RESET */
function startInactivityTimer(){
  clearTimeout(inactivityTimer);
  const reset = ()=>{
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(resetSystem,60000);
  };
  document.removeEventListener("mousemove",reset);
  document.removeEventListener("click",reset);
  document.removeEventListener("keypress",reset);
  document.addEventListener("mousemove",reset);
  document.addEventListener("click",reset);
  document.addEventListener("keypress",reset);
  inactivityTimer = setTimeout(resetSystem,60000);
}
function resetSystem(){
  // Hide desktop
  desktop.classList.add("hidden");
  desktop.classList.remove("fade-out");
  icons.forEach(icon=>icon.classList.remove("show"));

  // Hide login box
  loginScreen.classList.add("hidden");
  passwordInput.disabled=false;
  loginButton.disabled=false;
  passwordInput.value="";
  error.textContent="";

  // Show screensaver
  lockScreen.classList.remove("hidden");
  lockScreen.style.opacity = "1";
  lockScreen.style.transform = "scale(1)";
  lockScreen.style.filter = "none";

  // Redraw dust
  ctx.clearRect(0,0,dustCanvas.width,dustCanvas.height);
  initDust();
  drawDust();

  // Restart inactivity timer
  startInactivityTimer();
}

/* CURSOR TRAIL + HOVER GLOW */
const trailCanvas=document.getElementById('cursorTrail');
const tCtx=trailCanvas.getContext('2d');
let trailParticles=[];
let isHovering=false;
function resizeTrailCanvas(){trailCanvas.width=window.innerWidth; trailCanvas.height=window.innerHeight;}
window.addEventListener('resize', resizeTrailCanvas)
resizeTrailCanvas()
document.addEventListener('mousemove',(e)=>{trailParticles.push({x:e.clientX,y:e.clientY,radius:Math.random()*4+2,alpha:1})})
const interactiveElements=[...document.querySelectorAll('button,input,.icon')];
interactiveElements.forEach(el=>{
  el.addEventListener('mouseenter',()=>{isHovering=true;})
  el.addEventListener('mouseleave',()=>{isHovering=false;})
})
function drawTrail(){
  tCtx.clearRect(0,0,trailCanvas.width,trailCanvas.height)
  for(let i=trailParticles.length-1;i>=0;i--){
    const p=trailParticles[i]
    tCtx.beginPath()
    tCtx.arc(p.x,p.y,isHovering?p.radius*1.5:p.radius,0,Math.PI*2)
    tCtx.fillStyle=isHovering?`rgba(0,255,255,${p.alpha})`:`rgba(100,180,255,${p.alpha})`
    tCtx.shadowColor=isHovering?'rgba(0,255,255,0.9)':'rgba(100,200,255,0.8)'
    tCtx.shadowBlur=isHovering?24:12
    tCtx.fill()
    p.alpha-=0.03
    if(p.alpha<=0) trailParticles.splice(i,1)
  }
  requestAnimationFrame(drawTrail)
}
drawTrail();

/* STARS ON DESKTOP */
const starsCanvas=document.getElementById('starsCanvas');
const sCtx=starsCanvas.getContext('2d');
let stars=[];
function resizeStarsCanvas(){starsCanvas.width=desktop.offsetWidth; starsCanvas.height=desktop.offsetHeight;}
window.addEventListener('resize', resizeStarsCanvas);
resizeStarsCanvas();
function initStars(){
  stars=[];
  for(let i=0;i<100;i++){
    stars.push({x:Math.random()*starsCanvas.width,y:Math.random()*starsCanvas.height,radius:Math.random()*1.5+0.5,alpha:Math.random(),delta:Math.random()*0.02+0.005});
  }
}
function drawStars(){
  sCtx.clearRect(0,0,starsCanvas.width,starsCanvas.height);
  stars.forEach(star=>{
    sCtx.beginPath();
    sCtx.arc(star.x,star.y,star.radius,0,Math.PI*2);
    sCtx.fillStyle=`rgba(255,255,255,${star.alpha})`;
    sCtx.fill();
    star.alpha+=star.delta;
    if(star.alpha>1||star.alpha<0) star.delta*=-1;
  });
  requestAnimationFrame(drawStars);
}
initStars();
drawStars();

icons.forEach(icon=>{
  icon.addEventListener("click",(e)=>{
    e.preventDefault();
    clickSound.currentTime=0;
    clickSound.play();

    // Show fade-to-white overlay
    const fade = document.getElementById('fadeWhite');
    fade.classList.remove('hidden');
    fade.classList.add('active');

    // Wait for the transition to finish, then redirect
    setTimeout(()=>{
      window.location.href = icon.dataset.link;
    },800); // match CSS transition
  });
});

// PAGE LOAD FADE FROM WHITE

window.addEventListener("load", () => {

const transition = document.getElementById("page-transition")

setTimeout(()=>{

transition.style.opacity = "0"

setTimeout(()=>{
transition.style.display = "none"
},1000)

},100)

})