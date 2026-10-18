/* =========================================================
   WHATSAPP - monta as mensagens e abre a conversa
   Para mudar o texto das mensagens, edite as funções abaixo.
   ========================================================= */

function linkWhatsapp(mensagem) {
  const base = `https://wa.me/${CONFIG.whatsapp}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}

// itens: [{ id, modelo, tamanho, cor, quantidade }]
// pagamento: resultado de Pagamento.resumo(subtotal)
function montarMensagemPedido(itens, pagamento) {
  const linhas = [CONFIG.saudacaoPedido, ""];

  itens.forEach((item, indice) => {
    const produto = buscarProduto(item.id);
    if (!produto) return;

    linhas.push(`*${indice + 1}. ${produto.nome}*`);
    if (item.modelo) linhas.push(`   Modelo: ${item.modelo}`);
    linhas.push(`   Tamanho: ${item.tamanho}`);
    linhas.push(`   Cor: ${item.cor}`);
    linhas.push(`   Quantidade: ${item.quantidade}`);
    linhas.push(`   Valor: ${formatarPreco(produto.preco * item.quantidade)}`);
    linhas.push("");
  });

  linhas.push(`*Forma de pagamento:* ${pagamento.descricao}`);
  if (pagamento.desconto > 0) {
    linhas.push(`Subtotal: ${formatarPreco(pagamento.subtotal)}`);
    linhas.push(`Desconto Pix: - ${formatarPreco(pagamento.desconto)}`);
  }
  linhas.push(`*${pagamento.temJuros ? "Total sem juros" : "Total"}: ${formatarPreco(pagamento.total)}*`);
  if (pagamento.temJuros) {
    linhas.push("_No cartão de crédito há acréscimo de juros. Aguardo o valor final._");
  }
  linhas.push("");
  linhas.push("Aguardo o retorno para combinar o pagamento e a entrega. Obrigada!");

  return linhas.join("\n");
}

// Abre o WhatsApp em outra aba sem dar acesso a esta página (noopener)
function abrirWhatsapp(mensagem) {
  window.open(linkWhatsapp(mensagem), "_blank", "noopener");
}

function enviarPedidoWhatsapp(itens, pagamento) {
  abrirWhatsapp(montarMensagemPedido(itens, pagamento));
}

// dados: campos do formulário de troca
function montarMensagemTroca(dados) {
  const linhas = [
    "Olá! Gostaria de solicitar uma *troca*:",
    "",
    `*Nome:* ${dados.nome}`,
  ];
  if (dados.dataCompra) {
    linhas.push(`*Data da compra:* ${dados.dataCompra.split("-").reverse().join("/")}`);
  }
  linhas.push(`*Peça:* ${dados.peca}`);
  linhas.push(`*Motivo:* ${dados.motivo}`);
  if (dados.desejo) linhas.push(`*Gostaria de receber:* ${dados.desejo}`);
  if (dados.observacoes) linhas.push(`*Observações:* ${dados.observacoes}`);
  linhas.push("");
  linhas.push("Aguardo as orientações. Obrigada!");
  return linhas.join("\n");
}
