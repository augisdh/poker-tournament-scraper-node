const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'http://pokerprolabs.com/pokerstarsID/pokerstars/2018/any';
  const nameInput = '#UserName';
  const passInput = '#Password';
  const btnLogIn = 'input[type="submit"]';
<<<<<<< HEAD
  const tournamentName = "Tournament NAME";

=======
>>>>>>> 6cac7a300705bd48dcf2eb19a0b2ce6965a4fd82
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

<<<<<<< HEAD
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
=======
    // Write regex to find values without $ symbol and push to array
    const regex = "?";
    for(let i in prizes){
      let value = prizes[i].match(regex);
      totalCashes.push(value);
    }
    // 

    totalWinnings = totalCashes.reduce((acc, val) => acc + val, 0);
    return totalCashes;
>>>>>>> 6cac7a300705bd48dcf2eb19a0b2ce6965a4fd82
  }

  const run = await extractWinnings();
  console.log(run)

  await page.close();
})();
})();