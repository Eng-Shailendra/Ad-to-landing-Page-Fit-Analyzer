# Ad-to-Landing Page Fit Analyzer

An AI-powered tool that analyzes whether an advertisement matches its landing page experience.

## Features

- Upload ad image or paste ad copy
- Scrape landing page content automatically
- AI analysis using Gemini 2.5 Flash
- Detailed CRO report
- Persona alignment
- Offer consistency
- CTA analysis
- Proof analysis
- Actionable recommendations

## Tech Stack

Frontend

- React
- Tailwind CSS
- Axios

Backend

- Express.js
- Playwright + cheerio for web scraping
- Google Gemini API
- Multer

## Installation

cd Backend
npm install
npm run dev

cd Frontend
npm install
npm run dev

**Backend api test use**

```
http://loaclhost:5000/api/v1/analyze

```

User can test the api using postman or any other api testing tool.
by sending a POST request with the following JSON body:

```json
{
  "adImage": "base64_encoded_image_string",
  "adCopy": "Your ad copy here",
  "landingPageUrl": "https://example.com/landing-page"
}
```
