const express = require("express");
const router = express.Router();

const puppeteer = require("puppeteer");

//@route        GET api/profile
//@description  Test route
//@access       Public
router.get("/:vin", async (req, res) => {
  const vin = req.params.vin;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  //   await page.setViewport(1920, 1080);
  await page.goto("http://flyingcouchmoving.com");
  //   await page.goto("http://www.ct-scripts.com/CTreminderwp/testdate.aspx");
  //   await page.type("#txt_vinnumber", vin, { delay: 100 });
  //   await page.click("#btn_date");
  await page.screenshot({ path: "fcm2.png" });

  await browser.close();

  res.send(vin);
});

module.exports = router;
