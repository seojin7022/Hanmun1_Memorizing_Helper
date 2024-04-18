const title = document.querySelector('title');
const chapter =  window.localStorage.getItem('Chapter');
const mode =  window.localStorage.getItem('Mode');
const topTitle = document.querySelector('#app h1');
const backButton = document.querySelector('.back');
const quizAnswerForm = document.querySelector('.quiz-answer-form');
title.innerText = chapter + "단원 " + mode;
topTitle.innerText = chapter + "단원 " + mode;

let data = {
    "1": {
        "廣範圍": "광범위",
        "資料": "자료",
        "龜鑑": "귀감",
        "記錄": "기록",
        "價値觀": "가치관",
        "繼承": "계승",
        "漢字": "한자",
        "擔當": "담당",
        "相互": "상호",
        "役割" : "역할",
        "門外漢" : "문외한",
        "於此彼": "어차피",
        "無難": "무난",
        "人造": "인조",
        "卒業": "졸업",
        "歸家": "귀가",
        "徐行" :"서행",
        "緩急": "완급",
        "終了": "종료",
        "夜深": "야심",
        "心醉": "심취",
        "讀書": "독서",
        "拔本": "발본",
        "沈水": "침수",
        "難解": "난해",
        "愛國": "애국",
        "強風": "강풍",
        "鹽田": "염전",
        "伸縮": "신축",
        "倉庫": "창고",
    }
}

let voca = {
    "1": {

        "廣": "넓을 광",
        "範": "법 범",
        "圍": "에워쌀 위",
        "資": "재물 자",
        "料": "헤아릴 료(요)",
        "龜": "본뜰 귀, 거북 구, 터질 균",
        "鑑": "거울 감",
        "記": "기록할 기",
        "錄": "기록할 록(녹)",
        "價": "값 가",
        "値": "값 치",
        "觀": "볼 관",
        "繼": "이을 계",
        "承": "이을 승",
        "漢": "한나라 한",
        "字": "글자 자",
        "擔": "멜 담",
        "當": "마땅 당",
        "相" : "서로 상",
        "互": "서로 호",
        "役" :  "부릴 역",
        "割": "벨 할",
        "門" : "문 문",
        "外": "바깥 외",
        "於": "어조사 어",
        "此": "이 차",
        "彼": "저 피",
        "無": "없을 무",
        "難": "어려울 난",
        "人": "사람 인",
        "造": "만들 조",
        "卒": "마칠 졸",
        "業": "업 업",
        "歸": "돌아갈 귀",
        "家": "집 가",
        "徐": "천천히 서",
        "行": "갈 행",
        "緩": "느릴 완",
        "急": "급할 급",
        "終": "마칠 종",
        "了": "마칠 료(요)",
        "夜": "밤 야",
        "深": "깊을 심",
        "心": "마음 심",
        "醉": "취할 취",
        "讀": "읽을 독",
        "書": "글 서",
        "拔": "뽑을 발",
        "本": "근본 본",
        "沈": "잠길 침",
        "水": "물 수",
        "解": "풀 해",
        "愛": "사랑 애",
        "國": "나라 국",
        "強": "강할 강",
        "風": "바람 풍",
        "鹽": "소금 염",
        "伸": "펼 신",
        "縮": "줄일 축",
        "倉": "창고 창",
        "庫": "곳집 고",
    }
}


data = data[chapter];
voca = voca[chapter];

const quizQuestion = document.querySelector('.quiz-question');
const quizAnswer = document.querySelector('.quiz-answer');
const quizSelect = document.querySelector('.quiz-select');
const quizSelectButtons = document.querySelectorAll('.quiz-select button');
const quizCount = document.querySelector('.quiz-count');
const quizContainer = document.querySelector('.quiz');
const resultMessage = document.querySelector('.result-message');
const resultInfo = document.querySelector('.result-info');
const resultInfoWrong = document.querySelector('.result-info .wrong-answer');
const successMessage = document.querySelector('.success-message');

const wrongAnswer = [];
const correctAnswer = [];

