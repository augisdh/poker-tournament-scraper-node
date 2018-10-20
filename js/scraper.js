const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'http://pokerprolabs.com/pokerstarsID/pokerstars/2018/any';
  const nameInput = '#UserName';
  const passInput = '#Password';
  const btnLogIn = 'input[type="submit"]';
  const tournamentName = "Tournament NAME";

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

  const extractWinnings = async () => {
    await page.screenshot({path:`1.png`});

    const prizes = await page.evaluate((tournamentName) => {
      return Array.from(document.querySelectorAll("tbody#body tr")).
        filter(tournament => tournament.innerText.includes(tournamentName)).
          map(money => Number(money.children[4].innerText.replace('$', ''))).
            reduce((a, b) => a + b, 0);

    }, tournamentName);

    await a();
    return prizes;
  }

  const a = async () => {
    const nextPageIsDisabled = await page.evaluate(() => document.querySelector("#next").classList.contains("ui-state-disabled"));
        
    if(nextPageIsDisabled){
      return "All done";
    } else {
      await page.click("#next");
      await page.waitFor(2*1000);
      await extractWinnings();
    }
  }

  const run = await extractWinnings();
  console.log(run)

  await page.close();
})();