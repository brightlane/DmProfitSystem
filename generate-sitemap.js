const fs = require("fs");
const path = require("path");

const BASE_URL = "https://yoursite.com"; // change this
const ROOT_DIR = "./"; // or "./pages" if you use a folder

function getHtmlFiles(dir) {
  let results = [];

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith(".html")) {
      results.push(fullPath);
    }
  });

  return results;
}

const files = getHtmlFiles(ROOT_DIR);

// Convert file paths → URLs
const urls = files.map(file => {
  return (
    BASE_URL +
    "/" +
    file
      .replace(/\\/g, "/")
      .replace("./", "")
  );
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
  </url>
`).join("")}
</urlset>`;

fs.writeFileSync("sitemap.xml", sitemap);

console.log("✅ Sitemap generated with", urls.length, "pages");
