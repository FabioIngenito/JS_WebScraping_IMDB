<h1 align="left">Um exemplo de Web Scraping simples com JavaScript e Puppeteer acessando a página do IMDB</h1>

| :placard: Vitrine.Dev |                                  |
| --------------------- | -------------------------------- |
| :sparkles: Nome       | **JS_WebScraping_IMDB**          |
| :label: Tecnologias   | JavaScript Puppeteer fs download |

![image](https://user-images.githubusercontent.com/24603753/236648607-367e6c0c-e5dc-447d-b5a7-dcd49cf5866a.png)

<h2 align="left">Detalhes do projeto</h2>

Montei esse Web Scraping baseado nestes videos, mas alterei alguns pontos.

---

- PARTE 1:

Construa um Web Scraping - Simples - Com JavaScript

13 de mai. de 2022

Programando com Anderson Souza

https://youtu.be/ZrkmqjmKEPg

- PARTE 2:

Construa um Web Scraping - Simples - Com JavaScript - Vídeo #02

20 de mai. de 2022

Programando com Anderson Souza

https://youtu.be/4d8Qhfppt3U

- PARTE 3:

Construa um Web Scraping - Simples - Com JavaScript - Vídeo #03

21 de mai. de 2022

Programando com Anderson Souza

https://youtu.be/IUQ-2ZwEcBE

---

Site alvo da captura:

https://www.imdb.com/

---

- Criar o arquivo package.json:

npm init -y

---

Puppeteer

Puppeteer is a Node.js library which provides a high-level API to control Chrome/Chromium over the DevTools Protocol. Puppeteer runs in headless mode by default, but can be configured to run in full (non-headless) Chrome/Chromium.

É uma biblioteca para fazer "Web Scraping".

https://pptr.dev/#?product=Puppeteer
https://www.npmjs.com/search?q=Puppeteer

- Instalar o Puppeteer

npm install puppeteer

---

fs

fs-extra adds file system methods that aren't included in the native fs module and adds promise support to the fs methods. It also uses graceful-fs to prevent EMFILE errors. It should be a drop in replacement for fs.

Cria o arquivo JSON con as informações do filme.

https://www.npmjs.com/package/fs-extra

- Instalar o fs

npm install fs
or
npm install fs-extra

---

download

Para a baixar a imagem da capa do filme.

https://github.com/kevva/download-cli
https://www.npmjs.com/package/download

- Instalar o download

npm install download
or
npm install --global download-cli

---
