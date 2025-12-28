import { options } from '../config/apiKey.js'
import backDrop from '../components/backDrop.js'
import getDataMovieTren from '../components/moviesTrend.js'
import getDataMovieRelease from '../components/moviesRelease.js'
import actions from '../components/actionsGenre.js'
import comedys from '../components/comdeysGenre.js'
import dramas from '../components/dramasGenre.js'
import horrors from '../components/horrorsGenre.js'
import romances from '../components/romancesGenre.js'
import searchMovies from '../components/searchMovie.js'
import showMovieDetail from '../components/moviesDetail.js'
import playNow from '../components/playNow.js'
import alls from '../components/allGenre.js'

backDrop()
searchMovies()
getDataMovieTren()
getDataMovieRelease()

alls()
actions()
comedys()
dramas()
horrors()
romances()


function scrollToContent() {
    const target = document.querySelector('.container-content');
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
window.scrollToContent = scrollToContent
