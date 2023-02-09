let page = 1;
let perPage = 10;



function loadMovieData(title = null){
    let url = +title
          ? `https://cute-rose-xerus-cuff.cyclic.app/api/movies?page=1&perPage=1&title=${+title}`
          : `https://cute-rose-xerus-cuff.cyclic.app/api/movies?page=${page}&perPage=${perPage}`;
    
    let visible =  document.querySelector("#pagination");
    visible.classList.add("d-none");
    visible.classList.toggle("visible", title = null);
    fetch(url).then((res) => res.json())
    .then((data) => {
        let rows = `${data.map(movie =>(
            `<tr data-id=${movie._id}>
            <td>${movie.year}</td>
            <td>${movie.title}</td>
            <td>${movie.plot}</td>
            <td>${movie.rated}</td>
            <td>${Math.floor(movie.runtime / 60)}:${(movie.runtime % 60).toString().padStart(2, '0')}</td>
            </tr>`
        )).join('')}`;
        document.querySelector("#table tbody").innerHTML = rows;
        document.querySelector("#current-page").textContent = page;
        document.querySelectorAll("#table tbody tr").forEach(row=>{
            row.addEventListener("click", function(e){
              let clickedID = row.getAttribute("data-id");
            fetch(`/api/movies/${clickedID}`).then((res=>res.json()).then(data=>{
                document.querySelector("#details-modal .modal-title").textContent = data.title;
                let movies = `${data.map( movie => (`
                <img class="img-fluid w-100" src="${movie.poster}"><br><br>
                <strong>Directed By:</strong>${movie.directors.join(",")}<br><br>
                <p>${movie.fullplot}</p>
                <strong>Cast:</strong>${movie.cast.join(",")}<br><br>
                <strong>Awards:</strong>${movie.awards.text}<br>
                <strong>IMDB Rating:</strong>${movie.imdb.rating} (${movie.imdb.votes}) votes`)).join('')}`;
                document.querySelector("#detailsModal .modal-body").innerHTML = movies;
                let myModal = new bootstrap.Modal(document.getElementById('detailsModal'), {
                    backdrop: 'static', 
                    keyboard: false, 
                    focus: true, 
                  });

                  myModal.show();

            }));
        
    
        })});
    });


}



document.addEventListener("DOMContentLoaded", function(){
    loadMovieData(); 

    document.querySelector("#searchForm").addEventListener("submit", function(e){
      e.preventDefault();
      let title = document.querySelector("#title").value;
      loadMovieData(title);
    });
  });