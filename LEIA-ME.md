# Naninha Closet — Site

Site de catálogo. A cliente escolhe modelo, tamanho e cor, coloca na sacola
e finaliza o pedido pelo WhatsApp. Funciona no GitHub Pages (não precisa de servidor).

## Onde mudar cada coisa

| Quero mudar...                              | Arquivo                  |
|---------------------------------------------|--------------------------|
| Número do WhatsApp, Instagram, textos do topo | `js/config.js`         |
| Produtos, preços, tamanhos, cores, categorias | `js/produtos.js`       |
| Fotos dos produtos                          | pasta `img/produtos/`    |
| Foto da seção "Sobre nós"                   | `img/banner.jpg`         |
| Ilustração do topo (arara, selo, ramo)      | `index.html` (seção INÍCIO) + `css/inicio.css` |
| Cores e fontes do site inteiro              | `css/variaveis.css`      |
| Textura do fundo (trocar, enfraquecer ou tirar) | `img/textura-fundo.svg` e `--textura` em `css/variaveis.css` |
| Texto das mensagens (pedido e troca) no WhatsApp | `js/whatsapp.js`    |
| Desconto do Pix, parcelas, parcela mínima   | `js/config.js`           |
| Prazo de troca (dias)                       | `js/config.js`           |
| Texto da política de trocas                 | `index.html` (seção TROCAS) |
| Textos "Sobre nós" e "Como comprar"         | `index.html`             |
| Animações (ligar/desligar)                  | `css/animacoes.css` e atributo `data-animar` |

### Estilos (pasta `css/`)
- `variaveis.css` – paleta de cores e fontes
- `base.css` – estilos gerais e botões
- `cabecalho.css` – logo e menu
- `inicio.css` – topo da página (arco com arara, selo girando, ramo)
- `secoes.css` – faixa de texto, "Sobre" e "Como comprar"
- `catalogo.css` – filtros e cards de produto
- `modal-produto.css` – janela de escolha do produto
- `sacola.css` – sacola, aviso e botão flutuante do WhatsApp
- `pagamento.css` – seção de pagamento e escolha do pagamento na sacola
- `trocas.css` – política e formulário de trocas
- `rodape.css` – rodapé
- `animacoes.css` – efeitos ao rolar a página e ao passar o mouse

### Scripts (pasta `js/`)
- `config.js` – configurações da loja
- `produtos.js` – catálogo
- `utilitarios.js` – funções de apoio
- `whatsapp.js` – monta a mensagem do pedido
- `animacoes.js` – aparecer ao rolar, parallax, cabeçalho que encolhe
- `pagamento.js` – formas de pagamento, desconto Pix e parcelas
- `sacola.js` – carrinho
- `modal-produto.js` – janela do produto
- `catalogo.js` – lista de produtos e filtros
- `trocas.js` – formulário de troca
- `principal.js` – inicia tudo

## Adicionar um produto
1. Coloque a foto em `img/produtos/` (ex.: `blusa-nova.jpg`, de preferência na vertical 3:4).
2. Abra `js/produtos.js`, copie um bloco `{ ... },` e altere os dados.
3. O `id` precisa ser único. A `categoria` precisa existir na lista `CATEGORIAS`.

### Fotos por cor e galeria
Veja o exemplo da "Blusa de Poliamida com Proteção UV" em `js/produtos.js` (fotos em `img/produtos/blusa-uv/`):
- `imagem`: foto de capa (aparece no catálogo).
- Em cada cor, `imagem`: foto da peça naquela cor — troca sozinha quando a cliente escolhe a cor.
- `fotos`: fotos extras (detalhes), que aparecem nas miniaturas.

Dica: crie uma pasta por produto dentro de `img/produtos/` e use nomes sem espaços nem acentos (ex.: `cinza-azulado.jpg`).

As imagens de exemplo são ilustrações .svg — basta trocar pelo caminho da foto real (.jpg/.png/.webp).
Se a foto não for encontrada, o site mostra a inicial do nome no lugar.

## Publicar no GitHub Pages
1. Crie um repositório no GitHub e envie todos os arquivos desta pasta.
2. No repositório: **Settings → Pages → Branch: main / (root) → Save**.
3. Em alguns minutos o site fica disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.
