/* =========================================================
   VERIFICAR - confere os arquivos da pasta EDITAR-AQUI
   ---------------------------------------------------------
   - Se um arquivo tiver erro de digitação, o site continua
     funcionando (com o que der para aproveitar).
   - Produto com informação errada não aparece no site.
   - Os avisos aparecem no Console (F12) e, quando o site é
     aberto no próprio computador, numa caixa vermelha no topo.
   ========================================================= */

const AVISOS_DA_LOJA = [];

function avisarDono(texto) {
  AVISOS_DA_LOJA.push(texto);
  console.warn(`[Naninha Closet] ${texto}`);
}

const PASTA_FOTOS = "EDITAR-AQUI/fotos-produtos/";

// Aceita só fotos que estão dentro do site (nada de links externos ou "..")
function caminhoFoto(caminho, onde) {
  if (caminho === undefined || caminho === null || caminho === "") return "";
  if (typeof caminho !== "string" || caminho.includes("..") || caminho.includes(":") || caminho.startsWith("/") || caminho.includes("\\")) {
    avisarDono(`${onde}: o caminho da foto "${caminho}" não é válido. Use só o nome da foto dentro de ${PASTA_FOTOS}`);
    return "";
  }
  if (caminho.startsWith("EDITAR-AQUI/") || caminho.startsWith("img/")) return caminho;
  return PASTA_FOTOS + caminho;
}

function listaDeTextos(valor) {
  return Array.isArray(valor) ? valor.filter((v) => typeof v === "string" || typeof v === "number").map(String) : [];
}

/* ---------- Arquivos que não carregaram ---------- */
(window.ARQUIVOS_COM_ERRO || []).forEach((caminho) => avisarDono(`O arquivo ${caminho} não foi encontrado.`));

/* ---------- configuracoes.js ---------- */
const CONFIG_PADRAO = {
  nomeLoja: "Naninha Closet",
  whatsapp: "",
  instagram: "",
  bannerTitulo: "",
  bannerDestaque: "",
  bannerSubtitulo: "",
  saudacaoPedido: "Olá! Gostaria de fazer o seguinte pedido:",
  descontoPix: 0,
  avisoJurosCredito: "Pagamento com acréscimo de juros da maquininha.",
  prazoTrocaDias: 7,
};

if (typeof CONFIG === "undefined" || !CONFIG || typeof CONFIG !== "object") {
  avisarDono("O arquivo EDITAR-AQUI/configuracoes.js tem um erro (confira aspas e vírgulas).");
  window.CONFIG = {};
}
CONFIG = Object.assign({}, CONFIG_PADRAO, CONFIG);

Object.keys(CONFIG_PADRAO).forEach((campo) => {
  if (typeof CONFIG_PADRAO[campo] === "string" && typeof CONFIG[campo] !== "string") CONFIG[campo] = String(CONFIG[campo] ?? "");
});

CONFIG.whatsapp = CONFIG.whatsapp.replace(/\D/g, "");
if (CONFIG.whatsapp.length < 12 || CONFIG.whatsapp.length > 13) {
  avisarDono(`configuracoes.js: o WhatsApp "${CONFIG.whatsapp}" parece errado. Use 55 + DDD + número, só números.`);
}

if (CONFIG.instagram && !/^https:\/\/(www\.)?instagram\.com\/[\w.]+\/?$/.test(CONFIG.instagram)) {
  avisarDono(`configuracoes.js: o link do Instagram precisa ser como "https://instagram.com/seuperfil".`);
  CONFIG.instagram = "";
}

CONFIG.descontoPix = Number(CONFIG.descontoPix);
if (!(CONFIG.descontoPix >= 0 && CONFIG.descontoPix <= 50)) {
  avisarDono("configuracoes.js: descontoPix precisa ser um número entre 0 e 50.");
  CONFIG.descontoPix = 0;
}

CONFIG.prazoTrocaDias = Number(CONFIG.prazoTrocaDias);
if (!Number.isInteger(CONFIG.prazoTrocaDias) || CONFIG.prazoTrocaDias < 1) {
  avisarDono("configuracoes.js: prazoTrocaDias precisa ser um número inteiro (ex.: 7).");
  CONFIG.prazoTrocaDias = CONFIG_PADRAO.prazoTrocaDias;
}

