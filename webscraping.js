const puppeteer = require("puppeteer");
const fs = require("fs");
const download = require("download");

//const MOVIE_ID = "tt1877830";
//const IMDB_URL_ID = `https://www.imdb.com/title/${MOVIE_ID}/?ref_=fn_al_tt_1`;

const MOVIE_NAME = "batman";
//const MOVIE_NAME = "matrix";
//const MOVIE_NAME = "vingadores";
//const MOVIE_NAME = "spartacus";

const IMDB_URL = `https://www.imdb.com/find?q=${MOVIE_NAME}&ref=nv_sr_sm`;

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(IMDB_URL, { waitUntil: "networkidle2" });
  await page.click(
    "#__next > main > div.ipc-page-content-container.ipc-page-content-container--full.sc-c8f6027-0.kZIpuh > div.ipc-page-content-container.ipc-page-content-container--center > section > div > div.ipc-page-grid__item.ipc-page-grid__item--span-2 > section:nth-child(3) > div.sc-17bafbdb-2.ffAEHI > ul > li:nth-child(1) > div.ipc-metadata-list-summary-item__c > div > a"
  );
  await page.reload();
  await page.waitForSelector(".sc-afe43def-1");
  await page.screenshot({
    path: `./${MOVIE_NAME}_print.jpeg`,
    fullPage: false,
  });

  let data = await page.evaluate(() => {
    let titulo = document.querySelector(".sc-afe43def-1").innerHTML;
    let nota = document.querySelector(".sc-bde20123-1").innerHTML;
    let avaliadores = document
      .querySelector(".sc-bde20123-3")
      .innerHTML.replace("&nbsp;", " ");

    // ATENÇÃO!
    // Tem um problema aqui, o ANO pode estar em uma das duas posições:
    // > li:nth-child(1) > a
    // > li:nth-child(2) > a
    let ano = document.querySelector(
      "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-f9e7f53-0.ifXVtO > section > div:nth-child(4) > section > section > div.sc-385ac629-3.kRUqXl > div.sc-52d569c6-0.kNzJA-D > ul > li:nth-child(2) > a"
    ).innerHTML;

    console.log(ano);

    // então se o texto não tiver pelo menos 4 dígitos, tente na outra posição:
    if (ano.length < 4) {
      ano = document.querySelector(
        "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-f9e7f53-0.ifXVtO > section > div:nth-child(4) > section > section > div.sc-385ac629-3.kRUqXl > div.sc-52d569c6-0.kNzJA-D > ul > li:nth-child(1) > a"
      ).innerHTML;
    }

    return {
      ano,
      titulo,
      nota,
      avaliadores,
    };
  });

  console.log(data);

  fs.writeFile(
    `./${data.titulo.replace(":", "")}_imagemFilme.json`,
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) throw new Error("algo deu errado");
    }
  );

  await page.click(
    "#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-f9e7f53-0.ifXVtO > section > div:nth-child(4) > section > section > div.sc-385ac629-4.dDTLMQ > div.sc-385ac629-5.kajzfn > div.sc-385ac629-7.kdyVyZ > div > a > div"
  );

  await page.waitForSelector("img");

  let foto = await page.evaluate(() => {
    let img = document.querySelector(
      "#__next > main > div.ipc-page-content-container.ipc-page-content-container--full.sc-c8f6027-0.kZIpuh > div.sc-92eff7c6-1.cXWtZP.media-viewer > div:nth-child(4) > img"
    )["src"];
    return img;
  });

  const downloadImg = (async () => {
    const d = await download(foto);
    fs.writeFileSync(`./${data.titulo.replace(":", "")}_movie.jpg`, d);
  })();

  await page.reload();

  https: await browser.close();
})();
