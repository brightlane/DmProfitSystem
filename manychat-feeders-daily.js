#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

class ManyChatFeedersDaily {
  constructor() {
    this.outputDir  = path.join(__dirname, 'output', 'manychat');
    this.socialDir  = path.join(__dirname, 'output');
    this.siteUrl    = 'https://bot.yourdomain.com'; // CHANGE THIS

    this.affiliates = [
      'https://manychat.partnerlinks.io/nwkkk7vkps17',
      'https://manychat.partnerlinks.io/98hj6b3pr28k-4znb59',
      'https://manychat.partnerlinks.io/emwcbue22i01-ogcg6e',
      'https://manychat.partnerlinks.io/t8let4hhqtqg-wki14',
      'https://manychat.partnerlinks.io/bbwxetk27f88-64kfxo',
      'https://manychat.partnerlinks.io/bjhrx464venp-rhhbp',
      'https://manychat.partnerlinks.io/8k59yhm0l32j-z7dk2i',
      'https://manychat.partnerlinks.io/sk9ifozlcocn-3j171d',
      'https://manychat.partnerlinks.io/4hllj0cn47y5-w7fish',
      'https://manychat.partnerlinks.io/4xn0uxepdx0d-ujubb',
      'https://manychat.partnerlinks.io/fsbpv50o2t2b-orca59',
      'https://manychat.partnerlinks.io/57bltjtmr5tj-tz7ji'
    ];

    this.countries = ['us','gb','eu','in','au','ca','jp','cn','za','br','mx','ae'];
    this.currencies = [
      {code:'USD', symbol:'$', country:'us', rate:1.0},
      {code:'GBP', symbol:'£', country:'gb', rate:0.78},
      {code:'EUR', symbol:'€', country:'eu', rate:0.92},
      {code:'INR', symbol:'₹', country:'in', rate:83},
      {code:'AUD', symbol:'A$', country:'au', rate:1.5},
      {code:'CAD', symbol:'C$', country:'ca', rate:1.35},
      {code:'JPY', symbol:'¥', country:'jp', rate:150},
      {code:'CNY', symbol:'¥', country:'cn', rate:7.1},
      {code:'ZAR', symbol:'R', country:'za', rate:18},
      {code:'BRL', symbol:'R$', country:'br', rate:5.5},
      {code:'MXN', symbol:'MX$', country:'mx', rate:20},
      {code:'AED', symbol:'د.إ', country:'ae', rate:3.67}
    ];

    this.templates = ['starter','pro','business'];

    this.socialLines = {
      tiktok: [],
      reddit: [],
      twitter: []
    };
  }

