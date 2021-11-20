/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

let navBarUl = document.getElementById("navbar__list");
let sectionList = document.getElementsByTagName("section");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function updateSectionList(){
    sectionList = document.getElementsByTagName("section");
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavBar(){
    updateSectionList();
    var navBarDef = document.createDocumentFragment();
    
    for(var sect of sectionList){
        var sectionHeader = sect.querySelector("h2");
        var navButton = document.createElement("li");
        navButton.id = `nav__${sect.id}`
        navButton.innerText = sectionHeader.innerText;
        navButton.classList.add("menu__link"); 
        navButton.setAttribute("data-targetSection",`${sect.id}`);

        navBarDef.append(navButton);
    }
    navBarUl.append(navBarDef);
}


// Add class 'active' to section when near top of viewport
function sectionInView(){
   for (let navB of navBarUl.children ){
        navB.classList.remove("active");
   }
   for(let sectionL of sectionList){
        sectionL.classList.remove("your-active-class");
        var locationTop = sectionL.getBoundingClientRect().top;
        var locationBottom = sectionL.getBoundingClientRect().bottom;
        if(locationTop <= (window.innerHeight * .4) && locationBottom > (window.innerHeight * .4)){
            var navB = document.getElementById(`nav__${sectionL.id}`);
            navB.classList.add("active");
            sectionL.classList.add("your-active-class");
        }
   }
}

// Scroll to anchor ID using scrollTO event
 let scrollToSection = (e)=>{
    var targetId = e.target.getAttribute("data-targetSection");
     window.scrollTo({
         top: document.getElementById(targetId).getBoundingClientRect().top + window.scrollY,
         behavior:"smooth"
     });
}



/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener("DOMContentLoaded",buildNavBar);

// Scroll to section on link click
navBarUl.addEventListener("click",scrollToSection);

// Set sections as active
document.addEventListener("scroll",sectionInView);


