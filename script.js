window.addEventListener("load", () => {

    document.getElementById("loader")
    .style.display = "none";

});

// DARK MODE
// DARK MODE - Ensure this variable is only declared ONCE here!
// === DARK MODE BUTTON (FIXED) ===
// Declare the theme variable ONLY once using a completely unique name
const appThemeToggleButton = document.getElementById("themeBtn");

if (appThemeToggleButton) {
    appThemeToggleButton.onclick = () => {
        document.body.classList.toggle("dark");
    };
}
// FOOD SEARCH
const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const value =
searchInput.value.toLowerCase();

document
.querySelectorAll(".card")
.forEach(card=>{

card.style.display =
card.innerText.toLowerCase()
.includes(value)
? "block"
: "none";

});

});
}

// CATEGORY FILTER

const filterBtns =
document.querySelectorAll(
".filter-buttons button"
);

filterBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

const category =
btn.dataset.filter;

document
.querySelectorAll(".card")
.forEach(card=>{

if(category==="all"){
card.style.display="block";
}
else if(
card.classList.contains(category)
){
card.style.display="block";
}
else{
card.style.display="none";
}

});

});

});

// COUNTER

//  FIXED VERSION:
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    let target = +counter.dataset.target;
    // Safety check to ensure there is a target number to count to
    if (!isNaN(target)) { 
        let count = 0;
        const update = () => {
            count += target / 100;
            if (count < target) {
                counter.innerText = Math.floor(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };
        update();
    }
});

// TESTIMONIAL SLIDER


let slides =
document.querySelectorAll(".slide");

let current = 0;

setInterval(()=>{

slides[current]
.classList.remove("active");

current =
(current+1)%slides.length;

slides[current]
.classList.add("active");

},3000);

// MODAL

const modal =
document.getElementById(
"bookingModal"
);

//  FIXED VERSION:
// === FIX: MODAL SECTION ===
// Use a unique variable name 'bookingModal' to prevent any 'already declared' syntax errors
// === MODAL SECTION (CLEANED & FIXED) ===
const bookingModal = document.getElementById("bookingModal");
const heroBtn = document.querySelector(".hero-btn");

if (heroBtn && bookingModal) {
    heroBtn.onclick = () => {
        bookingModal.style.display = "block";
    };
}
const closeModal = document.getElementById("closeModal");
if (closeModal && bookingModal) {
    closeModal.onclick = () => {
        bookingModal.style.display = "none";
    };
}
//cart code
let cart = 0;

const cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach((btn) => {

    btn.addEventListener("click", () => {

        cart++;

        document.getElementById("cartCount").innerText = cart;

        console.log("Item Added");
    });

});
// AOS ANIMATION
AOS.init({

    duration:1200,
    once:true

});
/*Active Navbar Highlight */
const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=
section.offsetTop;

if(window.scrollY >=
sectionTop - 200){

current=section.id;

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(
link.getAttribute("href")
=== `#${current}`
){

link.classList.add("active");

}

});

});

// BACK TO TOP BUTTON
const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}





// ================================================================
// 🚀 PASTE THE NEW FIREBASE RESERVATION CODE HERE AT THE VERY BOTTOM:
// ================================================================
// ================================================================
// 🚀 UPDATED ERROR-PROOF FIREBASE RESERVATION CODE
// ================================================================
const reservationForm = document.querySelector(".reservation-form");

if (reservationForm) {
  reservationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Pull the Firestore utilities safely mapped to window in index.html
    const { collection, addDoc } = window.firestoreUtils;
    const db = window.db;

    // Defensive check to avoid 'undefined' crashes if an input field name is slightly off in HTML
    const getFormValue = (fieldName) => {
      const element = reservationForm.elements[fieldName] || reservationForm.querySelector(`[name="${fieldName}"]`);
      return element ? element.value : "";
    };

    // Safely collect form fields
    const data = {
      fullName: getFormValue("fullName"),
      email: getFormValue("email"),
      phone: getFormValue("phone"),
      date: getFormValue("date"),
      time: getFormValue("time"),
      guests: getFormValue("guests") || "2 People",
      specialRequest: getFormValue("specialRequest") || "None",
      createdAt: new Date() // Sets the current submission timestamp
    };

    try {
      // Direct insertion straight into your secure 'reservations' collection
      await addDoc(collection(db, "reservations"), data);
      
      alert("🎉 Reservation Submitted Successfully!");
      reservationForm.reset(); // Empties the form fields automatically
    } catch (error) {
      console.error("Firebase Error Details:", error);
      alert("❌ Error Saving Reservation. Please try again.");
    }
  });
}
