document.addEventListener("DOMContentLoaded", () => {

    const hoverSound = document.getElementById("hoverSound");
    const clickSound = document.getElementById("clickSound");
    const interactive = document.querySelectorAll("a, .file-card");

    interactive.forEach(el=>{
        el.addEventListener("mouseenter",()=>{ hoverSound.currentTime=0; hoverSound.play(); })
        el.addEventListener("click",()=>{ clickSound.currentTime=0; clickSound.play(); })
    });

    // PAGE TRANSITION
    const transition = document.getElementById("page-transition");
    setTimeout(()=>{
        transition.style.opacity = "0";
        setTimeout(()=>{ transition.style.display="none"; },1000);
    },100);

    // PARTICLES
    const canvas = document.getElementById("mars-dust");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for(let i=0;i<120;i++){
        particles.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*1.5+0.5, speed:Math.random()*0.3+0.1});
    }

    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p=>{
            p.y -= p.speed;
            if(p.y<0)p.y=canvas.height;
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fillStyle="rgba(255,180,120,0.3)";
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }

    animate();
    window.addEventListener("resize", ()=>{
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Sequential fade-in for cards
    document.querySelectorAll('.file-card').forEach((card,i)=>{
        card.style.opacity = 0;
        setTimeout(()=>{
            card.style.transition = 'opacity 0.8s ease, transform 0.3s';
            card.style.opacity = 1;
        }, 300 * i);
    });

    // MODAL
const modal = document.getElementById("file-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementById("modal-close");

document.querySelectorAll('.file-card').forEach(card => {
  card.addEventListener("click", (e) => {
    e.preventDefault();

    const imgSrc = card.getAttribute("data-image");
    if (imgSrc) {
      modalImg.src = imgSrc;
      modal.classList.add("open");
    }
  });
});

closeBtn.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
  modal.classList.remove("open");
  setTimeout(() => { modalImg.src = ""; }, 600);
});

});
