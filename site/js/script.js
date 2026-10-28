// ===== Produtos =====
// Ícone de pão desenhado (o emoji 🍞 aparece como uma "caixa" no Windows)
const iconePao = `
  <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
    <path d="M6 22c0-8 6.5-13 14-13s14 5 14 13c0 4-2 7-5 7H11c-3 0-5-3-5-7z" fill="#d99a4e"/>
    <path d="M6 22c0-8 6.5-13 14-13s14 5 14 13c0 1-.2 2-.5 3C31 20 26 17 20 17S9 20 6.5 25C6.2 24 6 23 6 22z" fill="#b8742f"/>
    <path d="M14 14l3 5M20 12.5v5.5M26 14l-3 5" stroke="#fbe3b8" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

// "foto" é opcional: sem foto, o card mostra o ícone/emoji
// "posicao" ajusta qual parte da foto aparece no card (horizontal vertical)
const produtos = [
  { nome: "Pão Francês", categoria: "paes", foto: "img/fotos/pao-frances.jpg", emoji: "🥖", descricao: "Casquinha crocante, fresquinho o dia todo, direto do forno a lenha." },
  { nome: "Caramujo", categoria: "paes", foto: "img/fotos/caramujo.jpg", posicao: "50% 63%", emoji: iconePao, descricao: "Macio e enroladinho — aceita comer um caramujo com a gente?" },
  { nome: "Pão Careca", categoria: "paes", foto: "img/fotos/pao-careca.jpg", posicao: "50% 80%", emoji: iconePao, descricao: "A receita da felicidade: açúcar, carinho e um toque de Santo Antônio." },
  { nome: "Sonho", categoria: "doces", foto: "img/fotos/sonho.jpg", posicao: "50% 38%", emoji: "🍩", descricao: "Recheado e passado no açúcar. Tudo começa com um sonho." },
  { nome: "Donut de Chocolate", categoria: "doces", foto: "img/fotos/donut.jpg", emoji: "🍩", descricao: "Cobertura de chocolate e granulado colorido." },
  { nome: "Cookies", categoria: "doces", foto: "img/fotos/cookies.jpg", emoji: "🍪", descricao: "Com gotas de chocolate, feitos com paixão e carinho." },
  { nome: "Casquinha", categoria: "doces", foto: "img/fotos/casquinha.jpg", posicao: "50% 85%", emoji: "🍦", descricao: "Novidade! Chocolate, baunilha ou mista — por apenas R$&nbsp;5,00." },
  { nome: "Pão de Queijo", categoria: "quitandas", foto: "img/fotos/pao-de-queijo.jpg", emoji: "🧀", descricao: "O melhor pão de queijo: crocante por fora e puxa-puxa por dentro." },];

const nomesCategoria = { paes: "Pães", quitandas: "Quitandas", doces: "Doces" };
const grid = document.getElementById("productsGrid");

function renderProdutos(filtro = "todos") {
  const lista = filtro === "todos" ? produtos : produtos.filter(p => p.categoria === filtro);
  grid.innerHTML = lista.map((p, i) => `
    <article class="product${p.foto ? " product--foto" : ""}" style="animation-delay:${i * 60}ms">
      ${p.foto
        ? `<img class="product__img" src="${p.foto}" alt="${p.nome}" loading="lazy" style="object-position:${p.posicao || "center"}">`
        : `<div class="product__emoji" aria-hidden="true">${p.emoji}</div>`}
      <div class="product__body">
        <span class="product__tag">${nomesCategoria[p.categoria]}</span>
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
      </div>
    </article>
  `).join("");
}

document.querySelectorAll(".filter").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelector(".filter.is-active").classList.remove("is-active");
    botao.classList.add("is-active");
    renderProdutos(botao.dataset.filter);
  });
});

renderProdutos();

// ===== Menu mobile =====
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const aberto = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", aberto);
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Cabeçalho ao rolar + link ativo =====
const header = document.getElementById("header");
const secoes = document.querySelectorAll("main section[id]");

function aoRolar() {
  header.classList.toggle("is-scrolled", window.scrollY > 20);

  let atual = "";
  secoes.forEach(secao => {
    if (window.scrollY >= secao.offsetTop - 120) atual = secao.id;
  });
  nav.querySelectorAll("a").forEach(link => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${atual}`);
  });
}

window.addEventListener("scroll", aoRolar, { passive: true });
aoRolar();

// ===== Animação de entrada =====
const observer = new IntersectionObserver(entradas => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("is-visible");
      observer.unobserve(entrada.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ===== Galeria (lightbox) =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const fotosGaleria = [...document.querySelectorAll(".gallery__item")];
let fotoAtual = 0;

function abrirFoto(indice) {
  fotoAtual = (indice + fotosGaleria.length) % fotosGaleria.length;
  const item = fotosGaleria[fotoAtual];
  lightboxImg.src = item.dataset.full;
  lightboxImg.alt = item.querySelector("img").alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function fecharFoto() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

fotosGaleria.forEach((item, i) => item.addEventListener("click", () => abrirFoto(i)));
document.getElementById("lightboxClose").addEventListener("click", fecharFoto);
document.getElementById("lightboxPrev").addEventListener("click", () => abrirFoto(fotoAtual - 1));
document.getElementById("lightboxNext").addEventListener("click", () => abrirFoto(fotoAtual + 1));
lightbox.addEventListener("click", e => { if (e.target === lightbox) fecharFoto(); });

document.addEventListener("keydown", e => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") fecharFoto();
  if (e.key === "ArrowLeft") abrirFoto(fotoAtual - 1);
  if (e.key === "ArrowRight") abrirFoto(fotoAtual + 1);
});

// ===== Aviso "Hoje é dia!" do frango assado (só aos domingos) =====
if (new Date().getDay() === 0) {
  document.getElementById("sundayToday").hidden = false;
}

// ===== Anos de tradição =====
const anos = new Date().getFullYear() - 1920;
document.getElementById("anos").textContent = `${anos}`;
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Status (aberto/fechado) =====
// Preencha com os horários reais para ativar o aviso "Aberto agora".
// Formato: dia da semana (0 = domingo) -> [abre, fecha] em horas. Ex.: 1: [6, 19]
const horarios = {};

const status = document.getElementById("status");
const agora = new Date();
const hoje = horarios[agora.getDay()];
const hora = agora.getHours() + agora.getMinutes() / 60;

if (Object.keys(horarios).length === 0) {
  status.hidden = true;
} else if (hoje && hora >= hoje[0] && hora < hoje[1]) {
  status.textContent = `Aberto agora · até às ${hoje[1]}h`;
  status.classList.add("is-open");
} else {
  status.textContent = "Fechado no momento";
}
