/* =========================================================
   TROCAS - formulário que envia a solicitação pelo WhatsApp
   O texto da política de trocas fica no index.html
   (seção TROCAS) e o prazo no js/config.js
   ========================================================= */

const Trocas = {
  iniciar() {
    const form = document.getElementById("formTroca");

    // Prazo vindo do config.js
    document.querySelectorAll("[data-prazo-troca]").forEach((el) => {
      el.textContent = CONFIG.prazoTrocaDias;
    });

    // Lista de peças vinda do catálogo
    const seletor = document.getElementById("trocaPeca");
    seletor.innerHTML =
      `<option value="">Selecione a peça</option>` +
      PRODUTOS.map((p) => `<option>${escaparHtml(p.nome)}</option>`).join("") +
      `<option>Outra peça</option>`;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const dados = Object.fromEntries(new FormData(form));
      if (!dados.motivo) {
        mostrarAviso("Escolha o motivo da troca.");
        return;
      }
      window.open(linkWhatsapp(montarMensagemTroca(dados)), "_blank");
    });
  },
};
