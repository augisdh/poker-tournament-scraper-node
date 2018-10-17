const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'http://pokerprolabs.com/PSuserNameHERE/pokerstars/2018/any';
  const nameInput = '#UserName';
  const passInput = '#Password';
  const btnLogIn = 'input[type="submit"]';

  // PokerProLabs logIn details
  const nameLogin = 'name';
  const passLogin = 'pass';
  // 

  await page.goto(url);
  
  await page.click(nameInput);
  await page.keyboard.type(nameLogin);

  await page.click(passInput);
  await page.keyboard.type(passLogin);

  await page.click(btnLogIn);
  
  await page.waitForNavigation();

  let extractWinnings = async () => {
    let totalCashes = [];

    let prizes = await page.evaluate(() => 
      Array.from(document.querySelectorAll("tbody#body tr")).
      map(tournament => tournament.children[4].innerText.trim())
    );

    // Write regex to find values without $ symbol and push to array
    const regex = "?";
    
    for(let i in prizes){
      let value = prizes[i].match(regex);
      totalCashes.push(value);
    }
    // 

    totalWinnings = totalCashes.reduce((acc, val) => acc + val, 0);

    return totalCashes;
  }

  const run = await extractWinnings();
  console.log(run)

  await page.close();
})();