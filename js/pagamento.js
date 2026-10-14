/* =========================================================
   FORMAS DE PAGAMENTO
   - Opções que a cliente escolhe na sacola
   - Desconto no Pix e aviso de juros no cartão de crédito
   Os textos e o desconto ficam no js/config.js
   ========================================================= */

const FORMAS_PAGAMENTO = {
  pix: { nome: "Pix" },
  credito: { nome: "Cartão de crédito" },
  debito: { nome: "Cartão de débito" },
};

const Pagamento = {
  forma: null, // "pix" | "credito" | "debito"

  iniciar(aoMudar) {
    this.aoMudar = aoMudar;
    this.lista = document.getElementById("formasPagamento");
    this.avisoCredito = document.getElementById("avisoCredito");

    this.lista.innerHTML = Object.entries(FORMAS_PAGAMENTO)
      .map(
        ([chave, f]) => `
        <button type="button" class="forma-btn" data-forma="${chave}">
          <span class="forma-nome">${f.nome}</span>
          ${chave === "pix" && CONFIG.descontoPix > 0 ? `<span class="forma-extra">${CONFIG.descontoPix}% off</span>` : ""}
          ${chave === "credito" ? `<span class="forma-extra">com juros</span>` : ""}
        </button>`
      )
      .join("");

    this.lista.addEventListener("click", (e) => {
      const botao = e.target.closest("[data-forma]");
      if (!botao) return;
      this.forma = botao.dataset.forma;
      this.aoMudar();
    });

    this.avisoCredito.textContent = CONFIG.avisoJurosCredito;
    this.preencherSecao();
  },

  // Calcula subtotal, desconto e total da forma escolhida
  resumo(subtotal) {
    const desconto = this.forma === "pix" ? subtotal * (CONFIG.descontoPix / 100) : 0;
    const total = subtotal - desconto;

    let descricao = this.forma ? FORMAS_PAGAMENTO[this.forma].nome : "";
    if (this.forma === "pix" && desconto > 0) descricao += ` (${CONFIG.descontoPix}% de desconto)`;
    if (this.forma === "credito") descricao += " (com acréscimo de juros)";

    return { subtotal, desconto, total, descricao, temJuros: this.forma === "credito" };
  },

  // Atualiza os botões e o aviso de juros na sacola
  atualizarTela() {
    this.lista.querySelectorAll("[data-forma]").forEach((b) => {
      b.classList.toggle("selecionado", b.dataset.forma === this.forma);
    });
    this.avisoCredito.hidden = this.forma !== "credito";
  },

  // Textos da seção "Formas de pagamento" da página
  preencherSecao() {
    const pix = document.getElementById("textoPix");
    const credito = document.getElementById("textoCredito");
    if (pix) {
      pix.textContent =
        CONFIG.descontoPix > 0
          ? `${CONFIG.descontoPix}% de desconto pagando no Pix. Aprovação na hora!`
          : "Pagamento instantâneo e aprovação na hora.";
    }
    if (credito) credito.textContent = CONFIG.avisoJurosCredito;
  },
};
