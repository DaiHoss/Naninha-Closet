/* =========================================================
   CONFIGURAÇÕES DA LOJA
   Altere aqui o número do WhatsApp, nome, redes sociais etc.
   ========================================================= */

const CONFIG = {
  // Nome que aparece no site e na mensagem do WhatsApp
  nomeLoja: "Naninha Closet",

  // Número do WhatsApp com DDI + DDD, só números (ex.: 55 11 999998888)
  whatsapp: "5511999999999",

  // Instagram (deixe "" para esconder)
  instagram: "https://instagram.com/naninhacloset",

  // Texto do topo da página inicial
  bannerTitulo: "Elegância que",
  bannerDestaque: "veste você", // parte em itálico dourado
  bannerSubtitulo: "Peças selecionadas com carinho para todos os momentos.",

  // Mensagem que inicia o pedido no WhatsApp
  saudacaoPedido: "Olá! Gostaria de fazer o seguinte pedido:",

  // ---------- Pagamento ----------
  descontoPix: 5, // % de desconto no Pix (coloque 0 para não ter desconto)
  parcelasSemJuros: 3, // máximo de parcelas sem juros no cartão de crédito
  valorMinimoParcela: 30, // valor mínimo de cada parcela, em reais

  // ---------- Trocas ----------
  prazoTrocaDias: 7, // dias para solicitar a troca após receber a peça
};
