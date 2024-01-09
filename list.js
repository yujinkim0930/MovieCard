const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGRjZmM4NTUwZjMwMDMxYjZiOTdmNzc0MWEyNjViZCIsInN1YiI6IjY1OTdkZWQyZDdhNzBhMTIyZTZhOGJhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YGwAyptpeUm5dSc3ZrVvJCe2pNirHAsbWZlJYCiOvPw",
  },
};

let movies = fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    // 반복해서 id, title, overview, poster_path, vote_average 가져와서 출력하기
    let mList = response["results"];
    let movie_list = document.getElementById("list");
    const btn = document.querySelector("#searchbtn");
    mList.forEach((a) => {
      let card_html = `
      <div class="card" id="${a.id}" onclick="alert('영화 ID: ' + '${a.id}')">
        <img src="https://image.tmdb.org/t/p/original${a.poster_path}" alt="${a.title}">
        <h2 class="card-title">${a.title}</h2>
        <p>${a.overview}</p>
        <p>Rating: ${a.vote_average}</p>
      </div>
      `;
      movie_list.innerHTML += card_html;
    });
    // 검색 버튼 클릭 시 해당 영화 출력
    btn.addEventListener("click", function (e) {
      let searchTxt = document.getElementById("box").value.toLowerCase(); // 소문자 변환
      let searchMovieList = mList.filter(({ title }) =>
        title.toLowerCase().includes(searchTxt)
      );
      movie_list.innerHTML = [];

      searchMovieList.forEach((a) => {
        let card_html = `
      <div class="card" id="${a.id}" onclick="alert('영화 ID: ' + '${a.id}')">
        <img src="https://image.tmdb.org/t/p/original${a.poster_path}" alt="${a.title}">
        <h2 class="card-title">${a.title}</h2>
        <p>${a.overview}</p>
        <p>Rating: ${a.vote_average}</p>
      </div>
      `;

        movie_list.innerHTML += card_html;
      });
    });
  })
  .catch((err) => console.error(err));
