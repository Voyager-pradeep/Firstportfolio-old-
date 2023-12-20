const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".nav-container");
const links = document.querySelector("#nav-container");

navToggle.addEventListener("click", function () {
  linksContainer.classList.toggle("show-links");
});

const navbar = document.getElementById("navbar");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  navToggle.addEventListener("click", function () {
    linksContainer.classList.toggle("show-links");
  });
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  if (scrollHeight > 800) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    // navigate to specific spot
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;

    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    let position = element.offsetTop - navHeight;
    const fixedNav = navbar.classList.contains("fixed-nav");
    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }
    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
    linksContainer.classList.remove("show-links");
  });
});

const preloader = document.querySelector(".preloader");

window.addEventListener("load", function () {
  preloader.classList.add("hide-preloader");
});

const subcriber = document.querySelector(".subcriber");
const project = document.querySelector(".project");

// bio

const reviews = [
  {
    id: 1,
    name: "susan smith",
    job: '"intro"',
    img: "1.png",
    text: "A passionate and dedicated web developer experience in creating user-friendly and visually appealing websites and web applications. My expertise lies in front-end development using HTML, CSS, and JavaScript, as well as I have good command in data structure and object oriented programming",
  },
  {
    id: 2,
    name: "anna johnson",
    job: '"objectives"',
    img: "2.png",
    text: "Seeking a challenging position as a web developer where I can leverage my strong programming skills, creativity, and passion for web development to contribute to innovative projects. I aim to continuously learn and grow in a collaborative environment while delivering high-quality solutions that positively impact users' experiences",
  },
  {
    id: 3,
    name: "susan peter jones",
    job: '"goals"',
    img: "3.png",
    text: "My future goal as a web developer is to become a proficient full-stack developer with expertise in various programming languages, frameworks, and technologies. I aspire to work on challenging projects that push the boundaries of web development, and contribute to building user-friendly, scalable, and secure web applications. ",
  },
];

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

let currentItem = 0;

//show person based on item

window.addEventListener("DOMContentLoaded", function () {
  showPerson();
});

function showPerson() {
  const item = reviews[currentItem];
  img.src = item.img;
  // author.textContent=item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}

nextBtn.addEventListener("click", function () {
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0;
  }
  showPerson();
});
prevBtn.addEventListener("click", function () {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  showPerson();
});

// randomBtn.addEventListener("click", function () {
//   currentItem = Math.floor(Math.random() * reviews.length);
//   showPerson(currentItem);
// });

// Function to check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  // console.log(document.documentElement.clientHeight);
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}
const mobile = document.querySelector("#review-box");
const mobileInfo = document.querySelector("#article-review");
const biodata = document.querySelector("#bio-data");
if (window.innerWidth < 600) {
  mobile.classList.remove("cards");
  mobileInfo.classList.remove("cards");
  biodata.classList.remove("cards");
}
const cards = document.querySelectorAll(".cards");

// Function to handle scroll and trigger the animation for all cards
function scrollHandler() {
  cards.forEach((card) => {
    if (isElementInViewport(card)) {
      card.style.transform = "translateX(0)";
      card.style.opacity = "1";
    }
  });
  if (
    Array.from(cards).every((card) => card.style.transform === "translateX(0)")
  ) {
    window.removeEventListener("scroll", scrollHandler);
  }
}

cards.forEach((card) => {
  let isRight = card.classList.contains("card-right");
  if (isRight) {
    card.style.transform = "translateX(30%)";
    card.style.opacity = "0";
  } else {
    card.style.transform = "translateX(-30%)";
    card.style.opacity = "0";
  }
});
window.addEventListener("scroll", scrollHandler);

// Function for animated counting navbar
// .................................

const counters = document.querySelectorAll(".ser-pro-num");

const options = {
  threshold: 0.5, // Trigger when 50% of the element is in the viewport
};

let countingStarted = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !countingStarted) {
      // Start the counting animations
      startCounting();
      countingStarted = true; // Set a flag to prevent multiple starts
    }
  });
}, options);

counters.forEach((counter) => {
  observer.observe(counter);
});

function startCounting() {
  counters.forEach((counter) => {
    const targetNumber = parseInt(counter.getAttribute("data-target"));
    const duration = 1500;
    const increment = (targetNumber / duration) * 100;

    let count = 0;

    const interval = setInterval(() => {
      count += increment;
      counter.textContent = `${Math.min(Math.round(count), targetNumber)}+`;

      if (count >= targetNumber) {
        clearInterval(interval);
      }
    }, 100);

    // Fade in the counter element
    counter.style.opacity = 1;
  });
}
