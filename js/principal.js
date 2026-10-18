/* =========================================================
   PRINCIPAL - liga todas as partes quando a página carrega
   Cada parte é iniciada separadamente: se uma der erro,
   as outras (como a coleção) continuam funcionando.
   ========================================================= */

function iniciarParte(nome, funcao) {
  try {
    funcao();
  } catch (erro) {
    console.error(`Erro ao iniciar "${nome}":`, erro);
  }
}

// Textos que vêm do EDITAR-AQUI/textos.js
function preencherTextos() {
  const faixa = listaDeTextos(TEXTOS.faixa);
  if (faixa.length) {
    const itens = faixa.map((t) => `<span>${escaparHtml(t)}</span><span>✦</span>`).join("");
    document.getElementById("faixaTrilho").innerHTML = itens + itens; // repete para o texto correr sem falhas
  }

  const paragrafos = listaDeTextos(TEXTOS.sobreParagrafos);
  const vantagens = listaDeTextos(TEXTOS.sobreVantagens);
  document.getElementById("sobreTexto").innerHTML =
    `<h2>${escaparHtml(TEXTOS.sobreTitulo || "Sobre nós")}</h2>` +
    paragrafos.map((p) => `<p>${textoComNegrito(p)}</p>`).join("") +
    (vantagens.length ? `<ul class="vantagens">${vantagens.map((v) => `<li>${textoComNegrito(v)}</li>`).join("")}</ul>` : "");

  const passos = Array.isArray(TEXTOS.passos) ? TEXTOS.passos : [];
  document.getElementById("passos").innerHTML = passos
    .map(
      (passo, i) =>
        `<div class="passo" data-animar="subir" style="--atraso: ${i * 0.15}s"><span>${i + 1}</span><h3>${escaparHtml(passo.titulo || "")}</h3><p>${textoComNegrito(passo.texto || "")}</p></div>`
    )
    .join("");

  const regras = Array.isArray(TEXTOS.regrasTroca) ? TEXTOS.regrasTroca : [];
  document.getElementById("regrasTroca").innerHTML = regras
    .map((regra, i) => {
      const texto = String(regra.texto || "").replace(/\{prazo\}/g, CONFIG.prazoTrocaDias);
      return `<div class="regra"><span class="regra-num">${String(i + 1).padStart(2, "0")}</span><div><h3>${escaparHtml(regra.titulo || "")}</h3><p>${textoComNegrito(texto)}</p></div></div>`;
    })
    .join("");
}

quandoPronto(() => {
  iniciarParte("textos", () => {
    document.getElementById("bannerTitulo").textContent = CONFIG.bannerTitulo;
    document.getElementById("bannerDestaque").textContent = CONFIG.bannerDestaque;
    document.getElementById("bannerSubtitulo").textContent = CONFIG.bannerSubtitulo;
    document.getElementById("ano").textContent = new Date().getFullYear();
  });

  iniciarParte("textos do textos.js", preencherTextos);

  iniciarParte("links", () => {
    const saudacao = `Olá! Vim pelo site da ${CONFIG.nomeLoja} e gostaria de mais informações.`;
    document.getElementById("whatsappFlutuante").href = linkWhatsapp(saudacao);
    document.getElementById("linkWhatsappRodape").href = linkWhatsapp(saudacao);
    document.getElementById("inicioWhatsapp").href = linkWhatsapp(saudacao);

    const instagram = document.getElementById("linkInstagram");
    if (CONFIG.instagram) instagram.href = CONFIG.instagram;
    else instagram.remove();
  });

  iniciarParte("menu do celular", () => {
    const menu = document.getElementById("menu");
    document.getElementById("btnMenu").addEventListener("click", () => menu.classList.toggle("aberto"));
    menu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") menu.classList.remove("aberto");
    });
  });

  iniciarParte("animações", () => Animacoes.iniciar());
  iniciarParte("catálogo", () => Catalogo.iniciar());
  iniciarParte("sacola", () => Sacola.iniciar());
  iniciarParte("janela do produto", () => ModalProduto.iniciar());
  iniciarParte("trocas", () => Trocas.iniciar());
});
