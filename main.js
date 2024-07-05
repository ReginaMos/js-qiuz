const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'),
    numberOfQuestion = document.getElementById('number-of-question'),
    numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion, indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker'); //обертка для трекера (три кругляша)
const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
    btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: "В каком литературном жанре писала Агата Кристи?",
        options: [ "Детектив", 
        "Фантастика",
        "Психологические триллеры",
        "Она не была писательницей",
        ],
        rightAnswer: 0
    },
    {
        question: "Какой роман стал первым в карьере А.Кристи?",
        options: [ "Убийство в восточном экспрессе", 
        "Загадка Эндхауза",
        "Таинственное происшествие в Стайлзе",
        "Десять негритят",
        ],
        rightAnswer: 2
    },
    {
        question: "Кем по национальности был Эркюль Пуаро?",
        options: [ "Француз", 
        "Бeльгиец",
        "Англичанин",
        "Американец",
        ],
        rightAnswer: 1
    }
];

numberOfAllQuestions.innerHTML= questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;
    //мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = ++indexOfPage;
}

let completedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
                load();
        }
    }

    completedAnswers.push(indexOfQuestion);
}

function NewsRotator() {
    $(".news").hide();
    $(".news" + newsIndex).show();
    
    var newsCount = 10;
    newsIndex++;
    if(newsIndex > newsCount) {
      newsIndex = 1;
    }
  }

const checkAnswer = el => {
    if(el.target.dataset.id ==questions[indexOfQuestion].rightAnswer) {
       el.target.classList.add('correct');
        updateAnswerTracker('correct');
        //el.target.classList.style.backgroundColor = green;
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

for(option of optionElements)
{
    option.addEventListener('click', e => checkAnswer(e))
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage-1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа')
    } else {
        randomQuestion();
        enableOptions();
    }
}

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);


