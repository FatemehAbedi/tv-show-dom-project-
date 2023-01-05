fetch("https://api.tvmaze.com/shows/82/episodes")
  .then((res) => res.json())
  .then((data) => main(data));

// creat cards
const make = (tag) => document.createElement(tag);
function randcolor() {
  let colors = ["green", "red", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
}
function creatCard(url, name, img, episode, sammery) {
  let movie = make("div");
  movie.classList.add("movie");
  movie.id = episode;
  let image = make("img");
  let movieInfo = make("div");
  movieInfo.classList.add("movie_info");
  let MovieTitle = make("h3");
  let episodes = make("span");
  episodes.classList.add(randcolor());
  let overview = make("div");
  overview.classList.add("overview");
  let more = make("a");
  more.classList.add("link");
  image.src = img;
  MovieTitle.innerText = name;
  episodes.innerText = episode;
  overview.innerHTML = sammery;
  more.href = url;
  more.innerText = "See episode";
  movie.append(image);
  movie.append(movieInfo);
  movieInfo.append(MovieTitle);
  movieInfo.append(episodes);
  movie.append(overview);
  overview.append(more);
  return movie;
}
function getEpisodeNumber(numS, numE) {
  if (numS < 10) {
    numS = `0${numS}`;
  }
  if (numE < 10) {
    numE = `0${numE}`;
  }
  return `S${numS}E${numE}`;
}

function main(res) {
  let content = document.querySelector(".main");
  let select = document.querySelector("#nav-ep");
  select.addEventListener("change", function () {
    window.location = this.value;
  });
  res.forEach((item) => {
    let episode = getEpisodeNumber(item.season, item.number);
    let movie = creatCard(
      item.url,
      item.name,
      item.image.medium,
      episode,
      item.summary
    );
    content.append(movie);
    select.append(renderSelect(item.name, episode));
    // console.log(episode);
  });
}

//level 200
function search(event) {
  let input = document.querySelector("#search").value.toLowerCase();
  //   console.log(input);
  let movies = document.querySelectorAll(".movie");

  for (let movie of movies) {
    let movieTitle = movie.querySelector("h3").innerText.toLowerCase();
    let movieSummary = movie
      .querySelector(".overview p")
      .innerText.toLowerCase();

    if (movieTitle.includes(input) || movieSummary.includes(input)) {
      movie.style.display = "";
    } else {
      movie.style.display = "none";
    }
  }
  let span = document.querySelector("span");
  span.innerText = `${counter(movies)}`;
}
function counter(array) {
  let count = 0;
  array.forEach((item) => {
    if (item.style.display == "") {
      count++;
    }
  });
  return count;
}
// Creat level 300
function renderSelect(name, number) {
  let option = make("option");
  option.innerText = `${number} - ${name}`;
  option.value = `#${number}`;
  return option;
}
