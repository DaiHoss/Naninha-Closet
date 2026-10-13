/* =========================================================
   JANELA DO PRODUTO
   Cliente escolhe modelo, tamanho, cor e quantidade.
   ========================================================= */

const ModalProduto = {
  produto: null,
  escolha: {},

  iniciar() {
    this.fundo = document.getElementById("modalProduto");

    this.fundo.addEventListener("click", (e) => {
      if (e.target === this.fundo || e.target.closest("[data-fechar]")) this.fechar();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.fechar();
    });

    document.getElementById("qtdMenos").addEventListener("click", () => this.alterarQuantidade(-1));
    document.getElementById("qtdMais").addEventListener("click", () => this.alterarQuantidade(1));
    document.getElementById("btnAdicionar").addEventListener("click", () => this.adicionarNaSacola());
    document.getElementById("btnComprarAgora").addEventListener("click", () => this.comprarAgora());

    // Cliques nas opções (modelo / tamanho / cor)
    ["opcoesModelo", "opcoesTamanho", "opcoesCor"].forEach((idLista) => {
      document.getElementById(idLista).addEventListener("click", (e) => {
        const botao = e.target.closest("[data-campo]");
        if (botao) this.escolher(botao.dataset.campo, botao.dataset.valor);
      });
    });
  },

  abrir(idProduto) {
    const produto = buscarProduto(idProduto);
    if (!produto) return;

    this.produto = produto;
    const temModelos = Array.isArray(produto.modelos) && produto.modelos.length > 0;

    // Se só houver uma opção, já deixa selecionada
    this.escolha = {
      modelo: temModelos && produto.modelos.length === 1 ? produto.modelos[0] : null,
      tamanho: produto.tamanhos.length === 1 ? produto.tamanhos[0] : null,
      cor: produto.cores.length === 1 ? produto.cores[0].nome : null,
      quantidade: 1,
    };

    document.getElementById("modalImagem").innerHTML = htmlImagemProduto(produto);
    document.getElementById("modalCategoria").textContent = produto.categoria;
    document.getElementById("modalNome").textContent = produto.nome;
    document.getElementById("modalPreco").textContent = formatarPreco(produto.preco);
    document.getElementById("modalDescricao").textContent = produto.descricao || "";

    document.getElementById("grupoModelo").style.display = temModelos ? "" : "none";
    document.getElementById("opcoesModelo").innerHTML = temModelos
      ? produto.modelos.map((m) => this.htmlOpcao("modelo", m)).join("")
      : "";

    document.getElementById("opcoesTamanho").innerHTML = produto.tamanhos
      .map((t) => this.htmlOpcao("tamanho", t))
      .join("");

    document.getElementById("opcoesCor").innerHTML = produto.cores
      .map(
        (c) =>
          `<button type="button" class="cor-btn" data-campo="cor" data-valor="${escaparHtml(c.nome)}" title="${escaparHtml(c.nome)}" aria-label="${escaparHtml(c.nome)}" style="background:${escaparHtml(c.hex)}"></button>`
      )
      .join("");

    this.atualizarTela();
    this.fundo.classList.add("aberto");
    this.fundo.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  },

  fechar() {
    this.fundo.classList.remove("aberto");
    this.fundo.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  },

  htmlOpcao(campo, valor) {
    return `<button type="button" class="opcao-btn" data-campo="${campo}" data-valor="${escaparHtml(valor)}">${escaparHtml(valor)}</button>`;
  },

  escolher(campo, valor) {
    this.escolha[campo] = valor;
    this.atualizarTela();
  },

  alterarQuantidade(delta) {
    this.escolha.quantidade = Math.max(1, this.escolha.quantidade + delta);
    this.atualizarTela();
  },

  atualizarTela() {
    const { modelo, tamanho, cor, quantidade } = this.escolha;

    document.getElementById("modeloEscolhido").textContent = modelo || "—";
    document.getElementById("tamanhoEscolhido").textContent = tamanho || "—";
    document.getElementById("corEscolhida").textContent = cor || "—";
    document.getElementById("qtdValor").textContent = quantidade;
    document.getElementById("modalAviso").textContent = "";

    this.fundo.querySelectorAll("[data-campo]").forEach((botao) => {
      botao.classList.toggle("selecionado", this.escolha[botao.dataset.campo] === botao.dataset.valor);
    });
  },

  // Confere se tudo foi escolhido; mostra aviso se faltar algo
  validar() {
    const faltando = [];
    if (this.produto.modelos?.length && !this.escolha.modelo) faltando.push("o modelo");
    if (!this.escolha.tamanho) faltando.push("o tamanho");
    if (!this.escolha.cor) faltando.push("a cor");

    if (faltando.length) {
      document.getElementById("modalAviso").textContent = `Escolha ${faltando.join(", ").replace(/, ([^,]*)$/, " e $1")} antes de continuar.`;
      return false;
    }
    return true;
  },

  itemAtual() {
    return {
      id: this.produto.id,
      modelo: this.escolha.modelo,
      tamanho: this.escolha.tamanho,
      cor: this.escolha.cor,
      quantidade: this.escolha.quantidade,
    };
  },

  adicionarNaSacola() {
    if (!this.validar()) return;
    Sacola.adicionar(this.itemAtual());
    this.fechar();
    mostrarAviso("Peça adicionada à sacola!");
  },

  // Coloca a peça na sacola e já abre a sacola para escolher o pagamento
  comprarAgora() {
    if (!this.validar()) return;
    Sacola.adicionar(this.itemAtual());
    this.fechar();
    Sacola.abrir();
  },
};
