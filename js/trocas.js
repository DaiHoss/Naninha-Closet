/* =========================================================
   TROCAS - formulário que envia a solicitação pelo WhatsApp
   O texto da política de trocas fica no EDITAR-AQUI/textos.js
   e o prazo no EDITAR-AQUI/configuracoes.js
   ========================================================= */

const Trocas = {
  iniciar() {
    const form = document.getElementById("formTroca");

    // Lista de peças vinda do catálogo
    const seletor = document.getElementById("trocaPeca");
    seletor.innerHTML =
      `<option value="">Selecione a peça</option>` +
      PRODUTOS.map((p) => `<option>${escaparHtml(p.nome)}</option>`).join("") +
      `<option>Outra peça</option>`;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Tira espaços sobrando e limita o tamanho de cada campo
      const dados = {};
      new FormData(form).forEach((valor, campo) => {
        dados[campo] = String(valor).trim().slice(0, 500);
      });
      if (!dados.nome) {
        mostrarAviso("Escreva o seu nome.");
        return;
      }
      if (!dados.motivo) {
        mostrarAviso("Escolha o motivo da troca.");
        return;
      }
      abrirWhatsapp(montarMensagemTroca(dados));
    });
  },
};
