/* =========================================================
   TEXTOS DO SITE
   Altere aqui os textos da faixa, "Sobre nós", "Como comprar"
   e da política de trocas.

   Dicas:
   - Para deixar uma palavra em negrito, coloque entre **duas estrelas**
   - Nas regras de troca, {prazo} vira o número de dias do
     arquivo configuracoes.js (prazoTrocaDias)
   - Cada item termina com vírgula ,
   ========================================================= */

var TEXTOS = {
  // Faixa com texto correndo (logo abaixo do topo)
  faixa: ["Nova coleção", "Peças exclusivas", "Atendimento pelo WhatsApp", "Envio para São Paulo/Capital"],

  // ---------- Sobre nós ----------
  sobreTitulo: "Sobre nós",
  sobreParagrafos: [
    "Naninha Closet nasceu com o propósito de oferecer uma experiência de moda que une elegância, qualidade e autenticidade. Cada peça é selecionada com cuidado para proporcionar conforto, versatilidade e estilo, valorizando a individualidade de cada cliente.",
    "Mais do que uma loja de roupas, buscamos tornar cada escolha especial, com atendimento personalizado, atenção aos detalhes e compromisso em oferecer uma experiência de compra prática e acolhedora.",
  ],
  sobreVantagens: [
    "**Curadoria exclusiva:** peças selecionadas com cuidado e atenção às tendências.",
    "**Atendimento personalizado:** proximidade e suporte para ajudar você a encontrar o que procura.",
    "**Qualidade e estilo:** opções que combinam conforto, sofisticação e versatilidade.",
    "**Praticidade:** atendimento pelo WhatsApp e envios para toda São Paulo/Capital.",
  ],

  // ---------- Como comprar ----------
  passos: [
    { titulo: "Escolha", texto: "Selecione o modelo, tamanho e cor da peça." },
    { titulo: "Adicione", texto: "Coloque quantas peças quiser na sua sacola." },
    { titulo: "Finalize", texto: "Envie o pedido pelo WhatsApp e combine pagamento e entrega." },
  ],

  // ---------- Política de trocas ----------
  regrasTroca: [
    { titulo: "Prazo", texto: "Você tem até **{prazo} dias** após o recebimento para solicitar a troca." },
    { titulo: "Condições da peça", texto: "A peça deve estar sem uso, sem lavagem, sem perfume e com a etiqueta presa." },
    { titulo: "Tamanho, cor ou modelo", texto: "A troca pode ser feita por outro tamanho, cor ou modelo, conforme a disponibilidade em estoque." },
    { titulo: "Peça com defeito", texto: "Recebeu uma peça com defeito? Envie a solicitação com uma foto do defeito pelo WhatsApp que resolvemos para você." },
    { titulo: "Como solicitar", texto: "Preencha o formulário e envie pelo WhatsApp. Responderemos com as orientações para o envio da peça." },
  ],
};
