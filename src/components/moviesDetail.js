import { options } from '../config/apiKey.js'

export default async function showMovieDetail(movieId) {
    const hero = document.querySelector(".hero-detail")
    const container = document.querySelector('.container-detail')

    hero.style.display = 'block';

    await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options)
        .then(res => res.json())
        .then(item => {
            // console.log(item)

            const posterImg = item.poster_path
                ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                : "";
            const backdropImg = item.backdrop_path
                ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                : posterImg;

            container.innerHTML = `<div class="detail-card">
                        <img src="${posterImg}">
                        <div class="background-detail" style="background-image: url(${backdropImg});">
                            <div class="text-detail">
                                <h2>${item.title}</h2>
                                <h4>${item.overview}</h4>
                                <button class="play-detail" onClick="playNow(${item.id})">PLAY TRAILER</button>
                            </div>
                            <button class="close-detail"> X </button>
                        </div>
                    </div>`

            const closeDetail = document.querySelector('.close-detail');

            hero.onclick = function (e) {
                if (e.target === hero) {
                    hero.style.display = 'none';
                    container.innerHTML = '';
                }
            };
            closeDetail.onclick = function () {
                hero.style.display = 'none';
                container.innerHTML = '';
            };

        })
        .catch(err => console.error("Error detail: ", err));
}
window.showMovieDetail = showMovieDetail;