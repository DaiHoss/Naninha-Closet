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

document.addEventListener("DOMContentLoaded", () => {
  iniciarParte("textos", () => {
    document.getElementById("bannerTitulo").textContent = CONFIG.bannerTitulo;
    document.getElementById("bannerDestaque").textContent = CONFIG.bannerDestaque;
    document.getElementById("bannerSubtitulo").textContent = CONFIG.bannerSubtitulo;
    document.getElementById("ano").textContent = new Date().getFullYear();
  });

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
