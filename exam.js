const title = document.querySelector('title');
const chapter =  window.localStorage.getItem('Chapter');
title.innerText = chapter + "단원";

let data = {
    "1": {
        "廣範圍": "광범위",
        "資料": "자료"
    }
}


data = data[chapter];

const quizQuestion = document.querySelector('.quiz-question');
const quizAnswer = document.querySelector('.quiz-answer');

const onAnswered = () => {
    quizAnswer.value = "";
    const key = Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
    quizQuestion.innerText = key;
    quizAnswer.innerText = data[key];
}

quizAnswer.addEventListener('change', () => {
    if (quizAnswer.value === data[quizQuestion.innerText]) {
        onAnswered();
    }
})


onAnswered();

