/* =========================================================
   CATÁLOGO DE PRODUTOS
   ---------------------------------------------------------
   Para ADICIONAR um produto: copie um bloco { ... }, cole no
   final da lista (antes do "];") e altere as informações.

   Campos:
   - id:        código único (sem espaços), ex.: "vestido-01"
   - nome:      nome do produto
   - categoria: precisa ser igual a uma das CATEGORIAS abaixo
   - preco:     valor em reais, use ponto nos centavos (ex.: 129.90)
   - imagem:    caminho da foto dentro da pasta img/produtos
                (pode ser .jpg, .png, .webp ou .svg — as de exemplo são .svg)
   - descricao: texto curto
   - modelos:   (opcional) variações de modelo. Apague a linha se não tiver
   - tamanhos:  lista de tamanhos disponíveis
   - cores:     lista com nome e código da cor (hex)
                (opcional) imagem: foto da peça naquela cor — aparece
                quando a cliente escolhe a cor
   - fotos:     (opcional) fotos extras, como detalhes da peça
   - destaque:  true para mostrar a etiqueta "Novidade"
   ========================================================= */

const CATEGORIAS = ["Vestidos", "Blusas", "Calças", "Saias", "Conjuntos"];

const PRODUTOS = [
  {
    id: "vestido-linho",
    nome: "Vestido Linho Midi",
    categoria: "Vestidos",
    preco: 189.9,
    imagem: "img/produtos/vestido-linho.svg",
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
    imagem: "img/produtos/blusa-uv/capa-todas-as-cores.jpg",
    descricao:
      "Blusa de poliamida com proteção UV, gola alta e zíper frontal. Tem recortes que valorizam a silhueta, laterais em tela, bolsos laterais e abertura para o polegar nos punhos.",
    tamanhos: ["P", "M", "G"],
    cores: [
      { nome: "Preto", hex: "#1F1F21", imagem: "img/produtos/blusa-uv/preto.jpg" },
      { nome: "Branco", hex: "#F4F3F0", imagem: "img/produtos/blusa-uv/branco.jpg" },
      { nome: "Nude", hex: "#DCC6AE", imagem: "img/produtos/blusa-uv/nude.jpg" },
      { nome: "Rosa", hex: "#E4AEB1", imagem: "img/produtos/blusa-uv/rosa.jpg" },
      { nome: "Cinza azulado", hex: "#7F8EA3", imagem: "img/produtos/blusa-uv/cinza-azulado.jpg" },
    ],
    fotos: ["img/produtos/blusa-uv/detalhe-gola.jpg", "img/produtos/blusa-uv/detalhe-punho.jpg"],
    destaque: true,
  },
  {
    id: "calca-pantalona",
    nome: "Calça Pantalona Alfaiataria",
    categoria: "Calças",
    preco: 169.9,
    imagem: "img/produtos/calca-pantalona.svg",
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
    imagem: "img/produtos/saia-midi.svg",
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
    imagem: "img/produtos/conjunto-tricot.svg",
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
    imagem: "img/produtos/vestido-longo.svg",
    descricao: "Vestido longo com fenda lateral e decote elegante.",
    tamanhos: ["P", "M", "G"],
    cores: [
      { nome: "Terracota", hex: "#B5643C" },
      { nome: "Preto", hex: "#1F1B18" },
    ],
    destaque: false,
  },
];
