const key='2f3a9bfb6e35279f8f67c92164be2b1f';
const baseURL= 'https://api.themoviedb.org/3'
const popularURL= 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2f3a9bfb6e35279f8f67c92164be2b1f';
const nowplayingURL= 'https://api.themoviedb.org/3/movie/now_playing?api_key=2f3a9bfb6e35279f8f67c92164be2b1f&language=en-US&page=1&region=IN';
const upcomingURL='https://api.themoviedb.org/3/movie/upcoming?api_key=2f3a9bfb6e35279f8f67c92164be2b1f&language=en-US&page=1&region=IN';
const topratedURL='https://api.themoviedb.org/3/movie/top_rated?api_key=2f3a9bfb6e35279f8f67c92164be2b1f&language=en-US&page=1&region=IN';

const posterURL='https://image.tmdb.org/t/p/w500';

const noimg= '832px-No-Image-Placeholder.svg.png';

async function loadMovies(){
    let res= await fetch(popularURL);
    let data= await res.json();
    // console.log(data.results);
    showMovies(data.results);
}
// loadMovies()

const main_container= document.getElementById('result-grid')
function showMovies(data){
    main_container.innerHTML='';
    data.forEach(elem => {
        const {title, poster_path, vote_average, overview}= elem;
        const movieItem= document.createElement('div');
        movieItem.classList.add('movieBox');
        searchList.classList.add('hide-search-list');
        movieScBar.value='';
        movieItem.innerHTML=`
        <img src="${(data.poster_path==null) ? posterURL+poster_path : noimg}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview:</h3>
          <p>${overview}</p>
        </div>
        `;

        main_container.append(movieItem);
    });
}

function getColor(vote){
    if(vote>=8){
        return 'green';
    }else if(vote>=5){
        return 'orange';
    }else{
        return 'red';
    }
}

async function popularMovies(){
    let res= await fetch(popularURL);
    let data= await res.json();
    // console.log(data.results);
    showMovies(data.results);
}
popularMovies();

async function nowplayingMovies(){
    let res= await fetch(nowplayingURL);
    let data= await res.json();
    // console.log(data.results);
    showMovies(data.results);
}
nowplayingMovies();

async function upcomingMovies(){
    let res= await fetch(upcomingURL);
    let data= await res.json();
    // console.log(data.results);
    showMovies(data.results);
}
upcomingMovies();

async function topratedMovies(){
    let res= await fetch(topratedURL);
    let data= await res.json();
    // console.log(data.results);
    showMovies(data.results);
}
topratedMovies();

const movieScBar= document.getElementById('scbar');
const searchList= document.getElementById('search-list');

let tid;
function debounce(func, delay){
    if(tid){
        clearTimeout(tid);
    }
    tid= setTimeout(function(){
        func()
    },delay);
};

function searchMovies(){
    let searchTerm= (movieScBar.value).trim();
    if(searchTerm.length>0){
        searchList.classList.remove('hide-search-list');
        displaySearchList(searchTerm);
    }else{
        searchList.classList.add('hide-search-list');
    }
}

let fid;
async function displaySearchList(searchTerm){
    const searchURL=`https://api.themoviedb.org/3/search/movie?api_key=2f3a9bfb6e35279f8f67c92164be2b1f&query=${searchTerm}`;
    let res= await fetch(`${searchURL}`);
    let data= await res.json();
    // console.log(data.results);

    showSearchList(data.results)
    fid= setTimeout(function(){
        showMovies(data.results)
    },3000)
    
};
// displaySearchList();
function showSearchList(movies){
    searchList.innerHTML='';
    movies.forEach(elem =>{
        const {poster_path, title, release_date}=elem;
        searchItem= document.createElement('div');
        searchItem.classList.add('search-list-item');
        if(elem.poster_path!=null){
            moviePoster= elem.poster_path;
            console.log(moviePoster)
        }else{
            moviePoster='832px-No-Image-Placeholder.svg.png';    
        };

        searchList.innerHTML=`
        <div class="search-item-thumbnail">
            <img src="${moviePoster}" alt="">
        </div>
        <div class="search-item-info">
            <h3>${elem.title}</h3>
            <p>${elem.release_date}</p>
        </div>
        `;

        searchList.append(searchItem);
    });
};

window.addEventListener('click', (event)=>{
    if(event.target.className != 'scsec'){
        searchList.classList.add('hide-search-list');
    }
});