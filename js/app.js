let moviesection=document.querySelector(".movieSection")
let page=1;
let getMovies = (search) => {
   let apiUrl
   if (search) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${search}`
   }
   else{
      apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`
      
   }

   fetch(apiUrl)
     .then((res) => res.json())
     .then((finalRes) => {
        

      window.scrollTo({        //for next & preview buttons
         top:"0px",
         behavior:"smooth"
      })


       let { results } = finalRes  //Array [20 Element]
       
       let moviesItem = ''
        results.forEach(element => {
           let {original_title,vote_average,release_date,poster_path}=element

           moviesItem +=`<div class="movieitems">
                            <figure>
                              <img src="https://image.tmdb.org/t/p/w1280/${poster_path}" alt="">
                              <div class="rating">
                                <i class="fa-solid fa-star"></i>
                                <span>${vote_average}</span>
                              </div>
                            </figure>
                            <div class="moviecontent">
                              <h3> ${original_title}</h3>
                              <p> ${release_date} </p>
                            </div>
                          </div>`          
        });
        
        moviesection.innerHTML=moviesItem

     })

}


let nextMoviedata=()=>{
  page=page+1
  getMovies()
}

let previewMoviedata=()=>{
  if(page>1){
    page=page-1
    getMovies()
  }
}

getMovies()

