const title = document.querySelector('title');
const chapter =  window.localStorage.getItem('Chapter');
const mode =  window.localStorage.getItem('Mode');
const topTitle = document.querySelector('#app h1');
const backButton = document.querySelector('.back');
title.innerText = chapter + "단원 " + mode;
topTitle.innerText = chapter + "단원 " + mode;

let data = {
    "1": {
        "廣範圍": "광범위",
        "資料": "자료"
    }
}

let voca = {
    "1": {

        "廣": "넓을 광",
        "範": "법 범",
        "圍": "에워쌀 위",
        "資": "재물 자",
        "料": "헤아릴 료(요)"

    }
}


data = data[chapter];
voca = voca[chapter]

const quizQuestion = document.querySelector('.quiz-question');
const quizAnswer = document.querySelector('.quiz-answer');
const quizSelect = document.querySelector('.quiz-select');
const quizSelectButtons = document.querySelectorAll('.quiz-select button');
const quizCount = document.querySelector('.quiz-count');

if (mode === "어휘" || mode === "객관식") {
    quizSelect.classList.remove("hide");

    if (mode === "객관식")
    {
        voca = data;
    }
    let key = "";
    const usedKeys = [];

    let count = 0;
    quizCount.innerText = count.toString() + " / " + voca.length.toString();

    const onAnswered = () => {
        count++;
        if (count > voca.length)
        {
            return;
        }
        quizCount.innerText = count.toString() + " / " + voca.length.toString();
        key = Object.keys(voca)[Math.floor(Math.random() * Object.keys(voca).length)];
        while (usedKeys.includes(key)) {
            key = Object.keys(voca)[Math.floor(Math.random() * Object.keys(voca).length)];
        }
        usedKeys.push(key);
        quizQuestion.innerText = key;
        let answers = [voca[key]];
        while (answers.length < 4) {
            const randomKey = Object.keys(voca)[Math.floor(Math.random() * Object.keys(voca).length)];
            const randomValue = voca[randomKey];
            if (!answers.includes(randomValue)) {
                answers.push(randomValue);
            }
        }
        answers.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 4; i++) {
            quizSelectButtons[i].innerText = answers[i];            
        }
    }

    quizSelectButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            if (button.innerText === voca[key] && event.target == button) {
                onAnswered();
            }
        })
    })

    onAnswered();
}
else if (mode === "주관식") {
    quizAnswer.classList.remove("hide");

    let count = 0;
    quizCount.innerText = count.toString() + " / " + data.length.toString();

    const onAnswered = () => {
        count++;
        if (count > data.length)
        {
            return;
        }
        quizCount.innerText = count.toString() + " / " + data.length.toString();
        quizAnswer.value = "";
        const key = Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
        quizQuestion.innerText = key;
        quizAnswer.innerText = data[key];
    }
    
    quizAnswer.addEventListener('keydown', (event) => {
        if (event.key === "Enter" && quizAnswer.value === data[quizQuestion.innerText]) {
            onAnswered();
        }
    })
    
    
    onAnswered();
}


backButton.addEventListener('click', () => {
    window.location.href = "index.html";
})


