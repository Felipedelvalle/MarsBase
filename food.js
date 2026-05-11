// PARALLAX HERO

window.addEventListener("scroll", () => {

const scroll = window.scrollY
const heroImg = document.querySelector(".hero-img")

heroImg.style.transform = `translateY(${scroll * 0.3}px)`

})



// SCROLL REVEAL

const sections = document.querySelectorAll(".section")

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.style.opacity = 1
entry.target.style.transform = "translateY(0)"
}

})

},{threshold:.2})


sections.forEach(section => {

section.style.opacity = 0
section.style.transform = "translateY(50px)"
section.style.transition = "all 1s ease"

observer.observe(section)

})



// CREDIT COUNTER

let credits = document.getElementById("credits")

let value = 0
let target = 248

let interval = setInterval(()=>{

value+=4
credits.textContent=value

if(value>=target){
clearInterval(interval)
}

},20)



// SCROLL TO MENU

document.getElementById("menuBtn").addEventListener("click",()=>{

document.getElementById("weekly").scrollIntoView({
behavior:"smooth"
})

})



// UI SOUNDS

const hoverSound = document.getElementById("hoverSound")
const clickSound = document.getElementById("clickSound")

const interactiveElements = document.querySelectorAll(
"button, a, .food-card"
)

interactiveElements.forEach(el => {

el.addEventListener("mouseenter", () => {

hoverSound.currentTime = 0
hoverSound.play()

})

el.addEventListener("click", () => {

clickSound.currentTime = 0
clickSound.play()

})

})

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