/* =========================================================
   FORMAS DE PAGAMENTO
   - Opções que a cliente escolhe na sacola
   - Cálculo de desconto (Pix) e parcelas (crédito)
   Os valores (desconto, parcelas) ficam no js/config.js
   ========================================================= */

const FORMAS_PAGAMENTO = {
  pix: { nome: "Pix" },
  credito: { nome: "Cartão de crédito" },
  debito: { nome: "Cartão de débito" },
};

const Pagamento = {
  forma: null, // "pix" | "credito" | "debito"
  parcelas: 1,

  iniciar(aoMudar) {
    this.aoMudar = aoMudar;
    this.lista = document.getElementById("formasPagamento");
    this.seletorParcelas = document.getElementById("parcelas");

    this.lista.innerHTML = Object.entries(FORMAS_PAGAMENTO)
      .map(
        ([chave, f]) => `
        <button type="button" class="forma-btn" data-forma="${chave}">
          <span class="forma-nome">${f.nome}</span>
          ${chave === "pix" && CONFIG.descontoPix > 0 ? `<span class="forma-extra">${CONFIG.descontoPix}% off</span>` : ""}
          ${chave === "credito" && CONFIG.parcelasSemJuros > 1 ? `<span class="forma-extra">até ${CONFIG.parcelasSemJuros}x</span>` : ""}
        </button>`
      )
      .join("");

    this.lista.addEventListener("click", (e) => {
      const botao = e.target.closest("[data-forma]");
      if (!botao) return;
      this.forma = botao.dataset.forma;
      this.parcelas = 1;
      this.aoMudar();
    });

    this.seletorParcelas.addEventListener("change", () => {
      this.parcelas = Number(this.seletorParcelas.value);
      this.aoMudar();
    });

    this.preencherSecao();
  },

  maxParcelas(total) {
    const pelaRegraMinima = Math.floor(total / CONFIG.valorMinimoParcela);
    return Math.max(1, Math.min(CONFIG.parcelasSemJuros, pelaRegraMinima));
  },

  // Calcula subtotal, desconto e total da forma escolhida
  resumo(subtotal) {
    const desconto = this.forma === "pix" ? subtotal * (CONFIG.descontoPix / 100) : 0;
    const total = subtotal - desconto;
    const parcelas = this.forma === "credito" ? Math.min(this.parcelas, this.maxParcelas(total)) : 1;

    let descricao = this.forma ? FORMAS_PAGAMENTO[this.forma].nome : "";
    if (this.forma === "pix" && desconto > 0) descricao += ` (${CONFIG.descontoPix}% de desconto)`;
    if (this.forma === "credito") {
      descricao += parcelas > 1 ? ` em ${parcelas}x de ${formatarPreco(total / parcelas)} sem juros` : " à vista";
    }

    return { subtotal, desconto, total, parcelas, descricao };
  },

  // Atualiza os botões e a lista de parcelas na sacola
  atualizarTela(subtotal) {
    this.lista.querySelectorAll("[data-forma]").forEach((b) => {
      b.classList.toggle("selecionado", b.dataset.forma === this.forma);
    });

    const { total, parcelas } = this.resumo(subtotal);
    const max = this.maxParcelas(total);
    this.seletorParcelas.hidden = this.forma !== "credito";
    this.seletorParcelas.innerHTML = Array.from({ length: max }, (_, i) => {
      const n = i + 1;
      const texto = n === 1 ? `1x de ${formatarPreco(total)} (à vista)` : `${n}x de ${formatarPreco(total / n)} sem juros`;
      return `<option value="${n}" ${n === parcelas ? "selected" : ""}>${texto}</option>`;
    }).join("");
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
    if (credito) {
      credito.textContent =
        CONFIG.parcelasSemJuros > 1
          ? `Parcele em até ${CONFIG.parcelasSemJuros}x sem juros (parcela mínima de ${formatarPreco(CONFIG.valorMinimoParcela)}).`
          : "Pagamento à vista no cartão de crédito.";
    }
  },
};
