// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise(resolve => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }}
  
  const phrases = [
  'Linux Enthusiast',
  'Server Admin',
  'Web Developer',
  'Designer',
  'Programmer'];
  
  
  const el = document.querySelector('.hero-desc');
  const fx = new TextScramble(el);
  
  let counter = 0;
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 800);
    });
    counter = (counter + 1) % phrases.length;
  };
  
  next();



  const header = document.querySelector(".header")
  const head = document.querySelector("#logo")
const pod = document.querySelector(".pod")
const scrollChange = 1
const globe = 350
const add_class_on_scroll = () => header.classList.add("scrolled")
const add_class_on_scrol = () => head.classList.add("scrolled")
const remove_class_on_scrol = () => head.classList.remove("scrolled")
const remove_class_on_scroll = () => header.classList.remove("scrolled")

window.addEventListener('scroll', function() { 
  scrollpos = window.scrollY;

  if (scrollpos >= scrollChange) { add_class_on_scroll(), add_class_on_scrol() }
  else { remove_class_on_scroll(), remove_class_on_scrol() }
})

$(function() {
  var text = $(".text");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      text.removeClass("hidden");
    } else {
      text.addClass("hidden");
    }
  });
});



const commands = String.raw`samurai@internal-cdprojektred.com/:~ cd HAX
samurai@internal-cdprojektred.com/HAX/:~ ls`;

const beep = String.raw`


          _____                    _____                    _____                    _____          
         /\    \                  /\    \                  /\    \                  /\    \         
        /::\    \                /::\    \                /::\    \                /::\    \        
       /::::\    \              /::::\    \              /::::\    \              /::::\    \       
      /::::::\    \            /::::::\    \            /::::::\    \            /::::::\    \      
     /:::/\:::\    \          /:::/\:::\    \          /:::/\:::\    \          /:::/\:::\    \     
    /:::/__\:::\    \        /:::/__\:::\    \        /:::/__\:::\    \        /:::/__\:::\    \    
   /::::\   \:::\    \      /::::\   \:::\    \      /::::\   \:::\    \      /::::\   \:::\    \   
  /::::::\   \:::\    \    /::::::\   \:::\    \    /::::::\   \:::\    \    /::::::\   \:::\    \  
 /:::/\:::\   \:::\ ___\  /:::/\:::\   \:::\    \  /:::/\:::\   \:::\    \  /:::/\:::\   \:::\____\ 
/:::/__\:::\   \:::|    |/:::/__\:::\   \:::\____\/:::/__\:::\   \:::\____\/:::/  \:::\   \:::|    |
\:::\   \:::\  /:::|____|\:::\   \:::\   \::/    /\:::\   \:::\   \::/    /\::/    \:::\  /:::|____|
 \:::\   \:::\/:::/    /  \:::\   \:::\   \/____/  \:::\   \:::\   \/____/  \/_____/\:::\/:::/    / 
  \:::\   \::::::/    /    \:::\   \:::\    \       \:::\   \:::\    \               \::::::/    /  
   \:::\   \::::/    /      \:::\   \:::\____\       \:::\   \:::\____\               \::::/    /   
    \:::\  /:::/    /        \:::\   \::/    /        \:::\   \::/    /                \::/____/    
     \:::\/:::/    /          \:::\   \/____/          \:::\   \/____/                  ~~          
      \::::::/    /            \:::\    \               \:::\    \                                  
       \::::/    /              \:::\____\               \:::\____\                                 
        \::/____/                \::/    /                \::/    /                                 
         ~~                       \/____/                  \/____/                                  


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #`;

const samurai = String.raw`

             ..    ,,,,,,    ,,,,,,      ,,,,, .,,,,     ,,,,, .,,,,,,,,,,,,,    .,,,,,,    ,,,,,  
 #############/   #######.   #######    ###### /####,    (#### /##############   #######.   #####  
 #####((((((((/   ########   ########  ####### /####,    (#### /####*   /#####  *########   #####  
 #####((((*      #########.  ################# /####,    (#### /####*   ######  #########.  #####  
 ############.   #### (####  ################# /####,    (#### /############## *#### #####  (*,..  
 .############  #####  ####. ################# /####,    (##(( *,.    .,*/((##  ####/ #####  ####( 
   /##########*,####,  (###( (,.    .,*/( ##### #####     ####( (###########   #####  *####  ####( 
            (### ####   (#### ##### .###* ##### ######(/######, (####. #####(  ####/   ##### ####( 
            /###.###,    ####.#####  ###  ####( .#############  (####.  #####.(####    /#### ####(
`;

let blink = document.querySelector('.blink');
const code = document.querySelector('.code');

const RandomNumber = (min, max) => {
	return Math.floor(Math.random() * max) + min
};

const Delay = (time) => {
	return new Promise((resolve) => setTimeout(resolve, time))
};

