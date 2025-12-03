	// ======= JavaScript para Slider =======

/* Variável global para controlar o índice do slide atual */
let slideIndex = 0;

/* Função para pegar todos os elementos de slides */
const slides = () => document.getElementsByClassName("meuSlide"); 
/* <- Adicionada função para facilitar reutilização em múltiplos lugares */

/* Função para pegar todos os pontos (dots) de navegação */
const dots = () => document.getElementsByClassName("dot"); 
/* <- Adicionada função para facilitar manipulação dos pontos */

function mostrarSlides() {
  const s = slides(); // obtém todos os slides
  const d = dots();   // obtém todos os pontos

  if (s.length === 0) return; // evita erro caso não haja slides

  /* Esconde todos os slides antes de mostrar o próximo */
  for (let i = 0; i < s.length; i++) s[i].style.display = "none"; 
  /* <- Loop adicionado para ocultar slides */

  /* Remove classe 'active' de todos os pontos */
  for (let i = 0; i < d.length; i++) d[i].className = d[i].className.replace(" active", "");
  /* <- Loop adicionado para resetar classe ativa nos dots */

  slideIndex++; // incrementa índice do slide
  if (slideIndex > s.length) slideIndex = 1; // volta ao primeiro slide se passar do último

  s[slideIndex - 1].style.display = "block"; // mostra slide atual
  if (d[slideIndex - 1]) d[slideIndex - 1].className += " active"; // ativa dot correspondente

  /* Timer para passar automaticamente para o próximo slide a cada 10 segundos */
  window.slideTimer = setTimeout(mostrarSlides, 10000); 
  /* <- Adicionado para controle automático do slider */
}

/* Inicializa o slider quando o DOM estiver pronto */
document.addEventListener("DOMContentLoaded", function () {
  const s = slides();
  if (s.length > 0) {
    slideIndex = 0; // inicializa índice
    mostrarSlides(); // mostra primeiro slide imediatamente
  }

  /* Função global para avançar ou voltar slides manualmente */
  window.maisSlide = function (n) {
    clearTimeout(window.slideTimer); // para temporizador automático ao clicar
    slideIndex += n;
    if (slideIndex < 1) slideIndex = document.getElementsByClassName("meuSlide").length;
    if (slideIndex > document.getElementsByClassName("meuSlide").length) slideIndex = 1;
    mostrarSlideManual(slideIndex); // mostra slide manualmente
  };

  /* Função global para selecionar slide específico ao clicar no dot */
  window.slideAtual = function (n) {
    clearTimeout(window.slideTimer); // para temporizador automático
    mostrarSlideManual(slideIndex = n); // mostra slide selecionado
  };

  /* Player de áudio mínimo - comentários indicam que pode ser adaptado se houver <audio> */
});

/* Função para mostrar slide manualmente (usada por botões e dots) */
function mostrarSlideManual(n) {
  const s = document.getElementsByClassName("meuSlide");
  const d = document.getElementsByClassName("dot");
  if (s.length === 0) return;

  /* Esconde todos os slides */
  for (let i = 0; i < s.length; i++) s[i].style.display = "none";

  /* Remove classe 'active' de todos os pontos */
  for (let i = 0; i < d.length; i++) d[i].className = d[i].className.replace(" active", "");

  /* Calcula índice correto e mostra slide */
  const index = (n - 1 + s.length) % s.length;
  s[index].style.display = "block";
  if (d[index]) d[index].className += " active";

  /* Reinicia o temporizador automático para não quebrar o fluxo */
  clearTimeout(window.slideTimer);
  window.slideTimer = setTimeout(mostrarSlides, 10000);
}