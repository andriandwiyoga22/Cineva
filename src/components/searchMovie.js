import { options } from '../config/apiKey.js'

export default async function searchMovies() {

    let search = document.getElementById('search');
    let value = search.value

    // Kita tambahkan pengecekan agar event listener tidak dipasang berulang-ulang
    if (!search.dataset.listenerInstalled) {
        search.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchMovies(); // Memanggil dirinya sendiri
            }
        });
        search.dataset.listenerInstalled = "true"; // Tandai bahwa listener sudah dipasang
    }

    if (value.trim() === "") {
        search.dataset.ready = "true";
        return;
    }

    await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(value)}&include_adult=false&language=en-US&page=1`, options)
        .then(res => res.json())
        .then(({ results }) => {

            // console.log("Hasil pencarian:", results);


            const content = document.querySelector(".content-hero")

            content.innerHTML = ` <div class="show">
                        <p class="title">SEARCH RESULTS</p>
                    </div> 
                    <div class="card-list" id="card-list-search"> </div>`

            const cardList = document.getElementById("card-list-search");
            let listHTML = ""

            results.forEach((item) => {
                if (!item.poster_path) return;

                const posterImg = item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "images/not-found.jpg";

                listHTML += ` 
                        <div class="container-card">
                            <div class="card" onClick="showMovieDetail(${item.id})">
                                <img class="card-img" src="${posterImg}">
                                <div class="card-text">
                                    <p href="javascript:void(0)">${item.title}</p>
                                    <p>${item.original_language} - ${item.release_date}</p>
                                </div>
                            </div>
                        </div>
                    `
            })
            cardList.innerHTML += listHTML

            scrollToContent()

            search.value = ""
        })
}