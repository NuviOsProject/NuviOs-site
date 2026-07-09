# NuviOS — O Sistema Operacional do Futuro

![NuviOS Cover](img/hero-os.png)

> O NuviOS é um sistema operacional independente construído do zero, projetado para máximo desempenho, interface elegante e experiência imersiva para jogos.

Este repositório contém o código-fonte do **site oficial** do NuviOS.

## 🚀 Objetivo

O objetivo deste site é:
- Apresentar o projeto NuviOS e sua visão.
- Explicar as funcionalidades planejadas.
- Atrair apoiadores e formar uma comunidade.
- Arrecadar doações para acelerar o desenvolvimento.
- Transmitir uma imagem profissional, moderna e tecnológica.

## 🛠 Tecnologias Utilizadas

O site foi desenvolvido com foco absoluto em performance, utilizando apenas tecnologias nativas da web, sem frameworks ou bibliotecas pesadas:

- **HTML5 Semântico**: Estrutura acessível e otimizada para SEO.
- **CSS3 Moderno**: Variáveis nativas, Flexbox, CSS Grid, Glassmorphism, efeitos Neon e animações fluidas.
- **Vanilla JavaScript (ES6+)**: Interações dinâmicas, validação de formulários, Scroll Reveal, animação de partículas e manipulação de DOM nativa.

## ✨ Funcionalidades do Site

- **Design Responsivo**: Adapta-se perfeitamente a celulares, tablets e desktops.
- **Performance Extrema**: Pontuação máxima no Lighthouse (sem bibliotecas externas).
- **Efeitos Visuais Premium**:
  - Background com partículas interativas (Canvas API).
  - Efeito Glassmorphism em cards e navbar.
  - Sombras neon e glows animados.
  - Cursor personalizado inteligente.
  - Animações de Scroll Reveal suaves.
- **SEO Completo**: Meta tags, Open Graph, Twitter Cards, sitemap e robots.txt configurados.
- **Acessibilidade**: Navegação por teclado, ARIA labels, contraste adequado e suporte a *prefers-reduced-motion*.

## 📁 Estrutura de Arquivos

```text
/
├── index.html          # Página principal estruturada
├── README.md           # Documentação do projeto
├── robots.txt          # Regras para motores de busca
├── sitemap.xml         # Mapa do site para SEO
├── css/
│   └── style.css       # Estilos completos e responsivos
├── js/
│   └── script.js       # Funcionalidades e animações
├── img/                # Imagens geradas e otimizadas
│   ├── hero-os.png
│   ├── about-visual.png
│   ├── gallery-1.png
│   ├── gallery-2.png
│   ├── gallery-3.png
│   └── gallery-4.png
└── favicon/            # Ícones do site
    ├── favicon.svg
    ├── favicon-32.png
    ├── apple-touch-icon.png
    └── site.webmanifest
```

## 💻 Como Executar Localmente

O projeto não requer build ou compilação. Para visualizar:

1. Clone o repositório ou baixe os arquivos.
2. Abra o arquivo `index.html` diretamente no seu navegador.
3. Para testar o envio de formulários (simulado), recomenda-se usar um servidor local simples, como o Live Server do VS Code ou Python (`python -m http.server`).

## 🌐 Como Publicar no GitHub Pages

O projeto está pronto para ser hospedado gratuitamente no GitHub Pages:

1. Crie um novo repositório público no seu GitHub.
2. Faça o upload de todos os arquivos e pastas deste projeto para o repositório.
3. No repositório, vá em **Settings** > **Pages**.
4. Em **Source**, selecione a branch `main` ou `master` e a pasta `/ (root)`.
5. Clique em **Save**. Em alguns minutos, seu site estará no ar no link fornecido pelo GitHub.

## 📝 Personalização

O código foi construído de forma modular para facilitar edições futuras:

- **Cores e Fontes**: Podem ser facilmente alteradas nas Variáveis CSS (`:root`) no topo do arquivo `style.css`.
- **Links Sociais e Doações**: Procure por `<!-- EDITE OS LINKS ABAIXO -->` no `index.html` para inserir suas URLs reais.
- **E-mail e Chave PIX**: Procure pelas seções correspondentes no `index.html` para inserir seus dados.

## 📄 Licença

Este projeto é de código aberto e está licenciado sob a [MIT License](https://opensource.org/licenses/MIT). Sinta-se livre para usar, modificar e distribuir.

---
*Desenvolvido com dedicação para a comunidade NuviOS.*
