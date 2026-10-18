# Como atualizar o site

Tudo o que você precisa mudar no dia a dia fica **nesta pasta**.
Os outros arquivos (pastas `css/` e `js/`) são o "motor" do site e não precisam ser mexidos.

| Quero mudar...                                          | Arquivo                         |
|---------------------------------------------------------|---------------------------------|
| Produtos, preços, tamanhos, cores, categorias           | `produtos.js`                   |
| Marcar peça como esgotada                               | `produtos.js` (`esgotado: true,`) |
| Fotos dos produtos                                      | pasta `fotos-produtos/`         |
| WhatsApp, Instagram, texto do topo                      | `configuracoes.js`              |
| Desconto do Pix, aviso de juros, prazo de troca         | `configuracoes.js`              |
| Faixa que corre, "Sobre nós", "Como comprar", regras de troca | `textos.js`               |
| Imagem do topo (logo em arco)                           | `imagens-do-site/topo.jpg`      |
| Imagem do "Sobre nós"                                   | `imagens-do-site/sobre-nos.jpg` |

Para trocar uma imagem do site, substitua o arquivo **mantendo o mesmo nome**.

---

## Adicionar um produto novo

1. **Fotos:** dentro de `fotos-produtos/`, crie uma pasta para o produto
   (ex.: `vestido-floral`) e coloque as fotos nela.
   Use nomes **sem espaços e sem acentos** (ex.: `capa.jpg`, `azul-claro.jpg`).
   De preferência fotos em pé (formato 3:4) e com menos de 500 KB cada.
2. **Dados:** abra `MODELO-DE-PRODUTO.txt`, copie o bloco e cole no final da
   lista em `produtos.js`, logo antes do `];`.
3. Troque as informações (nome, preço, cores…). O caminho da foto é só a parte
   depois de `fotos-produtos/` — ex.: `"vestido-floral/capa.jpg"`.
4. Confira no seu computador (veja abaixo) e depois publique.

## Tirar um produto
- **Acabou por um tempo?** Coloque `esgotado: true,` no produto. Ele continua
  aparecendo com a etiqueta "Esgotado", mas não dá para comprar.
- **Não vai mais vender?** Apague o bloco inteiro, do `{` até o `},`.
  Se quiser, apague também a pasta de fotos dele.

## Nova categoria
Em `produtos.js`, acrescente o nome na lista `CATEGORIAS`
(ex.: `["Vestidos", "Blusas", "Calças", "Saias", "Conjuntos", "Acessórios"]`).
O botão de filtro aparece sozinho.

---

## Conferir antes de publicar

1. Na pasta do site, dê **dois cliques no `index.html`** — ele abre no navegador.
2. Se algo estiver errado, aparece uma **caixa vermelha no topo** dizendo o que
   corrigir (ex.: "a categoria "Saia" não está na lista"). Essa caixa **só aparece
   no seu computador**, nunca para as clientes.
3. Se o produto não apareceu e não tem caixa vermelha, aperte **F12** → aba
   **Console** para ver os avisos.

Erros mais comuns:
- Esqueceu uma **vírgula** no fim da linha ou depois do `}` do produto.
- Esqueceu as **aspas** em volta de um texto: `nome: "Vestido"` (certo) × `nome: Vestido` (errado).
- Preço com vírgula: use `129.90`, não `129,90`.
- Nome da foto diferente do arquivo (maiúsculas contam: `Capa.jpg` ≠ `capa.jpg`).

Mesmo com erro, o site **não sai do ar**: só o produto com problema deixa de
aparecer (ou, se o arquivo inteiro tiver erro, a coleção fica vazia até corrigir —
o WhatsApp e o resto continuam funcionando).

## Publicar
Depois de conferir, envie as alterações para o GitHub como de costume
(VS Code → ícone de **Controle de Código-Fonte** → escreva uma mensagem →
**Confirmar** → **Sincronizar alterações**). Em poucos minutos o site é atualizado.

Não precisa trocar nenhum número de versão para os arquivos desta pasta:
o site sempre baixa a versão mais nova deles.
