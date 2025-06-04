const quizQuestions = [
    {
        question: "Qual é a principal causa de enchentes urbanas?",
        answers: [
            { text: "Falta de árvores", correct: false },
            { text: "Sistemas de drenagem inadequados", correct: true },
            { text: "Excesso de vento", correct: false },
            { text: "Temperaturas altas", correct: false }
        ]
    },
    {
        question: "Qual API é usada para obter dados de elevação?",
        answers: [
            { text: "WeatherAPI", correct: false },
            { text: "Nominatim", correct: false },
            { text: "Open-Elevation", correct: true },
            { text: "Google Maps", correct: false }
        ]
    },
    {
        question: "Qual é o objetivo principal do nosso sistema?",
        answers: [
            { text: "Monitorar tráfego", correct: false },
            { text: "Prever alagamentos e oferecer rotas seguras", correct: true },
            { text: "Fornecer previsão do tempo", correct: false },
            { text: "Controlar sistemas de drenagem", correct: false }
        ]
    },
    {
        question: "Qual tecnologia é usada no backend?",
        answers: [
            { text: "Django", correct: false },
            { text: "Flask", correct: false },
            { text: "FastAPI", correct: true },
            { text: "Node.js", correct: false }
        ]
    },
    {
        question: "Quem é o público-alvo principal?",
        answers: [
            { text: "Agricultores", correct: false },
            { text: "Moradores de áreas de risco", correct: true },
            { text: "Estudantes", correct: false },
            { text: "Empresários", correct: false }
        ]
    },
    {
        question: "Qual benefício NÃO é oferecido pelo sistema?",
        answers: [
            { text: "Alertas em tempo real", correct: false },
            { text: "Rotas alternativas", correct: false },
            { text: "Controle remoto de comportas", correct: true },
            { text: "Redução de perdas materiais", correct: false }
        ]
    },
    {
        question: "Como o sistema ajuda os usuários?",
        answers: [
            { text: "Fornecendo interface intuitiva com alertas", correct: true },
            { text: "Vendendo equipamentos de proteção", correct: false },
            { text: "Construindo barreiras contra enchentes", correct: false },
            { text: "Treinando equipes de resgate", correct: false }
        ]
    },
    {
        question: "Qual banco de dados é utilizado?",
        answers: [
            { text: "MySQL", correct: false },
            { text: "PostgreSQL", correct: false },
            { text: "SQLite", correct: false },
            { text: "MongoDB Atlas", correct: true }
        ]
    },
    {
        question: "O que a API Nominatim fornece?",
        answers: [
            { text: "Dados meteorológicos", correct: false },
            { text: "Geocodificação de endereços", correct: true },
            { text: "Níveis de elevação", correct: false },
            { text: "Imagens de satélite", correct: false }
        ]
    },
    {
        question: "Qual é a maior vantagem do sistema?",
        answers: [
            { text: "Interface bonita", correct: false },
            { text: "Custo zero para o usuário", correct: false },
            { text: "Proteção de vidas", correct: true },
            { text: "Integração com redes sociais", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultsElement = document.getElementById('results');

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startQuiz() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion(quizQuestions[currentQuestionIndex]);
    } else {
        showResults();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (quizQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Reiniciar';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResults() {
    resetState();
    questionElement.innerText = '';
    resultsElement.innerHTML = `Você acertou ${score} de ${quizQuestions.length} perguntas!`;
    resultsElement.classList.remove('hide');
    startButton.innerText = 'Tentar novamente';
    startButton.classList.remove('hide');
}