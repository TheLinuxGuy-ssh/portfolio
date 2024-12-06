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
const pod = document.querySelector(".pod")
const scrollChange = 1
const globe = 350
const add_class_on_scroll = () => header.classList.add("scrolled")
const remove_class_on_scroll = () => header.classList.remove("scrolled")

window.addEventListener('scroll', function() { 
  scrollpos = window.scrollY;

  if (scrollpos >= scrollChange) { add_class_on_scroll() }
  else { remove_class_on_scroll() }
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
  gsap.set(".revolutionising", { x: '-50%' });  // Set initial position for element1
gsap.set(".server", { x: '50%' });  // Set initial position for element2

  
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

  const t3 = gsap.timeline({
    scrollTrigger: {
    trigger: ".about-real",

    end: "100%",
    start: "top center"
  },

  smoothChildTiming: true
  });
  t3.from(".sctext", 1.8, {
    y: 100,
    ease: "power4.out",
    start: "bottom bottom",
    skewY: 7,
    scrub: 0,
    stagger: {
      amount: 0.3
    }
  })
  gsap.set(".about-content", { scale: '0.8' });
  t3.to(".about-content", { 
    scale: '0.6'
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
    x: '50%', 
    y: '7.5%',
  });

  
  // optionally return a cleanup function
  return () => console.log("cleanup");
});





