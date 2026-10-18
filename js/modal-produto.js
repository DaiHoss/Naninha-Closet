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
      if (!this.fundo.classList.contains("aberto")) return;
      if (e.key === "Escape") this.fechar();
      if (e.key === "ArrowLeft") this.passarFoto(-1);
      if (e.key === "ArrowRight") this.passarFoto(1);
    });

    document.getElementById("qtdMenos").addEventListener("click", () => this.alterarQuantidade(-1));
    document.getElementById("qtdMais").addEventListener("click", () => this.alterarQuantidade(1));
    document.getElementById("btnAdicionar").addEventListener("click", () => this.adicionarNaSacola());
    document.getElementById("btnComprarAgora").addEventListener("click", () => this.comprarAgora());

    const galeria = document.getElementById("modalImagem");

    // Arrastar o dedo para o lado (celular) troca a foto
    galeria.addEventListener("touchstart", (e) => {
      this.toqueInicioX = e.touches[0].clientX;
    }, { passive: true });
    galeria.addEventListener("touchend", (e) => {
      const distancia = e.changedTouches[0].clientX - this.toqueInicioX;
      if (Math.abs(distancia) > 40) this.passarFoto(distancia < 0 ? 1 : -1);
    });

    // Cliques nas setas e nas miniaturas da galeria
    galeria.addEventListener("click", (e) => {
      const seta = e.target.closest("[data-seta]");
      if (seta) {
        this.passarFoto(Number(seta.dataset.seta));
        return;
      }
      const mini = e.target.closest("[data-foto]");
      if (!mini) return;
      // Se a foto for de uma cor, já seleciona a cor também
      const cor = this.produto.cores.find((c) => c.imagem === mini.dataset.foto);
      if (cor) this.escolher("cor", cor.nome);
      else this.mostrarFoto(mini.dataset.foto);
    });

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

    this.montarGaleria();
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

    document.getElementById("btnAdicionar").disabled = produto.esgotado;
    document.getElementById("btnComprarAgora").disabled = produto.esgotado;

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

  // Foto grande + miniaturas (capa, fotos de cada cor e fotos extras)
  montarGaleria() {
    const p = this.produto;
    const fotos = [p.imagem, ...p.cores.map((c) => c.imagem), ...(p.fotos || [])].filter(
      (src, i, lista) => src && lista.indexOf(src) === i
    );

    const miniaturas =
      fotos.length > 1
        ? `<div class="miniaturas">${fotos
            .map(
              (src) =>
                `<button type="button" class="miniatura" data-foto="${escaparHtml(src)}" aria-label="Ver foto"><img src="${escaparHtml(src)}" alt="" loading="lazy"></button>`
            )
            .join("")}</div>`
        : "";

    const setas =
      fotos.length > 1
        ? `<button type="button" class="seta-foto anterior" data-seta="-1" aria-label="Foto anterior">‹</button>
           <button type="button" class="seta-foto proxima" data-seta="1" aria-label="Próxima foto">›</button>`
        : "";

    this.fotos = fotos;
    document.getElementById("modalImagem").innerHTML = `<div class="foto-principal" id="fotoPrincipal"></div>${setas}${miniaturas}`;
    this.mostrarFoto(imagemDaCor(p, this.escolha.cor));
  },

  // direcao: -1 = anterior, 1 = próxima (volta ao início no fim da lista)
  passarFoto(direcao) {
    if (!this.fotos || this.fotos.length < 2) return;
    const total = this.fotos.length;
    this.indiceFoto = (this.indiceFoto + direcao + total) % total;
    this.mostrarFoto(this.fotos[this.indiceFoto]);
  },

  mostrarFoto(src) {
    const p = this.produto;
    this.indiceFoto = Math.max(0, (this.fotos || []).indexOf(src));
    document.getElementById("fotoPrincipal").innerHTML = `<img src="${escaparHtml(src)}" alt="${escaparHtml(p.nome)}" data-inicial="${escaparHtml(p.nome.charAt(0))}">`;
    document.querySelectorAll("#modalImagem .miniatura").forEach((m) => {
      m.classList.toggle("ativa", m.dataset.foto === src);
      // rola só a faixa de miniaturas para a foto atual ficar visível
      if (m.dataset.foto === src) {
        const faixa = m.parentElement;
        faixa.scrollTo({ left: m.offsetLeft - faixa.clientWidth / 2 + m.clientWidth / 2, behavior: "smooth" });
      }
    });
  },

  htmlOpcao(campo, valor) {
    return `<button type="button" class="opcao-btn" data-campo="${campo}" data-valor="${escaparHtml(valor)}">${escaparHtml(valor)}</button>`;
  },

  escolher(campo, valor) {
    this.escolha[campo] = valor;
    if (campo === "cor") this.mostrarFoto(imagemDaCor(this.produto, valor));
    this.atualizarTela();
  },

  alterarQuantidade(delta) {
    this.escolha.quantidade = Math.min(Sacola.quantidadeMaxima, Math.max(1, this.escolha.quantidade + delta));
    this.atualizarTela();
  },

  atualizarTela() {
    const { modelo, tamanho, cor, quantidade } = this.escolha;

    document.getElementById("modeloEscolhido").textContent = modelo || "—";
    document.getElementById("tamanhoEscolhido").textContent = tamanho || "—";
    document.getElementById("corEscolhida").textContent = cor || "—";
    document.getElementById("qtdValor").textContent = quantidade;
    document.getElementById("modalAviso").textContent = this.produto.esgotado ? "Peça esgotada no momento." : "";

    this.fundo.querySelectorAll("[data-campo]").forEach((botao) => {
      botao.classList.toggle("selecionado", this.escolha[botao.dataset.campo] === botao.dataset.valor);
    });
  },

  // Confere se tudo foi escolhido; mostra aviso se faltar algo
  validar() {
    if (this.produto.esgotado) return false;
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