const quizEnd = () => {
    quizContainer.classList.add("hide");
    quizCount.classList.add("hide");
    resultMessage.classList.remove("hide");
    resultInfo.classList.remove("hide");
    if (wrongAnswer.length === 0)
    {
        console.log("HHH");
        successMessage.classList.remove('hide');
    }
    else {
        wrongAnswer.forEach((ans) => {
            const li = document.createElement("li");
            li.innerHTML = ans['key'] + ": " + ans['correctAnswer'] + "  (오답: " + ans['wrongAnswer'] + ")";
            resultInfoWrong.append(li);
        })
    }
}

let available = false;

if (mode === "어휘" || mode === "객관식") {
    quizSelect.classList.remove("hide");

    if (mode === "객관식")
    {
        voca = data;
    }
    let key = "";
    const usedKeys = [];

    let count = 0;
    quizCount.innerText = count.toString() + " / " + Object.keys(voca).length.toString();

    const onAnswered = () => {
        count++;
        if (count > Object.keys(voca).length)
        {
            quizEnd();
            return;
        }
        quizCount.innerText = count.toString() + " / " + Object.keys(voca).length.toString();

        quizSelectButtons.forEach((button) => {
            button.classList.remove('wrong');
        })

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

        available = true;
    }

    quizSelectButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            if (available)
            {
                if (button.innerText === voca[key] && event.target == button) {
                    button.classList.add("correct");
                    setTimeout(() => button.classList.remove("correct"), 1000);
                    setTimeout(onAnswered, 1000);
                    available = false
                }
                else if (button.innerText != voca[key] && event.target == button && !button.classList.contains('wrong'))
                {
                    button.classList.add("wrong");
                    if (wrongAnswer.find((value) => value['key'] == key))
                    {
                        wrongAnswer.find((value) => value['key'] == key)['wrongAnswer'].push(button.innerText);
                    }
                    else {
                        wrongAnswer.push({key: key, correctAnswer: voca[key], wrongAnswer: [button.innerText]});
                    }
                    
                }
            }
            
        })
    })

    onAnswered();
}
else if (mode === "주관식") {
    quizAnswer.classList.remove("hide");

    const usedKeys = [];

    let key = "";
    let count = 0;
    quizCount.innerText = count.toString() + " / " + Object.keys(data).length.toString();

    const onAnswered = () => {
        count++;
        if (count > Object.keys(data).length)
        {
            quizEnd();
            return;
        }
        quizCount.innerText = count.toString() + " / " + Object.keys(data).length.toString();
        quizAnswer.value = "";
        key = Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
        while (usedKeys.includes(key)) {
            key = Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
        }
        usedKeys.push(key);
        quizQuestion.innerText = key;
        quizAnswer.innerText = data[key];
        quizAnswer.disabled = false;
        quizAnswer.focus();
    }
    
    quizAnswerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!quizAnswer.disabled)
        {
            if (quizAnswer.value === data[quizQuestion.innerText]) {
                quizAnswer.disabled = true;
                quizAnswer.classList.add('correct');
                setTimeout(() => quizAnswer.classList.remove('correct'), 1000);
                setTimeout(onAnswered, 1000);
            }
            else if (quizAnswer.value != data[quizQuestion.innerText] && !quizAnswer.classList.contains('wrong')) {
                quizAnswer.disabled = true;
                quizAnswer.classList.add('wrong');
                setTimeout(() => {
                    quizAnswer.classList.remove('wrong');
                    quizAnswer.disabled = false;
                    quizAnswer.focus();
                }, 1000);
                if (wrongAnswer.find((value) => value['key'] == key))
                {
                    console.log("Wrong");
                    wrongAnswer.find((value) => value['key'] == key)['wrongAnswer'].push(quizAnswer.value);
                }
                else 
                {
                    console.log("Wrong");
                    wrongAnswer.push({key: key, correctAnswer: data[key], wrongAnswer: [quizAnswer.value]});
                }

            }
        }
        
    })
    
    
    onAnswered();
}


backButton.addEventListener('click', () => {
    window.location.href = "index.html";
})