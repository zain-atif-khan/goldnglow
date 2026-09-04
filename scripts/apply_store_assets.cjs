const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\SIRI\\.gemini\\antigravity-ide\\brain\\e8cd4b85-1f10-4bac-a4b8-b1c9bc08ed51';
const assetsDir = path.join(__dirname, '../public/assets');

const copyMap = [
  { src: 'why_bangles_banner_luxury_1787825591512.jpg', dest: 'why-us/why-bangle-banner.jpg' },
  { src: 'store_exterior_luxury_1787825631529.jpg', dest: 'store/store-exterior.jpg' },
  { src: 'store_showcase_luxury_1787825667502.jpg', dest: 'store/store-showcase.jpg' },
  { src: 'store_consultation_luxury_1787825713579.jpg', dest: 'store/store-customers.jpg' },
];

for (const item of copyMap) {
  const srcPath = path.join(brainDir, item.src);
  const destPath = path.join(assetsDir, item.dest);
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${item.src} -> ${item.dest}`);
  } else {
    console.warn(`Source not found: ${srcPath}`);
  }
}
console.log('Clean store & why-us assets updated!');
