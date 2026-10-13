/* =========================================================
   ANIMAÇÕES
   - Faz os elementos com data-animar aparecerem ao rolar
   - Barra de progresso e cabeçalho que encolhe
   - Efeito de profundidade (parallax) no topo:
       data-parallax="0.1"  -> move ao rolar a página
       data-mouse="12"      -> acompanha o movimento do mouse
   ========================================================= */

const Animacoes = {
  movimentoReduzido: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  observador: null,

  iniciar() {
    this.cabecalho = document.getElementById("cabecalho");
    this.barra = document.getElementById("barraProgresso");
    this.parallax = [...document.querySelectorAll("[data-parallax]")];

    window.addEventListener("scroll", () => this.aoRolar(), { passive: true });
    this.aoRolar();

    if (this.movimentoReduzido || !("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("com-animacao");

    this.observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            this.observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    this.observar(document);

    this.seguirMouse();
  },

  // Chamado também pelo catálogo quando os cards são redesenhados
  observar(raiz) {
    if (!this.observador) return;
    raiz.querySelectorAll("[data-animar]:not(.visivel)").forEach((el) => this.observador.observe(el));
  },

  aoRolar() {
    if (this.agendado) return;
    this.agendado = true;

    requestAnimationFrame(() => {
      this.agendado = false;
      const rolado = window.scrollY;
      const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;

      this.cabecalho.classList.toggle("rolado", rolado > 20);
      this.barra.style.transform = `scaleX(${alturaTotal > 0 ? rolado / alturaTotal : 0})`;

      if (this.movimentoReduzido) return;
      this.parallax.forEach((el) => {
        el.style.translate = `0 ${rolado * Number(el.dataset.parallax)}px`;
      });
    });
  },

  seguirMouse() {
    const area = document.getElementById("inicio");
    const elementos = [...area.querySelectorAll("[data-mouse]")];
    if (!elementos.length || window.matchMedia("(hover: none)").matches) return;

    area.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      elementos.forEach((el) => {
        const forca = Number(el.dataset.mouse);
        el.style.translate = `${x * forca}px ${y * forca}px`;
      });
    });

    area.addEventListener("mouseleave", () => {
      elementos.forEach((el) => (el.style.translate = "0 0"));
    });
  },
};
