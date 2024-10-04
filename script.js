const musicContainer = document.getElementsByClassName("playList")[0];
const audioTag = document.getElementsByClassName("play")[0];
const playingTimeTag = document.getElementsByClassName("playingTime")[0];
const currentProgressTag = document.getElementById("currentProgress");
const playButtonTag = document.querySelector(".playButton");
const pauseButtonTag = document.querySelector(".pauseButton");
const previousButtonTag = document.querySelector(".previousButton");
const nextButtonTag = document.querySelector(".nextButton");
const tracImageTag = document.getElementById("trackImages")


const tracks = [
    {trackID : "songs/Eminem - Somebody Save Me (feat. Jelly Roll) [Official Music Video].mp3", title: "Somebody Save Me - Eminem", photos: "images/images 1.jpeg"},
    {trackID: "songs/Future, Metro Boomin - Like That (Official Audio).mp3", title: "Metro Boomin - Like That ", photos: "images/images22.jpg"},
    {trackID: "songs/The Emptiness Machine.mp3", title: "The Emptiness Machine - Linkkin Park", photos: "images/images3.jpeg"},
    {trackID: "songs/Travis Scott - MO CITY FLEXOLOGIST.mp3", title: "Travis Scott - MO City", photos: "images/images4.png"},
    {trackID: "songs/Travis_Scott_Fein_ft.Playboi Carti .mp3", title: "Fein - Travis Scott ft. Playboi Carti", photos: "images/images5.jpg"},
    {trackID: "songs/Eminem - Lose Yourself [HD].mp3", title: "Eminem - Lose Youreself", photos: "images/images6.jpg"},
    {trackID: "songs/Justin Bieber - Intentions (Official Video (Short Version)) ft. Quavo.mp3", title: "Justin Biber - Intentions", photos: "images/images7.jpg"},
    {trackID: "songs/Kendrick Lamar - Not Like Us.mp3", title: "Kendirck Lamar - Not Like Us", photos: "images/images8.jpeg"},
    {trackID: "songs/Kendrick Lamar Euphoria (Drake Diss) (Lyrics).mp3", title: "Kendirck Lamar - Euphoria", photos: "images/images9.png"},
    {trackID: "songs/LANY - Malibu Nights (Official Music Video).mp3", title: "Lany - Marlibu Night", photos: "images/images10.jpg"},
];

for (let i = 0; i < tracks.length; i++) {
    const trackTag = document.createElement("div");
    trackTag.classList.add("trackItem");
    trackTag.addEventListener("click", () => {
        const trackID = tracks[i].trackID;
        audioTag.src = trackID;
        audioTag.play();
        isPlaying = true;
        updatePlayAndPauseButton();
        updateTrackImage(i);
    });
    const title = (i + 1).toString() + " . " + tracks[i].title;
    trackTag.textContent = title;
    musicContainer.append(trackTag);
}
const updateTrackImage = (index) => {
    tracImageTag.src = tracks[index].photos;
};

let durationText = "00:00";
let duration = 0;

audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration);
    durationText = createMinutesAndSecondText(duration);
});

audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime); 
    const currentTimeText = createMinutesAndSecondText(currentTime);
    const currentTimeTextAndDurationText = currentTimeText + " / " + durationText;
    playingTimeTag.textContent = currentTimeTextAndDurationText;
    updateCurrentProgress(currentTime);
});

const updateCurrentProgress = (currentTime) => {
    const currentProgressWidth = (500/duration) * currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px" ;
}

const createMinutesAndSecondText = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    const secondsText = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
    return minutesText + ":" + secondsText;
};

let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true
    if (currentTime === 0) {
        const songIdToPlay = tracks[currentPlayingIndex].trackID;
        audioTag.src = songIdToPlay;
        audioTag.play();
        isPlaying = true;
        updatePlayAndPauseButton();
    } else {
        audioTag.play();
        updatePlayAndPauseButton();
    }

});

pauseButtonTag.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton();
});

previousButtonTag.addEventListener("click", () => {
    if (currentPlayingIndex === 0) {
        return;
    }
    currentPlayingIndex -= 1;
    const songIdToPlay = tracks[currentPlayingIndex].trackID;
    audioTag.src = songIdToPlay;
    audioTag.play()
    isPlaying = true;
    updatePlayAndPauseButton();
    updateTrackImage(currentPlayingIndex);
});

nextButtonTag.addEventListener("click", () => {
    if (isShuffle) {
        currentPlayingIndex = getRandomTrackIndex();
    } else {
        if (currentPlayingIndex === tracks.length - 1) {
            currentPlayingIndex = 0;
        } else {
            currentPlayingIndex +=1;
        }
    }
    const songIdToPlay = tracks[currentPlayingIndex].trackID;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPauseButton();
    updateTrackImage(currentPlayingIndex);
});




const updatePlayAndPauseButton = () => {
    if (isPlaying) {
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    }else {
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
}


let isRepeat = false;
const repeatButtonTag = document.querySelector(".fa-repeat");
const repeatIndicatorTag = document.querySelector(".One");

repeatButtonTag.addEventListener("click", () => {
    isRepeat = !isRepeat;  // Toggle repeat mode
    repeatButtonTag.classList.toggle("active");  // Add visual feedback to the button

    // Show or hide the "1" when repeat is toggled
    if (isRepeat) {
        repeatIndicatorTag.style.display = "block";  // Show the "1" next to repeat
    } else {
        repeatIndicatorTag.style.display = "none";  // Hide the "1"
    }
});

// Listen for the audio to end
audioTag.addEventListener("ended", () => {
    if (isRepeat) {
        audioTag.currentTime = 0;  // Restart the current song
        audioTag.play();  // Play the song again
    } else {
        nextButtonTag.click();  // Go to the next song if repeat is off
    }
});

let isShuffle = false ;
const shuffelButtonTag = document.querySelector(".fa-shuffle");
const trackLenght = tracks.length;

shuffelButtonTag.addEventListener("click", () => {
    isShuffle = !isShuffle;  // Toggle shuffle state
    shuffelButtonTag.classList.toggle("active");  // Change the button color

    // Optional: Add logic to visually indicate shuffle state
    if (isShuffle) {
        shuffelButtonTag.style.color = "grey";  // Change to green when active
    } else {
        shuffelButtonTag.style.color = "";  // Reset color when not active
    }
});

const getRandomTrackIndex = () => {
    let randomIndex = Math.floor(Math.random() * trackLenght);
    // Ensure it's not the same track
    while (randomIndex === currentPlayingIndex) {
        randomIndex = Math.floor(Math.random() * trackLenght);
    }
    return randomIndex;
};