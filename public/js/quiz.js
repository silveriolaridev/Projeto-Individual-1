
const perguntas = [
    {
        pergunta: "Qual é o seu ambiente ideal para relaxar?",
        opcoes: ["Em uma festa com amigos", "Em casa, ouvindo algo tranquilo", "No meio da natureza, apreciando o silêncio", "Em um show ou concerto emocionante"],
        pontuacao: ['A', 'B', 'C', 'D']
    },
    {
        pergunta: "Como você prefere passar seu tempo livre?",
        opcoes: ["Dançando ou praticando algo ativo", "Lendo, assistindo séries ou meditando", "Criando algo, como arte ou escrita", "Explorando novos lugares ou experimentando algo diferente"],
        pontuacao: ['A', 'B', 'C', 'D']
    },
    {
        pergunta: "Qual frase mais se aproxima de você?",
        opcoes: ["Eu adoro ser o centro das atenções", "Prefiro momentos de calma e introspecção", "Sou uma pessoa criativa e cheia de ideias", "Gosto de aventura e de coisas fora do comum"],
        pontuacao: ['A', 'B', 'C', 'D']
    },
    {
        pergunta: "Qual desses instrumentos te atrai mais?",
        opcoes: ["Guitarra ou bateria", "Piano ou violino", "Violão ou instrumentos folclóricos", "Sintetizadores ou algo bem moderno"],
        pontuacao: ['A', 'B', 'C', 'D']
    },
    {
        pergunta: "Qual dessas cores mais combina com sua personalidade?",
        opcoes: ["Vermelho (intenso e vibrante)", "Azul (tranquilo e profundo)", "Verde (natural e criativo)", "Roxo (misterioso e inovador)"],
        pontuacao: ['A', 'B', 'C', 'D']
    },
    {
        pergunta: "Qual desses sentimentos você busca em uma música?",
        opcoes: ["Energia e animação", "Paz e equilíbrio", "Inspiração e conexão emocional", "Surpresa e originalidade"],
        pontuacao: ['A', 'B', 'C', 'D']
    },
    {
        pergunta: "Em qual desses cenários você gostaria de estar?",
        opcoes: ["Um festival lotado com muita música e dança", "Um concerto acústico em um teatro pequeno", "Uma roda de música ao redor de uma fogueira", "Um lounge futurista com músicas inovadoras"],
        pontuacao: ['A', 'B', 'C', 'D']
    },
    {
        pergunta: "Qual desses eventos é mais a sua cara?",
        opcoes: ["Uma festa animada até de madrugada", "Uma noite tranquila com amigos próximos", "Um evento cultural ou artístico", "Um show experimental com algo inesperado"],
        pontuacao: ['A', 'B', 'C', 'D']
    },
    {
        pergunta: "Qual é sua reação quando descobre uma música nova?",
        opcoes: ["Quero dançar e compartilhar com todo mundo!", "Adoro fechar os olhos e me perder nos sons", "Quero entender as letras e o significado", "Me empolgo com o ritmo ou a tecnologia usada"],
        pontuacao: ['A', 'B', 'C', 'D']
    },
    {
        pergunta: "Como você descreveria seu estilo de vida?",
        opcoes: ["Intenso e cheio de atividades", "Tranquilo e equilibrado", "Criativo e cheio de inspirações", "Único e cheio de surpresas"],
        pontuacao: ['A', 'B', 'C', 'D']
    }
];

const estilosMusicais = {
    energetico: "Estilos energéticos como Pop, Kpop, Eletrônica ou Funk.",
    tranquilo: "Estilos tranquilos como Clássica, Jazz ou Lo-Fi.",
    criativo: "Estilos criativos como Indie ou MPB.",
    unico: "Estilos únicos como Rock Alternativo ou Trap."
};


let pontuacao = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
};

let indicePerguntaAtual = 0;

function iniciarQuiz() {
    document.getElementById('botao-iniciar-quiz').style.display = 'none';
    mostrarPergunta();
}

function mostrarPergunta() {
    if (indicePerguntaAtual < perguntas.length) {
        const perguntaAtual = perguntas[indicePerguntaAtual];
        let opcoesAtuais = "";

        for ( i = 0; i < perguntaAtual.opcoes.length; i++) {
            opcoesAtuais += `
                <button onclick="responder('${perguntaAtual.pontuacao[i]}')">${perguntaAtual.opcoes[i]}</button>
            `;
        }

        document.getElementById('quiz-content').innerHTML = `
            <h3>${perguntaAtual.pergunta}</h3>
            <div>
                ${opcoesAtuais}
            </div>
        `;
    } else {
        mostrarResultado();
    }
}

function responder(pontuacaoEscolhida) {
    pontuacao[pontuacaoEscolhida]++;
    indicePerguntaAtual++;
    mostrarPergunta();
}

function mostrarResultado() {
    let estiloMusical = "";
    let maiorPontuacao = -1;

    const letras = ['A', 'B', 'C', 'D']; 

    for (let i = 0; i < letras.length; i++) {
        const letraAtual = letras[i];
        if (pontuacao[letraAtual] > maiorPontuacao) {
            maiorPontuacao = pontuacao[letraAtual];
            estiloMusical = letraAtual;
        }
    }

    let resultado = "";

    switch (estiloMusical) {
        case "A":
            resultado = estilosMusicais.energetico;
            break;
        case "B":
            resultado = estilosMusicais.tranquilo;
            break;
        case "C":
            resultado = estilosMusicais.criativo;
            break;
        case "D":
            resultado = estilosMusicais.unico;
            break;
    }

    fetch(`/quiz/gravarResultado/`, { method: "POST", headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        resultadoServer: resultado,
        usuarioServer: sessionStorage.ID_USUARIO
    })}).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log(`Resultado inserido com sucesso!`);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na inserção do resultado: ${error}`);
    });


    document.getElementById('quiz-content').innerHTML = `
        <h3>Resultado</h3>
        <p>${resultado}</p>
    `;
}