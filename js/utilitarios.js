/* =========================================================
   FUNÇÕES DE APOIO usadas pelos outros arquivos
   ========================================================= */

// 129.9 -> "R$ 129,90"
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Evita que textos com < > & quebrem o HTML
function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buscarProduto(id) {
  return PRODUTOS.find((p) => p.id === id);
}

// Foto do produto na cor escolhida (se a cor tiver foto própria)
function imagemDaCor(produto, nomeCor) {
  const cor = produto.cores.find((c) => c.nome === nomeCor);
  return (cor && cor.imagem) || produto.imagem;
}

// Gera a <img> do produto. Se a foto não existir, mostra a inicial do nome.
function htmlImagemProduto(produto, nomeCor) {
  const src = imagemDaCor(produto, nomeCor);
  return `<img src="${escaparHtml(src)}" alt="${escaparHtml(produto.nome)}" loading="lazy" data-inicial="${escaparHtml(produto.nome.charAt(0))}">`;
}

document.addEventListener(
  "error",
  (evento) => {
    const img = evento.target;
    if (img.tagName === "IMG" && img.dataset.inicial) {
      const reserva = document.createElement("div");
      reserva.className = "sem-foto";
      reserva.textContent = img.dataset.inicial;
      img.replaceWith(reserva);
    }
  },
  true
);

// Mensagem rápida no rodapé da tela
let temporizadorAviso;
function mostrarAviso(texto) {
  const aviso = document.getElementById("avisoRapido");
  aviso.textContent = texto;
  aviso.classList.add("visivel");
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => aviso.classList.remove("visivel"), 2500);
}