/* ---------- produtos.js ---------- */
if (typeof CATEGORIAS === "undefined" || typeof PRODUTOS === "undefined" || !Array.isArray(PRODUTOS)) {
  avisarDono("O arquivo EDITAR-AQUI/produtos.js tem um erro (confira aspas, vírgulas e chaves { }). Nenhum produto foi carregado.");
  window.PRODUTOS = [];
}
if (typeof CATEGORIAS === "undefined" || !Array.isArray(CATEGORIAS)) window.CATEGORIAS = [];
CATEGORIAS = listaDeTextos(CATEGORIAS);

PRODUTOS = (function () {
  const idsUsados = new Set();
  const validos = [];

  PRODUTOS.forEach((p, indice) => {
    const onde = `produtos.js, produto nº ${indice + 1}${p && p.nome ? ` ("${p.nome}")` : ""}`;
    const problemas = [];

    if (!p || typeof p !== "object") {
      avisarDono(`${onde}: bloco inválido.`);
      return;
    }

    const id = typeof p.id === "string" ? p.id.trim() : "";
    if (!id) problemas.push("falta o id");
    else if (idsUsados.has(id)) problemas.push(`o id "${id}" já é usado por outro produto`);

    if (typeof p.nome !== "string" || !p.nome.trim()) problemas.push("falta o nome");
    if (!CATEGORIAS.includes(p.categoria)) problemas.push(`a categoria "${p.categoria}" não está na lista CATEGORIAS`);

    const preco = typeof p.preco === "string" ? Number(p.preco.replace(",", ".")) : Number(p.preco);
    if (!Number.isFinite(preco) || preco <= 0) problemas.push(`o preço "${p.preco}" não é válido (use ponto, ex.: 129.90)`);

    const tamanhos = listaDeTextos(p.tamanhos);
    if (!tamanhos.length) problemas.push("falta a lista de tamanhos");

    const cores = (Array.isArray(p.cores) ? p.cores : [])
      .filter((c) => c && typeof c.nome === "string" && c.nome.trim())
      .map((c) => {
        let hex = typeof c.hex === "string" ? c.hex.trim() : "";
        if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) {
          avisarDono(`${onde}: o código da cor "${c.nome}" ("${c.hex}") não é válido. Use o formato "#1F1F21".`);
          hex = "#cccccc";
        }
        return { nome: c.nome, hex, imagem: caminhoFoto(c.imagem, onde) };
      });
    if (!cores.length) problemas.push("falta a lista de cores");

    if (problemas.length) {
      avisarDono(`${onde} NÃO aparece no site: ${problemas.join("; ")}.`);
      return;
    }

    idsUsados.add(id);
    validos.push({
      id,
      nome: p.nome.trim(),
      categoria: p.categoria,
      preco,
      imagem: caminhoFoto(p.imagem, onde),
      descricao: typeof p.descricao === "string" ? p.descricao : "",
      modelos: listaDeTextos(p.modelos),
      tamanhos,
      cores,
      fotos: listaDeTextos(p.fotos).map((f) => caminhoFoto(f, onde)).filter(Boolean),
      destaque: p.destaque === true,
      esgotado: p.esgotado === true,
    });
  });

  return validos;
})();

/* ---------- textos.js ---------- */
if (typeof TEXTOS === "undefined" || !TEXTOS || typeof TEXTOS !== "object") {
  avisarDono("O arquivo EDITAR-AQUI/textos.js tem um erro (confira aspas e vírgulas).");
  window.TEXTOS = {};
}

/* ---------- Mostra os avisos quando o site é aberto no computador ---------- */
const SITE_LOCAL = ["file:"].includes(location.protocol) || ["localhost", "127.0.0.1", ""].includes(location.hostname);

quandoPronto(() => {
  if (!SITE_LOCAL || !AVISOS_DA_LOJA.length) return;
  const caixa = document.createElement("div");
  caixa.className = "avisos-dono";
  const titulo = document.createElement("strong");
  titulo.textContent = "Avisos para corrigir (só você vê isto, no seu computador):";
  const lista = document.createElement("ul");
  AVISOS_DA_LOJA.forEach((texto) => {
    const item = document.createElement("li");
    item.textContent = texto;
    lista.appendChild(item);
  });
  const fechar = document.createElement("button");
  fechar.type = "button";
  fechar.textContent = "Fechar";
  fechar.addEventListener("click", () => caixa.remove());
  caixa.append(titulo, lista, fechar);
  document.body.prepend(caixa);
});
