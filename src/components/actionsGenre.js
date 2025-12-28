import { options } from '../config/apiKey.js'

export default async function actions() {
    await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=28`, options).then(res => res.json()).
        then(({ results }) => {

            const action = document.getElementById("action")
            const container = document.querySelector(".content-hero")


            action.addEventListener("click", (e) => {
                e.preventDefault()

                if (document.getElementById("card-list-action")) {
                    console.log("Konten sudah ada, tidak perlu render ulang.");
                    return;
                }

                container.innerHTML = ` <div class="show">
                        <p class="title">ACTION GENRE</p>
                    </div> 
                    <div class="card-list" id="card-list-action"> </div>`

                const cardList = document.getElementById("card-list-action");
                let listHTML = "";

                results.forEach((item) => {
                    // console.log(item)

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

                cardList.innerHTML = listHTML;
            }
            )
        })
}