window.onload = function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();

    // Stop music after 60 seconds
    setTimeout(() => {
        backgroundMusic.pause();
    }, 60000);
};