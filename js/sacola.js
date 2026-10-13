/* =========================================================
   SACOLA (carrinho)
   Guarda os itens no navegador do cliente para não perder
   ao atualizar a página.
   ========================================================= */

const Sacola = {
  chaveArmazenamento: "naninha-sacola",
  itens: [],

  iniciar() {
    try {
      const salvo = JSON.parse(localStorage.getItem(this.chaveArmazenamento));
      // descarta itens de produtos que foram removidos do catálogo
      this.itens = Array.isArray(salvo) ? salvo.filter((i) => buscarProduto(i.id)) : [];
    } catch {
      this.itens = [];
    }

    document.getElementById("abrirSacola").addEventListener("click", () => this.abrir());
    document.getElementById("fecharSacola").addEventListener("click", () => this.fechar());
    document.getElementById("sacolaFundo").addEventListener("click", () => this.fechar());
    document.getElementById("btnLimpar").addEventListener("click", () => this.limpar());
    document.getElementById("btnFinalizar").addEventListener("click", () => this.finalizar());

    // Botões dentro da lista (+, −, remover)
    document.getElementById("sacolaItens").addEventListener("click", (e) => {
      const botao = e.target.closest("[data-acao]");
      if (!botao) return;
      const indice = Number(botao.dataset.indice);
      if (botao.dataset.acao === "mais") this.alterarQuantidade(indice, 1);
      if (botao.dataset.acao === "menos") this.alterarQuantidade(indice, -1);
      if (botao.dataset.acao === "remover") this.remover(indice);
    });

    Pagamento.iniciar(() => this.atualizar());
    this.atualizar();
  },

  salvar() {
    try {
      localStorage.setItem(this.chaveArmazenamento, JSON.stringify(this.itens));
    } catch {
      /* navegador sem armazenamento: a sacola funciona só até fechar a página */
    }
  },

  adicionar(novo) {
    const existente = this.itens.find(
      (i) => i.id === novo.id && i.modelo === novo.modelo && i.tamanho === novo.tamanho && i.cor === novo.cor
    );
    if (existente) {
      existente.quantidade += novo.quantidade;
    } else {
      this.itens.push({ ...novo });
    }
    this.atualizar();

    const icone = document.getElementById("abrirSacola");
    icone.classList.remove("pulou");
    void icone.offsetWidth; // reinicia a animação
    icone.classList.add("pulou");
  },

  alterarQuantidade(indice, delta) {
    const item = this.itens[indice];
    if (!item) return;
    item.quantidade += delta;
    if (item.quantidade < 1) {
      this.remover(indice);
      return;
    }
    this.atualizar();
  },

  remover(indice) {
    this.itens.splice(indice, 1);
    this.atualizar();
  },

  limpar() {
    this.itens = [];
    this.atualizar();
  },

  subtotal() {
    return this.itens.reduce((soma, i) => soma + buscarProduto(i.id).preco * i.quantidade, 0);
  },

  finalizar() {
    if (!this.itens.length) {
      mostrarAviso("Sua sacola está vazia.");
      return;
    }
    if (!Pagamento.forma) {
      document.getElementById("sacolaAviso").textContent = "Escolha a forma de pagamento.";
      const formas = document.getElementById("formasPagamento");
      formas.classList.remove("chamar-atencao");
      void formas.offsetWidth; // reinicia a animação
      formas.classList.add("chamar-atencao");
      return;
    }
    enviarPedidoWhatsapp(this.itens, Pagamento.resumo(this.subtotal()));
  },

  abrir() {
    document.getElementById("sacola").classList.add("aberto");
    document.getElementById("sacolaFundo").classList.add("aberto");
  },

  fechar() {
    document.getElementById("sacola").classList.remove("aberto");
    document.getElementById("sacolaFundo").classList.remove("aberto");
  },

  atualizar() {
    this.salvar();

    const quantidadeTotal = this.itens.reduce((soma, i) => soma + i.quantidade, 0);
    document.getElementById("contadorSacola").textContent = quantidadeTotal;
    const resumo = Pagamento.resumo(this.subtotal());
    document.getElementById("sacolaSubtotal").textContent = formatarPreco(resumo.subtotal);
    document.getElementById("sacolaDesconto").textContent = `- ${formatarPreco(resumo.desconto)}`;
    document.getElementById("linhaDesconto").hidden = resumo.desconto <= 0;
    document.getElementById("sacolaTotal").textContent = formatarPreco(resumo.total);
    document.getElementById("sacolaAviso").textContent = "";
    document.getElementById("btnFinalizar").disabled = !this.itens.length;
    Pagamento.atualizarTela(resumo.subtotal);

    const lista = document.getElementById("sacolaItens");
    if (!this.itens.length) {
      lista.innerHTML = `<p class="sacola-vazia">Sua sacola está vazia.</p>`;
      return;
    }

    lista.innerHTML = this.itens
      .map((item, indice) => {
        const produto = buscarProduto(item.id);
        const detalhes = [item.modelo, `Tam. ${item.tamanho}`, item.cor].filter(Boolean).map(escaparHtml).join(" · ");
        return `
          <div class="item-sacola">
            <div class="item-sacola-img">${htmlImagemProduto(produto)}</div>
            <div>
              <h4>${escaparHtml(produto.nome)}</h4>
              <p class="item-sacola-detalhes">${detalhes}</p>
              <p class="item-sacola-preco">${formatarPreco(produto.preco * item.quantidade)}</p>
            </div>
            <div class="item-sacola-acoes">
              <button class="remover" data-acao="remover" data-indice="${indice}">Remover</button>
              <div class="quantidade">
                <button data-acao="menos" data-indice="${indice}" aria-label="Diminuir">−</button>
                <span>${item.quantidade}</span>
                <button data-acao="mais" data-indice="${indice}" aria-label="Aumentar">+</button>
              </div>
            </div>
          </div>`;
      })
      .join("");
  },
};
