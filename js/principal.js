/* =========================================================
   PRINCIPAL - liga todas as partes quando a página carrega
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Textos vindos do config.js
  document.getElementById("bannerTitulo").textContent = CONFIG.bannerTitulo;
  document.getElementById("bannerDestaque").textContent = CONFIG.bannerDestaque;
  document.getElementById("bannerSubtitulo").textContent = CONFIG.bannerSubtitulo;
  document.getElementById("ano").textContent = new Date().getFullYear();

  // Links de WhatsApp e Instagram
  const saudacao = `Olá! Vim pelo site da ${CONFIG.nomeLoja} e gostaria de mais informações.`;
  document.getElementById("whatsappFlutuante").href = linkWhatsapp(saudacao);
  document.getElementById("linkWhatsappRodape").href = linkWhatsapp(saudacao);
  document.getElementById("inicioWhatsapp").href = linkWhatsapp(saudacao);

  const instagram = document.getElementById("linkInstagram");
  if (CONFIG.instagram) instagram.href = CONFIG.instagram;
  else instagram.remove();

  // Menu do celular
  const menu = document.getElementById("menu");
  document.getElementById("btnMenu").addEventListener("click", () => menu.classList.toggle("aberto"));
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") menu.classList.remove("aberto");
  });

  Animacoes.iniciar();
  Sacola.iniciar();
  ModalProduto.iniciar();
  Catalogo.iniciar();
  Trocas.iniciar();
});
