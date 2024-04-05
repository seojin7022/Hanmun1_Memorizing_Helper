const startButton = document.querySelector('.start-button');
const chapter = document.querySelector('#Chapter');

startButton.addEventListener('click', () => {
    console.log("Start");
    window.localStorage.setItem('Chapter', chapter.value);
    window.location.href = './exam.html';
});


