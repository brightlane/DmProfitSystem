const fs = require("fs");
const path = require("path");

console.log("🚀 Feeders starting...");

// output folder
const outputDir = path.join(__dirname, "../output/manychat");

// ensure folder exists
fs.mkdirSync(outputDir, { recursive: true });

// generate HTML pages
for (let i = 1; i <= 10; i++) {
  const filePath = path.join(outputDir, `page-${i}.html`);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>ManyChat Page ${i}</title>
</head>
<body>
  <h1>Page ${i}</h1>
  <p>Generated automatically by feeders script.</p>
</body>
</html>
`;

  fs.writeFileSync(filePath, html.trim());
}

console.log("✅ Feeders completed successfully");
