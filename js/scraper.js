const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'http://pokerprolabs.com/playerToSearch/pokerstars/2018/any';
  const nameInput = '#UserName';
  const passInput = '#Password';
  const btnLogIn = 'input[type="submit"]';
  const tournamentName = "$1.00 NL Hold'em [180 Players]";
  const totalCashes = [];

  // PokerProLabs logIn details
  const nameLogin = 'username';
  const passLogin = 'password';
  // 

  await page.goto(url);
  
  await page.click(nameInput);
  await page.keyboard.type(nameLogin);

  await page.click(passInput);
  await page.keyboard.type(passLogin);

  await page.click(btnLogIn);
  await page.waitForNavigation();

  const makePageCountMax = async () => {
    await page.evaluate(() => document.getElementById("pageCount").selectedIndex = 3);
    await page.click("#next");
    await page.click("#prev");
  }

  makePageCountMax();
  await page.waitFor(2*1000);

  const extractWinnings = async () => {
    await page.screenshot({path:`1.png`});

    const prizes = await page.evaluate((tournamentName, totalCashes) => {
      const onePageCashes =  Array.from(document.querySelectorAll("tbody#body tr")).
        filter(tournament => tournament.innerText.includes(tournamentName)).
          map(money => Number(money.children[4].innerText.replace('$', ''))).
            reduce((acc, val) => acc + val, 0);

      totalCashes.push(onePageCashes.toFixed(2));
      return totalCashes;
    }, tournamentName, totalCashes);

    const nextPageIsDisabled = await page.evaluate(() => document.querySelector("#next").classList.contains("ui-state-disabled"));

    if(!nextPageIsDisabled){
      await a();
    } else {
      console.log("All done");
    }
  }

  const a = async () => {
    await page.click("#next");
    await page.waitFor(2*1000);
    await extractWinnings();
  }

  const run = await extractWinnings();
  console.log(run)

  await page.close();
})();
