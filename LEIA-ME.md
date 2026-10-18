# Naninha Closet — Site

Site de catálogo. A cliente escolhe modelo, tamanho e cor, coloca na sacola
e finaliza o pedido pelo WhatsApp. Funciona no GitHub Pages (não precisa de servidor).

## Para atualizar o site: pasta `EDITAR-AQUI/`

Produtos, fotos, preços, WhatsApp, textos e imagens ficam todos na pasta
**`EDITAR-AQUI/`**. O passo a passo está em
[`EDITAR-AQUI/COMO-ATUALIZAR.md`](EDITAR-AQUI/COMO-ATUALIZAR.md).

```
EDITAR-AQUI/
├── COMO-ATUALIZAR.md       ← passo a passo
├── MODELO-DE-PRODUTO.txt   ← bloco para copiar ao criar um produto
├── produtos.js             ← produtos, preços, cores, categorias
├── configuracoes.js        ← WhatsApp, Instagram, Pix, prazo de troca
├── textos.js               ← faixa, "Sobre nós", "Como comprar", regras de troca
├── fotos-produtos/         ← fotos dos produtos
└── imagens-do-site/        ← imagem do topo e do "Sobre nós"
```

## Outras mudanças (menos comuns)

| Quero mudar...                                  | Arquivo                  |
|-------------------------------------------------|--------------------------|
| Cores e fontes do site inteiro                  | `css/variaveis.css`      |
| Vaso de flores ao lado do arco                  | `img/flores.svg` (posição em `css/inicio.css`, classe `.ramo`) |
| Textura do fundo (trocar, enfraquecer ou tirar) | `img/textura-fundo.svg` e `--textura` em `css/variaveis.css` |
| Texto das mensagens (pedido e troca) no WhatsApp | `js/whatsapp.js`        |
| Animações (ligar/desligar)                      | `css/animacoes.css` e atributo `data-animar` |

### Estilos (pasta `css/`)
- `variaveis.css` – paleta de cores e fontes
- `base.css` – estilos gerais, botões e caixa de avisos
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
- `carregar.js` – baixa os outros scripts na ordem certa (a lista fica nele)
- `verificar.js` – confere os arquivos de `EDITAR-AQUI/` e avisa sobre erros
- `utilitarios.js` – funções de apoio
- `whatsapp.js` – monta a mensagem do pedido
- `animacoes.js` – aparecer ao rolar, parallax, cabeçalho que encolhe
- `pagamento.js` – formas de pagamento, desconto Pix e aviso de juros do crédito
- `sacola.js` – carrinho
- `modal-produto.js` – janela do produto
- `catalogo.js` – lista de produtos e filtros
- `trocas.js` – formulário de troca
- `principal.js` – inicia tudo e preenche os textos

## Versão dos arquivos (evita site "quebrado" depois de atualizar)
- Arquivos de `EDITAR-AQUI/`: **não precisa fazer nada**, o site sempre baixa a versão nova.
- Alterou algo em `js/`: troque o número de `VERSAO` no começo do `js/carregar.js`
  (ex.: de `"3"` para `"4"`) e o `?v=` do `carregar.js` no `index.html`.
- Alterou algo em `css/`: no VS Code, **Ctrl + H** → procurar `.css?v=3` →
  substituir por `.css?v=4` → **Substituir tudo** (só no `index.html`).

## Segurança
O que o site já faz:
- **Política de segurança (CSP)** no `index.html`: o navegador só roda scripts do
  próprio site. Mesmo que alguém consiga injetar um código, ele é bloqueado.
  Também bloqueia plugins, envio de formulários para outros sites e conteúdo sem https.
- Todo texto mostrado na tela é "escapado" (não vira código).
- A sacola salva no navegador é conferida ao abrir: itens alterados ou de
  produtos que não existem mais são descartados; quantidade máxima de 20 por item.
- Fotos só podem vir de dentro do site (links externos são recusados).
- O link do Instagram e o número do WhatsApp são conferidos.
- Links que abrem outra aba usam `noopener noreferrer`.
- O site não tem login, senha, banco de dados nem pagamento — não há dado de
  cliente guardado para ser roubado.

**O ponto mais importante fica fora do código:** quem tiver acesso à sua conta do
GitHub consegue mudar o site. Por isso:
1. Ative a **verificação em duas etapas** no GitHub
   (foto do perfil → **Settings** → **Password and authentication** →
   **Enable two-factor authentication**).
2. Use uma senha forte e que você não usa em outro lugar.
3. Em **Settings → Pages** do repositório, deixe marcado **Enforce HTTPS**.
4. Não coloque senhas, CPF ou dados de clientes em nenhum arquivo do site —
   tudo que está aqui fica público.

## Publicar no GitHub Pages
1. Crie um repositório no GitHub e envie todos os arquivos desta pasta.
2. No repositório: **Settings → Pages → Branch: main / (root) → Save**.
3. Em alguns minutos o site fica disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.
