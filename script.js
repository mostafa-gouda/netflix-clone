// nav fadin effect
document.addEventListener("scroll", () => {
  if (scrollY === 0) {
    document.querySelector("header").classList.remove("scrolled");
  } else {
    document.querySelector("header").classList.add("scrolled");
  }
});

// search icon click
document.addEventListener("click", (e) => {
  if (e.target === document.querySelector(".search .icon")) {
    document.querySelector(".search").classList.add("active-search");
  } else {
    document.querySelector(".search").classList.remove("active-search");
  }
});

// mobile menu

document.querySelector(".menu-btn").addEventListener("click", () => {
  document.querySelector("main").classList.toggle("main-open-menu");
  const isblock = document.querySelector("nav").style.display === "block";
  document.querySelector("nav").style.display = isblock ? "none" : "block";
});

// Rendering movie images in carousel

const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w500";
const apiKey = "ef096c332fcb3411e9fe6fbac420c96c";

const requests = {
  netflixOriginals: `/discover/tv?api_key=${apiKey}&with_networks=213`,
  trending: `/trending/movie/day?api_key=${apiKey}`,
  topRated: `/movie/top_rated?api_key=${apiKey}`,
  action: `/discover/movie?api_key=${apiKey}&with_genres=28`,
  comedy: `/discover/movie?api_key=${apiKey}&with_genres=35`,
  romance: `/discover/movie?api_key=${apiKey}&with_genres=10749`,
};

const getData = async (type) => {
  let response = await fetch(baseUrl + type);
  data = await response.json();
  return data.results;
};

const showContent = async () => {
  for (let [key, value] of Object.entries(requests)) {
    let movies = await getData(value);
    movies.forEach((movie, i) => {
      let image = document.createElement("img");
      image.src = imageUrl + movie.backdrop_path;
      let node = document.createElement("li");
      node.className = "carousel-item";
      node.appendChild(image);
      document.querySelector(`.${key} ul`).appendChild(node);
    });
  }
};

showContent();

// carousel arrows

let counter = 1;
for (let key of Object.keys(requests)) {
  document.querySelector(`.${key} .next`).onclick = (e) => {
    document.querySelectorAll(`.${key} li`).forEach((li) => {
      let minWidth = parseInt(window.getComputedStyle(li).minWidth);
      let imageCount = Math.floor(100 / minWidth);
      let imageWidth = li.getBoundingClientRect().width;
      let offsetValue = -imageWidth * counter * imageCount;
      if (offsetValue > -imageWidth * 20)
        li.style.transform = `translateX(${offsetValue}px)`;
      else {
        li.style.transform = `translateX(0px)`;
        counter = 0;
      }
    });
    counter++;
  };
}

for (let key of Object.keys(requests)) {
  document.querySelector(`.${key} .prev`).onclick = (e) => {
    counter--;
    document.querySelectorAll(`.${key} li`).forEach((li) => {
      let minWidth = parseInt(window.getComputedStyle(li).minWidth);
      let imageCount = Math.floor(100 / minWidth);
      counter = counter === 0 ? 20 / imageCount : counter;
      let imageWidth = li.getBoundingClientRect().width;
      let offsetValue = -imageWidth * (counter - 1) * imageCount;
      if (offsetValue > -imageWidth * 20)
        li.style.transform = `translateX(${offsetValue}px)`;
      else {
        li.style.transform = `translateX(0px)`;
        counter = 0;
      }
    });
  };
}
