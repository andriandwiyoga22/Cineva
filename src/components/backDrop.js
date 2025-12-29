import { options } from '../config/apiKey.js'

// INITIAL VIEW SLIDE CONTROLLER
export default async function backDrop() {
    await fetch(`https://api.themoviedb.org/3/movie/now_playing`, options).
        then(res => res.json()).
        then(({ results }) => {
            const header = document.querySelector(".container-header")

            const backDropBackground = (results) => {
                let index = 0
                let slideInterval;

                const renderSlide = () => {
                    const item = results[index]

                    const isFirstLoad = index === 0 && !header.querySelector('.header');

                    const backdropPath = item.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                        : "images/not-found.jpg";

                    const newSlide = document.createElement('div');
                    newSlide.className = 'header'; // Pastikan CSS .header punya position: absolute

                    if (isFirstLoad) {
                        newSlide.classList.add('active', 'no-transition');
                    }

                    newSlide.style.backgroundImage = `url(${backdropPath})`;
                    newSlide.innerHTML = `
                    <div class="header-hero">
                        <h1>${item.title}</h1>
                        <h4>${item.overview.substring(0, 150)}...</h4>
                        <button class="btn-play" onClick="playNow(${item.id})">play now</button>
                        <button class="btn-play" onClick="showMovieDetail(${item.id})">detail info</button>
                    </div>`;

                    header.appendChild(newSlide)

                    if (!isFirstLoad) {
                        const oldSlide = header.querySelector('.header.active');

                        setTimeout(() => {
                            if (oldSlide) {
                                oldSlide.classList.remove('active', 'no-transition');
                                oldSlide.classList.add('exit');

                                // Hapus slide lama setelah animasi geser keluar selesai
                                setTimeout(() => oldSlide.remove(), 500);
                            }

                            // Slide baru geser masuk
                            newSlide.classList.add('active');
                        }, 50);
                    }


                }
                renderSlide()

                // Fungsi untuk mulai jalan otomatis
                const startInterval = () => {
                    slideInterval = setInterval(() => {
                        index = (index + 1) % results.length;
                        renderSlide();
                    }, 5000);
                };

                // Fungsi untuk stop
                const stopInterval = () => {
                    clearInterval(slideInterval);
                };

                // JALANKAN PERTAMA KALI
                startInterval();

                // EVENT LISTENER (Harus memanggil fungsi, bukan dieksekusi langsung)
                header.addEventListener("mouseenter", stopInterval);
                header.addEventListener("mouseleave", startInterval);

            }
            backDropBackground(results)
        })
}
