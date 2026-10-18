/* =========================================================
   CATÁLOGO DE PRODUTOS
   ---------------------------------------------------------
   Para ADICIONAR um produto: abra o arquivo MODELO-DE-PRODUTO.txt
   (nesta mesma pasta), copie o bloco, cole no final da lista
   (antes do "];") e altere as informações.

   Para TIRAR um produto: apague o bloco dele, do { até o },
   Para ESGOTAR sem apagar: coloque  esgotado: true,

   Campos:
   - id:        código único (sem espaços nem acentos), ex.: "vestido-01"
   - nome:      nome do produto
   - categoria: precisa ser igual a uma das CATEGORIAS abaixo
   - preco:     valor em reais, use PONTO nos centavos (ex.: 129.90)
   - imagem:    nome da foto dentro da pasta EDITAR-AQUI/fotos-produtos
                (ex.: "blusa-uv/preto.jpg"). Pode ser .jpg, .png, .webp ou .svg
   - descricao: texto curto
   - modelos:   (opcional) variações de modelo. Apague a linha se não tiver
   - tamanhos:  lista de tamanhos disponíveis
   - cores:     lista com nome e código da cor (hex, ex.: "#1F1F21")
                (opcional) imagem: foto da peça naquela cor — aparece
                quando a cliente escolhe a cor
   - fotos:     (opcional) fotos extras, como detalhes da peça
   - destaque:  true para mostrar a etiqueta "Novidade"
   - esgotado:  (opcional) true para mostrar "Esgotado" e não deixar comprar

   Se algo estiver errado (ex.: categoria que não existe), o produto
   não aparece no site. Abra o site no computador e aperte F12 →
   aba "Console" para ver o aviso explicando o que corrigir.
   ========================================================= */

var CATEGORIAS = ["Vestidos", "Blusas", "Calças", "Saias", "Conjuntos"];

var PRODUTOS = [
  {
    id: "vestido-linho",
    nome: "Vestido Linho Midi",
    categoria: "Vestidos",
    preco: 189.9,
    imagem: "vestido-linho.svg",
    descricao: "Vestido midi em linho com amarração na cintura. Leve e elegante.",
    modelos: ["Alça fina", "Manga curta"],
    tamanhos: ["P", "M", "G", "GG"],
    cores: [
      { nome: "Areia", hex: "#D8C3A5" },
      { nome: "Off-white", hex: "#F4EEE4" },
      { nome: "Oliva", hex: "#6B7051" },
    ],
    destaque: true,
  },
  {
    id: "blusa-poliamida-uv",
    nome: "Blusa de Poliamida com Proteção UV",
    categoria: "Blusas",
    preco: 59.99,
    imagem: "blusa-uv/capa-todas-as-cores.jpg",
    descricao:
      "Blusa de poliamida com proteção UV, gola alta e zíper frontal. Tem recortes que valorizam a silhueta, laterais em tela, bolsos laterais e abertura para o polegar nos punhos.",
    tamanhos: ["P", "M", "G"],
    cores: [
      { nome: "Preto", hex: "#1F1F21", imagem: "blusa-uv/preto.jpg" },
      { nome: "Branco", hex: "#F4F3F0", imagem: "blusa-uv/branco.jpg" },
      { nome: "Nude", hex: "#DCC6AE", imagem: "blusa-uv/nude.jpg" },
      { nome: "Rosa", hex: "#E4AEB1", imagem: "blusa-uv/rosa.jpg" },
      { nome: "Cinza azulado", hex: "#7F8EA3", imagem: "blusa-uv/cinza-azulado.jpg" },
    ],
    fotos: ["blusa-uv/detalhe-gola.jpg", "blusa-uv/detalhe-punho.jpg"],
    destaque: true,
  },
  {
    id: "calca-pantalona",
    nome: "Calça Pantalona Alfaiataria",
    categoria: "Calças",
    preco: 169.9,
    imagem: "calca-pantalona.svg",
    descricao: "Pantalona de cintura alta em tecido de alfaiataria, alonga a silhueta.",
    tamanhos: ["36", "38", "40", "42", "44"],
    cores: [
      { nome: "Bege", hex: "#CDB79A" },
      { nome: "Marrom", hex: "#5C4130" },
      { nome: "Preto", hex: "#1F1B18" },
    ],
    destaque: true,
  },
  {
    id: "saia-midi",
    nome: "Saia Midi Plissada",
    categoria: "Saias",
    preco: 139.9,
    imagem: "saia-midi.svg",
    descricao: "Saia plissada com movimento, cós de elástico para maior conforto.",
    tamanhos: ["P", "M", "G"],
    cores: [
      { nome: "Dourado", hex: "#B08D57" },
      { nome: "Nude", hex: "#E2C9B0" },
    ],
    destaque: false,
  },
  {
    id: "conjunto-tricot",
    nome: "Conjunto Tricot",
    categoria: "Conjuntos",
    preco: 229.9,
    imagem: "conjunto-tricot.svg",
    descricao: "Conjunto de blusa e calça em tricot macio. Conforto com sofisticação.",
    modelos: ["Com calça", "Com saia"],
    tamanhos: ["P", "M", "G"],
    cores: [
      { nome: "Caramelo", hex: "#A87447" },
      { nome: "Cru", hex: "#EFE6D6" },
      { nome: "Oliva", hex: "#6B7051" },
    ],
    destaque: true,
  },
  {
    id: "vestido-longo",
    nome: "Vestido Longo Fenda",
    categoria: "Vestidos",
    preco: 249.9,
    imagem: "vestido-longo.svg",
    descricao: "Vestido longo com fenda lateral e decote elegante.",
    tamanhos: ["P", "M", "G"],
    cores: [
      { nome: "Terracota", hex: "#B5643C" },
      { nome: "Preto", hex: "#1F1B18" },
    ],
    destaque: false,
  },
];
