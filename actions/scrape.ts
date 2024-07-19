"use server";
import puppeteer from "puppeteer";

export async function scrape(chromeSocket: string, linkedInURL: string) {
  let browser;
  try {
    const browserWSEndpoint = `ws://127.0.0.1:21222/devtools/browser/${chromeSocket}`;
    browser = await puppeteer.connect({ browserWSEndpoint });
    const page = await browser.newPage();
    await page.goto(linkedInURL);

    const profilePic = await page.$eval(
      "::-p-xpath(//main/section/div[contains(@class, 'ph5 ')]//img[contains(@class, 'profile')])",
      (element) => element.getAttribute("src")
    );

    const name = await page.$eval(
      "::-p-xpath(//main/section/div[contains(@class, 'ph5 ')]//h1)",
      (element) => element.textContent
    );

    const tagline = await page.$eval(
      "::-p-xpath(//main/section/div[contains(@class, 'ph5 ')]//div[contains(@class, 'medium')])",
      (element) => element.textContent
    );

    const location = await page.$eval(
      "::-p-xpath(//main/section/div[contains(@class, 'ph5 ')]/div/div/span[contains(@class, 'body-small')])",
      (element) => element.textContent
    );

    const experience = await page.$$eval(
      "::-p-xpath(//section[./div[contains(@id, 'experience')]]//div[@data-view-name='profile-component-entity'])",
      (elements) =>
        elements.map((option) => {
          const newOptions = Array.from(
            option.querySelectorAll("span[aria-hidden]")
          );
          const logo = option.querySelector("img");
          return {
            logo: logo?.getAttribute("src"),
            details: newOptions.map((op) => op.textContent),
          };
        })
    );

    const results = {
      name,
      tagline,
      location,
      profilePic,
      experience,
    };

    page.close();
    return results;
  } catch (e) {
    console.log(e);
  }
}