  async run() {
    console.log('🚀 MANYCHAT 240K + SOCIAL FEEDERS DAILY RUN');

    fs.mkdirSync(this.outputDir, { recursive: true });
    fs.mkdirSync(this.socialDir, { recursive: true });

    const pages = [];
    let count = 0;

    for (const country of this.countries) {
      for (const template of this.templates) {
        const currency = this.currencies.find(c => c.country === country);
        if (!currency) continue;

        const base = 60 + Math.floor(Math.random() * 140);
        const price = Math.round(base * currency.rate);
        const affLink   = this.pickAffiliate(country);
        const planName  = this.templateToPlan(template);
        const planShort = planName.toLowerCase();

        const html = this.generatePage(
          country,
          currency,
          template,
          planName,
          affLink,
          price
        );

        const countryParts = country.toUpperCase();
        const priceStr = `${currency.symbol}${price}`;
        const pageUrl = `${this.siteUrl}/manychat/${country}-${template}-${currency.code.toLowerCase()}.html`;

        const pageTitle = `ManyChat ${planName} | ${countryParts}`;

        // 1. TikTok line
        this.socialLines.tiktok.push(
          `🚀 Join ManyChat affiliate → 50% commission on ${pageTitle}:\n${priceStr}/mo plan\n${affLink}\n${pageUrl}`
        );

        // 2. Reddit line
        this.socialLines.reddit.push(
          `[ManyChat ${planName} | ${countryParts}]((${affLink}))\n${priceStr}/mo ManyChat affiliate plan → 50% commission for 12 months.\n${pageUrl}`
        );

        // 3. Twitter line
        this.socialLines.twitter.push(
          `🚀 ManyChat ${plenName} | ${countryParts}\n${priceStr}/mo via ManyChat affiliate\n${affLink}\n${pageUrl}`
        );

        const filename = `${country}-${template}-${currency.code.toLowerCase()}.html`;
        const filepath = path.join(this.outputDir, filename);

        fs.writeFileSync(filepath, html, 'utf8');

        pages.push({
          loc: `${this.siteUrl}/manychat/${filename}`,
          lastmod: new Date().toISOString(),
          priority: '0.8'
        });

        count++;
      }
    }

    // Write social‑ready files
    fs.writeFileSync(
      path.join(this.socialDir, 'social-ready-tiktok.txt'),
      this.socialLines.tiktok.join('\n\n') + '\n',
      'utf8'
    );
    fs.writeFileSync(
      path.join(this.socialDir, 'social-ready-reddit.txt'),
      this.socialLines.reddit.join('\n\n') + '\n',
      'utf8'
    );
    fs.writeFileSync(
      path.join(this.socialDir, 'social-ready-twitter.txt'),
      this.socialLines.twitter.join('\n\n') + '\n',
      'utf8'
    );

    this.writeSitemaps(pages);
    this.pingEngines();

    console.log(`✅ COMPLETE: ${count} ManyChat pages generated`);
    console.log(`📁 ./output/manychat/`);
    console.log(`📁 Social feeds: ./output/social-ready-*.txt`);
  }

  pickAffiliate(country) {
    const idx = this.countries.indexOf(country) % this.affiliates.length;
    return this.affiliates[idx];
  }

  templateToPlan(template) {
    const map = {starter:'Starter', pro:'Pro', business:'Business'};
    return map[template] || 'Plan';
  }

  generatePage(country, currency, template, planName, affLink, price) {
    const title = `${currency.symbol}${price}/mo ManyChat ${planName} | ${country.toUpperCase()}`;
    const desc  = `Join ManyChat affiliate program and earn 50% commission in ${currency.code}.`;

    return `<!DOCTYPE html>
<html lang="${country}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1" />

  <title>${title}</title>
  <meta name="description" content="${desc}" />

  <link rel="canonical" href="${this.siteUrl}/manychat/${country}-${template}-${currency.code.toLowerCase()}.html" />

  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "name": "ManyChat ${planName} Plan",
  "offers": {
    "@type": "Offer",
    "price": "${price}",
    "priceCurrency": "${currency.code}"
  }
}
</script>
</head>
<body>
  <div style="text-align:center;padding:40px">
    <h1>🎉 ManyChat ${planName}</h1>
    <p>${currency.symbol}${price}/mo ManyChat affiliate commission plan</p>
    <p><strong>Click here → ${affLink}</strong></p>
  </div>
</body>
</html>`;
  }

  writeSitemaps(pages) {
    const CHUNK_SIZE = 45000;
    const chunks = [];

    for (let i = 0; i < pages.length; i += CHUNK_SIZE) {
      chunks.push(pages.slice(i, i + CHUNK_SIZE));
    }

    chunks.forEach((chunk, i) => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk.map(p => `<url><loc>${p.loc}</loc><lastmod>${p.lastmod}</lastmod><priority>${p.priority}</priority></url>`).join('')}
</urlset>`;
      fs.writeFileSync(path.join(this.socialDir, `sitemap-manychat-${i + 1}.xml`), xml);
    });
  }

  pingEngines() {
    const indexUrl = `${this.siteUrl}/output/sitemap-manychat-1.xml`;
    console.log(`📡 Ping Google: https://www.google.com/ping?sitemap=${indexUrl}`);
    console.log(`📡 Ping Bing: https://www.bing.com/ping?sitemap=${indexUrl}`);
  }
}

new ManyChatFeedersDaily().run();
