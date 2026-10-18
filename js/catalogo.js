/* =========================================================
   CATÁLOGO - cria os filtros e os cards de produto
   Os produtos vêm do arquivo EDITAR-AQUI/produtos.js
   ========================================================= */

const Catalogo = {
  categoriaAtiva: "Todos",

  iniciar() {
    this.filtros = document.getElementById("filtros");
    this.grade = document.getElementById("gradeProdutos");

    this.filtros.addEventListener("click", (e) => {
      const botao = e.target.closest("[data-categoria]");
      if (!botao) return;
      this.categoriaAtiva = botao.dataset.categoria;
      this.desenharFiltros();
      this.desenharProdutos();
    });

    this.grade.addEventListener("click", (e) => {
      const card = e.target.closest("[data-produto]");
      if (card) ModalProduto.abrir(card.dataset.produto);
    });

    this.grade.addEventListener("keydown", (e) => {
      const card = e.target.closest("[data-produto]");
      if (card && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        ModalProduto.abrir(card.dataset.produto);
      }
    });

    this.desenharFiltros();
    this.desenharProdutos();
  },

  desenharFiltros() {
    this.filtros.innerHTML = ["Todos", ...CATEGORIAS]
      .map(
        (cat) =>
          `<button class="filtro ${cat === this.categoriaAtiva ? "ativo" : ""}" data-categoria="${escaparHtml(cat)}">${escaparHtml(cat)}</button>`
      )
      .join("");
  },

  desenharProdutos() {
    const lista =
      this.categoriaAtiva === "Todos" ? PRODUTOS : PRODUTOS.filter((p) => p.categoria === this.categoriaAtiva);

    if (!lista.length) {
      this.grade.innerHTML = `<p class="catalogo-vazio">Em breve novidades nesta categoria.</p>`;
      return;
    }

    this.grade.innerHTML = lista
      .map(
        (p, indice) => `
        <div data-animar="subir" style="--atraso: ${(indice % 4) * 0.1}s">
        <article class="card" data-produto="${escaparHtml(p.id)}" tabindex="0">
          <div class="card-imagem">
            ${htmlImagemProduto(p)}
            ${p.esgotado ? `<span class="etiqueta esgotado">Esgotado</span>` : p.destaque ? `<span class="etiqueta">Novidade</span>` : ""}
            <span class="card-acao">Escolher opções</span>
          </div>
          <div class="card-info">
            <p class="card-categoria">${escaparHtml(p.categoria)}</p>
            <h3 class="card-nome">${escaparHtml(p.nome)}</h3>
            <div class="card-rodape">
              <span class="card-preco">${formatarPreco(p.preco)}</span>
              <span class="card-cores">
                ${p.cores.map((c) => `<span style="background:${escaparHtml(c.hex)}" title="${escaparHtml(c.nome)}"></span>`).join("")}
              </span>
            </div>
          </div>
        </article>
        </div>`
      )
      .join("");

    Animacoes.observar(this.grade);
  },
};
