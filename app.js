
const deviceHasPointer = window.matchMedia('(pointer: fine)').matches;
const container = document.querySelector('.magnifying-glass');
const magnifier = document.querySelector('.magnifying-glass__magnifier');
const enlargedImage = document.querySelector('.magnifying-glass__enlarged-image');
const speed = 0.2;

let containerRect = {};
let mouse = { x: 0, y: 0 };
let glass = { x: 0, y: 0 };
let enlargedImagePos = { x: 0, y: 0 };
let aboveImage = false;
let runMovement = false;
    
function init () {
  if (deviceHasPointer) {
    containerRect = container.getBoundingClientRect();

    window.addEventListener('mousemove', this.getMousePos);
    container.addEventListener('mouseenter', this.showGlass);
    container.addEventListener('mouseleave', this.hideGlass);
    moveGlass();
  }
}

function getMousePos (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function moveGlass () {
  // Calculate smooth mouse movement
  glass.x = lerp(glass.x, mouse.x, speed);
  glass.y = lerp(glass.y, mouse.y, speed);
  
  // Calculate enlarged image position
  enlargedImagePos.x = (glass.x - containerRect.left) / containerRect.width * -100;
  enlargedImagePos.y = (glass.y - containerRect.top) / containerRect.height * -100;
   
  // Set style positions
  magnifier.style.transform = `translate(calc(${glass.x}px - 50%), calc(${glass.y}px  - 50%))`;
  enlargedImage.style.transform = `translate(${enlargedImagePos.x}%, ${enlargedImagePos.y}%)`;

  if (runMovement)
    requestAnimationFrame(moveGlass);
}


function showGlass () {
  containerRect = container.getBoundingClientRect();
  aboveImage = true;
  runMovement = true;
  magnifier.style.opacity = '1';
  moveGlass();
}

function hideGlass () {
  aboveImage = false;
  magnifier.style.opacity = '0';
  setTimeout(() => { runMovement = false; }, 250);
}

function lerp (a, b, n) {
  return (1 - n) * a + n * b;
}

init();
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

