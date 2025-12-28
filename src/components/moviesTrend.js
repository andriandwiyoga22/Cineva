import { options } from '../config/apiKey.js'

export default async function getDataMovieTren() {
    await fetch(`https://api.themoviedb.org/3/movie/popular`, options).
        then(res => res.json()).
        then(({ results }) => {
            const cardList = document.getElementById("card-list1")
            const showAll = document.getElementById("show-all1")

            const renderMovieTren = (results) => {
                // 1. PENTING: Kosongkan isi cardList sebelum merender ulang
                let listHTML = "";

                results.forEach(
                    item => {
                        // console.log(item)

                        const posterImg = item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "images/not-found.jpg";



                        listHTML +=
                            `<div class="container-card">
                        <div class="card" onClick="showMovieDetail(${item.id})">
                            <img class="card-img" src="${posterImg}">
                            <div class="card-text">
                                <p href="javascript:void(0)">${item.title}</p>
                                <p>${item.original_language} - ${item.release_date}</p>
                            </div>
                        </div>
                    </div>`

                        cardList.innerHTML = listHTML
                    }
                )
            }

            renderMovieTren(results.slice(0, 6)) //Mengiris hanya menampilkan dari index 0 - 6

            showAll.addEventListener("click", () => {
                if (showAll.textContent === "< PREVIEW") {
                    // Kembali ke 6 film pertama
                    renderMovieTren(results.slice(0, 6));
                    showAll.textContent = "SHOW ALL >";
                } else {
                    // Tampilkan penuh
                    renderMovieTren(results);
                    showAll.textContent = "< PREVIEW";
                }
            })

        }).
        catch(err => console.error("fetch error: ", err))
}