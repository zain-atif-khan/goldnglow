const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\SIRI\\.gemini\\antigravity-ide\\brain\\e8cd4b85-1f10-4bac-a4b8-b1c9bc08ed51';
const assetsDir = path.join(__dirname, '../public/assets');

const copyMap = [
  { src: 'hero_bangles_luxury_1787824435736.jpg', dest: 'hero/hero-bangles.png' },
  { src: 'hero_bangles_luxury_1787824435736.jpg', dest: 'hero/hero-bangles-luxury.jpg' },
  { src: 'bridal_heritage_stack_1787824471938.jpg', dest: 'founder-picks/bridal-heritage.png' },
  { src: 'bridal_heritage_stack_1787824471938.jpg', dest: 'collections/large-bridal-heritage.png' },
  { src: 'bridal_heritage_stack_1787824471938.jpg', dest: 'collections/bridal-heritage.jpg' },
  { src: 'emerald_elegance_stack_1787824508130.jpg', dest: 'founder-picks/emerald-elegance.png' },
  { src: 'emerald_elegance_stack_1787824508130.jpg', dest: 'collections/large-classic-collection.png' },
  { src: 'diamond_classics_stack_1787824538818.jpg', dest: 'founder-picks/diamond-classics.png' },
  { src: 'contemporary_chic_stack_1787824568941.jpg', dest: 'collections/contemporary-chic.jpg' },
  { src: 'festive_jadau_stack_1787824604078.jpg', dest: 'collections/large-festive-edit.png' },
  { src: 'festive_jadau_stack_1787824604078.jpg', dest: 'collections/festive-edit.jpg' },
  { src: 'statement_luxury_stack_1787824636173.jpg', dest: 'collections/large-statement-collection.png' },
  { src: 'statement_luxury_stack_1787824636173.jpg', dest: 'collections/statement-collection.jpg' },
  { src: 'store_boutique_interior_1787824669737.jpg', dest: 'store/store-interior-main.jpg' },
  { src: 'pink_trousseau_box_1787824705586.jpg', dest: 'cta/pink-jewellery-box.png' },
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
console.log('All ultra-crisp assets updated!');
