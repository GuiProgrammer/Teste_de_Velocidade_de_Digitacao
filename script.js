const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const reiniciar = document.querySelector("#reiniciar");
const resultado = document.querySelector("#resultado");
const historico = document.querySelector("#historico");
const alternarTema = document.querySelector("#alternarTema");

/* array de textos */
const textos = [
  "Exemplo de texto para digitar.",
  "Outro texto para ser digitado",
  "Digite aqui",
  "GuiProgrammer",
  "Escreva esse texto aqui"
];

function newText() {
  const index = Math.floor(Math.random() * textos.length); // Gerar textos aleatoriamente
  texto.textContent = textos[index];
}

function updateTest() {
  start();

  if (entrada.value === texto.textContent) {
    // Se o texto digitado for igual ao texto gerado
    verify();
  }
}

function start() {
  const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));

  if (!statusDoTeste) { // Se não estiver iniciado
    localStorage.setItem("tempoInicial", new Date().getTime());
    localStorage.setItem("testeEmAndamento", true); // A aplicação iniciará
  }
}

function verify() {
  const tempoFinal = new Date().getTime();
  const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
  const tempoGasto = (tempoFinal - tempoInicial) / 1000;

  resultado.textContent = `Parabéns! Você levou ${tempoGasto} segundos!`;

  adicionarAoHistorico(texto.textContent, tempoGasto);

  localStorage.setItem("testeEmAndamento", false);  // Parar teste
  entrada.value = "";
  newText();
}

function adicionarAoHistorico(textoDigitado, tempoGasto) {
  const itemHistorico = document.createElement("p");

  itemHistorico.textContent = `Texto "${textoDigitado}" - Tempo: ${tempoGasto}`;

  historico.appendChild(itemHistorico);
}

function reiniciarTeste() {
  entrada.value = "";
  resultado.textContent = "";
  newText();
  localStorage.setItem("testeEmAndamento", false);
  historico.innerHTML = "";
}

function alternar_Tema() {
  const body = document.body;

  body.classList.toggle("light");
  body.classList.toggle("dark");
}

entrada.addEventListener("keyup", updateTest);
reiniciar.addEventListener("click", reiniciarTeste);

alternarTema.addEventListener("click", alternar_Tema);
newText();
