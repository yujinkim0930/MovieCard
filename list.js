const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGRjZmM4NTUwZjMwMDMxYjZiOTdmNzc0MWEyNjViZCIsInN1YiI6IjY1OTdkZWQyZDdhNzBhMTIyZTZhOGJhMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YGwAyptpeUm5dSc3ZrVvJCe2pNirHAsbWZlJYCiOvPw'
  }
};

let movies = fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    // 반복해서 id, title, overview, img 가져와서 출력하기
    let mList = response['results'];
    let movie_list = (document.getElementById("list"));
    const btn = document.querySelector("#searchbtn");
    let movie_card = document.querySelector("card");

    let list = mList.forEach(a => {
      let id = a['id'];
      let title = a['title'];
      let overview = a['overview'];
      let img = "https://image.tmdb.org/t/p/original" + a['poster_path'];
      let card_html = `
      <div class="card" id="${id}" onclick="alert('영화 ID: ' + '${id}')">
        <img src="${img}" alt="${title}">
        <h2 class="card-title">${title}</h2>
        <p>${overview}</p>
      </div>
      `;

      movie_list.innerHTML += (card_html);


    });
    btn.addEventListener("click", function (e) {
      let input = document.getElementById("box");
      let value = input.value;
      movie_list.innerHTML = [];
      console.log(value);

      //영화 제목 전체를 입력받아 출력
      //부분만 작성해도 카드가 뜨게 하는 건 모르겠어요..
      mList.forEach(a => {
        if (value === a['title']) {
          let r_id = a['id'];
      let r_title = a['title'];
      let r_overview = a['overview'];
      let r_img = "https://image.tmdb.org/t/p/original" + a['poster_path'];
      let r_card_html = `
      <div class="card" id="${r_id}" onclick="alert('영화 ID: ' + '${r_id}')">
        <img src="${r_img}" alt="${r_title}">
        <h2 class="card-title">${r_title}</h2>
        <p>${r_overview}</p>
      </div>
      `;

      movie_list.innerHTML += (r_card_html);
        }

          
      })


    })

  })
  .catch(err => console.error(err));