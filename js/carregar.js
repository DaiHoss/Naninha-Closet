/* =========================================================
   CARREGAR - baixa os scripts do site na ordem certa
   ---------------------------------------------------------
   Os arquivos da pasta EDITAR-AQUI são sempre baixados na
   versão mais nova (não precisa trocar número nenhum).

   Os arquivos da pasta js/ usam VERSAO: só troque o número
   se alterar algum arquivo dentro de js/.
   ========================================================= */

(function () {
  const VERSAO = "3";
  const minutoAtual = Math.floor(Date.now() / 60000);

  const arquivos = [
    ["EDITAR-AQUI/configuracoes.js", minutoAtual],
    ["EDITAR-AQUI/produtos.js", minutoAtual],
    ["EDITAR-AQUI/textos.js", minutoAtual],
    ["js/verificar.js", VERSAO],
    ["js/utilitarios.js", VERSAO],
    ["js/whatsapp.js", VERSAO],
    ["js/animacoes.js", VERSAO],
    ["js/pagamento.js", VERSAO],
    ["js/sacola.js", VERSAO],
    ["js/modal-produto.js", VERSAO],
    ["js/catalogo.js", VERSAO],
    ["js/trocas.js", VERSAO],
    ["js/principal.js", VERSAO],
  ];

  window.ARQUIVOS_COM_ERRO = [];

  // Roda a função quando a página estiver pronta (mesmo que já esteja)
  window.quandoPronto = function (funcao) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", funcao);
    else funcao();
  };

  arquivos.forEach(([caminho, versao]) => {
    const script = document.createElement("script");
    script.src = `${caminho}?v=${versao}`;
    script.async = false; // mantém a ordem da lista
    script.onerror = () => window.ARQUIVOS_COM_ERRO.push(caminho);
    document.head.appendChild(script);
  });
})();
