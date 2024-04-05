const startButton = document.querySelector('.start-button');
const chapter = document.querySelector('#Chapter');
const mode = document.querySelector('#Mode');

startButton.addEventListener('click', () => {
    console.log("Start");
    window.localStorage.setItem('Chapter', chapter.value);
    window.localStorage.setItem('Mode', mode.value);
    window.location.href = './exam.html';
});