const ResetTerminal = () => {
	code.innerHTML = '<span class="blink">█</span>';
	blink = document.querySelector('.blink');
};

const RenderString = characters => {
	blink.insertAdjacentHTML('beforeBegin', characters);
};

const TypeString = async characters => {
	for(const character of characters.split('')) {
		await Delay(RandomNumber(20, 70));
		RenderString(character);
	}
}

const DrawLines = async ( characters, min = 50, max = 500 ) => {
	for(const line of characters.split('\n')) {
		await Delay(RandomNumber(min, max));
		RenderString(`${line}\n`);
	}
}

const DrawCommands = async commands => {
	for( const line of commands.split('\n')){
		// Seperate the directory and the command
		const [currentDir, command] = line.split(':~ ');

		// Print the directory, type the command and finish with new line
		RenderString(`${currentDir}:~ `);
		await TypeString(command);
		RenderString('\n');
	}
}


// Start the code
(async()=> {
	await DrawCommands("/:~ ssh anonymous@codeplanet-core -p 22");
	await Delay(1000);
	RenderString("\n    Welcome :) \n \n");
  await Delay(1000);
  await DrawCommands("/:~ systemctl start gdm.service");
})();


// Function to hide the loader and start animation
function hideLoaderAndStartAnimation() {
  // Wait for the loader to disappear
  setTimeout(function() {
    document.querySelector('.body').classList.remove('paused'); // Remove 'paused' class to resume animation
    AOS.init();
  }, 12000); // Simulate loader disappearance after 2 seconds
}

// Call this function when the page is ready or after a certain event
window.onload = hideLoaderAndStartAnimation;



var b = document.getElementsByTagName("body")[0];  

b.addEventListener("mousemove", function(event) {
  parallaxed(event);

});




function parallaxed(e) {
      var amountMovedX = (e.clientX * 0.3 / 8);
      var amountMovedY = (e.clientY * 0.3 / 8);
      var x = document.getElementsByClassName("parallaxed");
      var i;
      for (i = 0; i < x.length; i++) {
        x[i].style.transform='translate(' + amountMovedX + 'px,' + amountMovedY + 'px)'
      }
}


gsap.registerPlugin(ScrollTrigger);


let breakPoint = 800;
let mm = gsap.matchMedia();

mm.add({
  isDesktop: `(min-width: ${breakPoint}px)`, // <- when ANY of these are true, the function below gets invoked
  isMobile: `(max-width: ${breakPoint - 1}px)`
}, (context) => {

let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about",
      scrub: 1,
      end: "150%",
      start: "top center"
    },

    smoothChildTiming: true
  });
  gsap.set(".revolutionising", { x: '-20%' });  // Set initial position for element1
gsap.set(".server", { x: '40%' });  // Set initial position for element2

  
  tl.to(".revolutionising", { 
    x: '50%'
  }).to(".server", { 
    x: '-30%'
  }, 0);

  let t2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      scrub: 1,
      end: "200%",
      start: "top top"
    },
    smoothChildTiming: true
  });

  gsap.set(".bg", { y: '-40%' });  // Set initial position for element1
  t2.to(".bg", { 
    y: '7.5%'
  });

  const t0 = gsap.timeline({
    scrollTrigger: {
    trigger: ".hero",
      scrub: 1,
    end: "100%",
    start: "center"
  },

  smoothChildTiming: true
  });
  
  gsap.set(".ascii-sec", {x: '0', y: '0' });  // Set initial position for element1
  t0.to(".ascii-sec", {
    y: '20%',
    scale: '1.3',
    opacity: '0.5',
  });


  const t00 = gsap.timeline({
    scrollTrigger: {
    trigger: ".about-real",
      scrub: 1,
    end: "10vh",
    start: "top bottom"
  },

  smoothChildTiming: true
  });
  
  gsap.set(".ascii-sec", {x: '0' });  // Set initial position for element1
  t00.to(".ascii-sec", {
    x: '25%',
    scale: '1',
    opacity: '1',
  });
  const t000 = gsap.timeline({
    scrollTrigger: {
    trigger: ".skills-sec",
      scrub: 1,
    end: "5vh",
    start: "top bottom"
  },

  smoothChildTiming: true
  });
  t000.to(".ascii-sec", {
    y: '10%',
    x: '0',
  
  });
// Select the logo
const logo = document.getElementById("logo");

// Define the total scrollable height of the document
const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

// Listen to the scroll event
window.addEventListener("scroll", () => {
    // Calculate the current scroll position as a percentage of total scrollable height
    const scrollPercentage = window.scrollY / totalHeight;

    // Calculate the rotation based on the scroll percentage (rotate 360 degrees over the full scroll)
    const rotation = scrollPercentage * 360;

    // Update the logo's rotation using GSAP
    gsap.to(logo, { rotation: rotation });
});


  
  // optionally return a cleanup function
  return () => console.log("cleanup");
});