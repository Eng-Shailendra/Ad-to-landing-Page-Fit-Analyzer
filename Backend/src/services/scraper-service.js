import * as cheerio from "cheerio";
import { chromium } from "playwright";



export const scraperWebSite = async (url) => {

    let browser;

    try {
        browser = await chromium.launch({
            headless: true,
            args: [
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-setuid-sandbox",
            ],
        })

        const page = await browser.newPage({
            viewport: {
                width: 1440,
                height: 900,
            },
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0 Safari/537.36",
        })

        await page.goto(url, {
            waitUntil: "domcontentloaded",
            timeout: 60000,
        })

        await page.waitForLoadState("load")

        await page.waitForTimeout(2000);


        const cookieBtn = page.getByRole("button", {
            name: /accept|agree|allow|ok/i,
        });

        if (await cookieBtn.count()) {
            await cookieBtn.first().click();
        }

        const html = await page.content();
        const $ = cheerio.load(html)

        const getTexts = (selector, minLenght = 0) => {
            const data = [];

            $(selector).each((_, el) => {
                const text = $(el).text().replace(/\s+/g, " ").trim();
                if (text && text.length >= minLenght) {
                    data.push(text);
                };
            });

            return [...new Set(data)]
        };


        const title = $("title").text().trim();
        const metaDescription = $('meta[name= "description"]').attr("content") || ""
        const headings = getTexts("h1,h2,h3");
        const paragraphs = getTexts("p", 40);
        const buttons = [];

        $("button,a").each((_, el) => {
            const text = $(el).text().trim();
            if (text && text.length < 40 && !buttons.includes(text)) {
                buttons.push(text);
            };
        });

        const images = [];

        $("img").each((_, img) => {
            images.push({
                alt: $(img).attr("alt") || "",
                src: $(img).attr("src") || ""
            });
        });

        const forms = $("form").length;

        const testimonials = [];

        $('.testimonial,.review,.reviews,.customer-review,[class*="testimonial"],[class*="review"]')
            .each((_, el) => {
                const text = $(el).text().replace(/\s+/g, " ").trim();
                if (text.length > 30)
                    testimonials.push(text);
            });

        const pricing = [];

        $('[class*="price"],[id*="price"],[class*="pricing"]')
            .each((_, el) => {
                const text = $(el).text().replace(/\s+/g, " ").trim();
                if (text && text.length > 0)
                    pricing.push(text);
            });

        const faq = [];
        $(".faq,.accordion,details").each((_, el) => {
            const text = $(el).text().replace(/\s+/g, " ").trim();
            if (text && text.length > 20)
                faq.push(text);
        })


        const ctas = buttons.filter((btn) =>
            /(buy|shop|start|get|order|subscribe|join|sign up|try|book|download)/i.test(btn)
        );

        return { url, title, metaDescription, headings, paragraphs, buttons, ctas, testimonials, pricing, faq, images, forms }
    } catch (err) {
        console.log(err);
        throw new Error(err.message);
    } finally {
        if (browser)
            await browser.close();
    }
}