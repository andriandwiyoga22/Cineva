
import getDataMovieTren from "./moviesTrend.js";
import getDataMovieRelease from "./moviesRelease.js";

export default async function alls() {
    const all = document.getElementById("all")
    const container = document.querySelector(".content-hero")

    all.addEventListener("click", (e) => {
        e.preventDefault();
        history.pushState(null, null, window.location.pathname);
        const scrollPos = window.scrollY;

        if (document.getElementById("card-list1")) {
            console.log("Konten sudah ada, tidak perlu render ulang.");
            return;
        }

        // Jalankan logika render jika belum aktif
        container.innerHTML = `
            <div class="show">
                <p class="title">TRENDING NOW</p>
                <h5 id="show-all1" onclick="scrollToContent()">SHOW ALL ></h5>
            </div>
            <div class="card-list" id="card-list1"></div>
            <div class="show">
                <p class="title">NEW RELEASE</p>
                <h5 id="show-all2">SHOW ALL ></h5>
            </div>
            <div class="card-list" id="card-list2">
                ${getDataMovieTren()}
                ${getDataMovieRelease()}
            </div>`;

        window.scrollTo(0, scrollPos);
    });
}