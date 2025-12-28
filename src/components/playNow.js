import { options } from '../config/apiKey.js'

const playBtn = document.querySelector('.play-detail');
export default async function playNow(movieId) {
    // Ambil data video/trailer
    await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, options)
        .then(res => res.json())
        .then(({ results }) => {
            // console.log(results)
            // Cari video yang bertipe 'Trailer' di YouTube
            const trailer = results.find(item => item.type === 'Trailer' && item.site === 'YouTube');

            if (trailer) {
                // Buka trailer di tab baru
                window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
            } else {
                alert("Maaf, trailer tidak tersedia untuk film ini.");
            }
        })
        .catch(err => console.error("Error trailer: ", err));
};
window.playNow = playNow