/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

document.querySelector(".search-form").addEventListener("submit", function(event) {

  let searchParam = document.querySelector("#searchBox").value.replace(' ', '+');

  fetch(
      `https://itunes.apple.com/search?term=${searchParam}`
    )
    .then(function(response) {
      // Check and make sure we got a status code of 200.  If not, display some
      // other error message
      response.json().then(function(data) {
        for (let i = 0; i < data.results.length; i++) {
          document.querySelector(".results").innerHTML +=
            `
            <div class="result">
              <img src="${data.results[i].artworkUrl100}"></img>
              <div style="display: none;" class="musicPreview">${data.results[i].previewUrl}</div>
              <span class="artist">${data.results[i].artistName}</span>
              <span class="song">${data.results[i].trackName}</span>
            </div>
            `
        };
      });
    })
    .catch(function(error) {
      console.log(error);
    })

  // Cludgy stuff to stop the form submission from reloading the page.
  event.preventDefault();
  event.stopPropagation();
  return false;

  // Get user's search string
  // Fetch `https://itunes.apple.com/search?term=${user_search}`
  // For each item in result, create and display in HTML

});

let audio = document.querySelector(".music-player");
document.querySelector(".results").addEventListener("click", function (event) {
  if (event.target && event.target.matches("div.result img")) {
    let parent = event.target.parentElement;
    audio.src = parent.getElementsByClassName('musicPreview')[0].innerHTML;
    audio.play();
    let songDisplay = document.querySelector('#currentSong');

    let artist = parent.getElementsByClassName('artist')[0].innerHTML;
    let song = parent.getElementsByClassName('song')[0].innerHTML;

    songDisplay.innerHTML = `Now Playing: ${artist} - ${song}`;
  }
});
