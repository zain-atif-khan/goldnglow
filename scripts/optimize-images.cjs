/**
 * Image Optimization Script for Gold N Glow
 * Run from project root: node scripts/optimize-images.cjs
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(process.cwd(), 'public', 'assets');

const targets = [
  { input: 'hero/hero-mobile-bg.png',     output: 'hero/hero-mobile-bg.webp',     width: 480,  quality: 80 },
  { input: 'hero/hero-bangles.png',        output: 'hero/hero-bangles.webp',        width: 800,  quality: 80 },
  { input: 'hero/hero-exact-bg.jpg',       output: 'hero/hero-exact-bg.webp',       width: 1440, quality: 82 },
  { input: 'hero/hero-full-bg.png',        output: 'hero/hero-full-bg.webp',        width: 1440, quality: 82 },
  { input: 'showcase/bangles-1-polki.jpg',      output: 'showcase/bangles-1-polki.webp',      width: 900, quality: 78 },
  { input: 'showcase/bangles-2-meenakari.jpg',  output: 'showcase/bangles-2-meenakari.webp',  width: 900, quality: 78 },
  { input: 'showcase/bangles-3-cz.jpg',         output: 'showcase/bangles-3-cz.webp',         width: 900, quality: 78 },
  { input: 'showcase/bangles-4-basra.jpg',      output: 'showcase/bangles-4-basra.webp',      width: 900, quality: 78 },
  { input: 'showcase/bangles-5-antique.jpg',    output: 'showcase/bangles-5-antique.webp',    width: 900, quality: 78 },
  { input: 'showcase/bangles-6-emerald.jpg',    output: 'showcase/bangles-6-emerald.webp',    width: 900, quality: 78 },
  { input: 'showcase/bangles-7-crystal.jpg',    output: 'showcase/bangles-7-crystal.webp',    width: 900, quality: 78 },
  { input: 'journal/journal-card-1.jpg',  output: 'journal/journal-card-1.webp',  width: 600, quality: 78 },
  { input: 'journal/journal-card-2.jpg',  output: 'journal/journal-card-2.webp',  width: 600, quality: 78 },
  { input: 'journal/journal-card-3.jpg',  output: 'journal/journal-card-3.webp',  width: 600, quality: 78 },
  { input: 'journal/journal-card-4.jpg',  output: 'journal/journal-card-4.webp',  width: 600, quality: 78 },
  { input: 'journal/journal-hero-bg.png', output: 'journal/journal-hero-bg.webp', width: 1440, quality: 80 },
  { input: 'cta/cta-box-bg.png',          output: 'cta/cta-box-bg.webp',          width: 1440, quality: 80 },
  { input: 'store/store-exterior.jpg',        output: 'store/store-exterior.webp',        width: 900, quality: 78 },
  { input: 'store/store-interior-main.jpg',   output: 'store/store-interior-main.webp',   width: 900, quality: 78 },
  { input: 'store/store-customers.jpg',       output: 'store/store-customers.webp',       width: 900, quality: 78 },
  { input: 'collections/velvet-silk-thread.jpg',    output: 'collections/velvet-silk-thread.webp',    width: 800, quality: 78 },
  { input: 'collections/festive-edit.jpg',           output: 'collections/festive-edit.webp',           width: 800, quality: 78 },
  { input: 'collections/large-festive-edit.png',     output: 'collections/large-festive-edit.webp',     width: 1200, quality: 78 },
  { input: 'collections/sapphire-cz-bangles.jpg',    output: 'collections/sapphire-cz-bangles.webp',    width: 800, quality: 78 },
  { input: 'collections/bridal-heritage.jpg',        output: 'collections/bridal-heritage.webp',        width: 800, quality: 78 },
  { input: 'collections/large-bridal-heritage.png',  output: 'collections/large-bridal-heritage.webp',  width: 1200, quality: 78 },
  { input: 'collections/jadau-openable.jpg',          output: 'collections/jadau-openable.webp',          width: 800, quality: 78 },
  { input: 'collections/large-classic-collection.png', output: 'collections/large-classic-collection.webp', width: 1200, quality: 78 },
];

async function optimizeImages() {
  let totalOriginal = 0;
  let totalOptimized = 0;
  let converted = 0;
  let skipped = 0;

  for (const { input, output, width, quality } of targets) {
    const inputPath = path.join(ASSETS_DIR, input);
    const outputPath = path.join(ASSETS_DIR, output);

    if (!fs.existsSync(inputPath)) {
      console.log('  SKIP: ' + input);
      skipped++;
      continue;
    }

    const origSize = fs.statSync(inputPath).size;
    totalOriginal += origSize;

    try {
      await sharp(inputPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 4 })
        .toFile(outputPath);

      const newSize = fs.statSync(outputPath).size;
      totalOptimized += newSize;
      const savings = Math.round((1 - newSize / origSize) * 100);
      console.log('  OK ' + path.basename(input) + ' -> ' + path.basename(output) + '  (' + Math.round(origSize/1024) + 'KB -> ' + Math.round(newSize/1024) + 'KB, -' + savings + '%)');
      converted++;
    } catch (err) {
      console.error('  FAIL ' + input + ': ' + err.message);
      skipped++;
    }
  }

  console.log('\nDone: ' + converted + ' converted, ' + skipped + ' skipped');
  if (totalOriginal > 0) {
    console.log('Savings: ' + Math.round(totalOriginal/1024) + 'KB -> ' + Math.round(totalOptimized/1024) + 'KB (' + Math.round((1 - totalOptimized/totalOriginal) * 100) + '% smaller)');
  }
}

optimizeImages().catch(console.error);
