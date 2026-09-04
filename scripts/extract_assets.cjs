const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const img1 = 'C:/Users/SIRI/.gemini/antigravity-ide/brain/e8cd4b85-1f10-4bac-a4b8-b1c9bc08ed51/.user_uploaded/media_1787821694152.png';
const img2 = 'C:/Users/SIRI/.gemini/antigravity-ide/brain/e8cd4b85-1f10-4bac-a4b8-b1c9bc08ed51/.user_uploaded/media_1787821705015.png';
const img3 = 'C:/Users/SIRI/.gemini/antigravity-ide/brain/e8cd4b85-1f10-4bac-a4b8-b1c9bc08ed51/.user_uploaded/media_1787821712591.jpg';
const img4 = 'C:/Users/SIRI/.gemini/antigravity-ide/brain/e8cd4b85-1f10-4bac-a4b8-b1c9bc08ed51/.user_uploaded/media_1787821719882.png';

const baseDir = path.join(__dirname, '..', 'public', 'assets');

const crops = [
  // Brand
  { file: img1, out: 'brand/logo.png', region: { left: 10, top: 40, width: 170, height: 48 } },
  { file: img1, out: 'brand/logo-emblem.png', region: { left: 12, top: 40, width: 44, height: 44 } },
  
  // Hero
  { file: img1, out: 'hero/hero-bangles.png', region: { left: 330, top: 95, width: 345, height: 345 } },
  { file: img1, out: 'hero/hero-full-bg.png', region: { left: 0, top: 90, width: 682, height: 355 } },
  
  // Signature strip (Image 1)
  { file: img1, out: 'collections/strip-bridal.png', region: { left: 15, top: 488, width: 92, height: 120 } },
  { file: img1, out: 'collections/strip-festive.png', region: { left: 112, top: 488, width: 92, height: 120 } },
  { file: img1, out: 'collections/strip-classic.png', region: { left: 208, top: 488, width: 92, height: 120 } },
  { file: img1, out: 'collections/strip-contemporary.png', region: { left: 304, top: 488, width: 92, height: 120 } },
  { file: img1, out: 'collections/strip-statement.png', region: { left: 400, top: 488, width: 92, height: 120 } },
  { file: img1, out: 'collections/strip-premium.png', region: { left: 496, top: 488, width: 92, height: 120 } },

  // Founder (Image 2 has great high resolution)
  { file: img2, out: 'founder/syed-owais-ahmed.png', region: { left: 262, top: 18, width: 240, height: 285 } },
  { file: img1, out: 'founder/founder-signature.png', region: { left: 20, top: 850, width: 125, height: 30 } },

  // Founder's Picks (Image 2)
  { file: img2, out: 'founder-picks/emerald-elegance.png', region: { left: 42, top: 460, width: 195, height: 120 } },
  { file: img2, out: 'founder-picks/bridal-heritage.png', region: { left: 245, top: 460, width: 195, height: 120 } },
  { file: img2, out: 'founder-picks/diamond-classics.png', region: { left: 448, top: 460, width: 195, height: 120 } },

  // Signature Collections (Image 2 - 4 large cards)
  { file: img2, out: 'collections/large-bridal-heritage.png', region: { left: 12, top: 775, width: 155, height: 170 } },
  { file: img2, out: 'collections/large-classic-collection.png', region: { left: 177, top: 775, width: 155, height: 170 } },
  { file: img2, out: 'collections/large-festive-edit.png', region: { left: 342, top: 775, width: 155, height: 170 } },
  { file: img2, out: 'collections/large-statement-collection.png', region: { left: 507, top: 775, width: 155, height: 170 } },

  // Section 07 - Why Gold N Glow (Image 3: 1024x819)
  { file: img3, out: 'why-us/why-bangle-banner.jpg', region: { left: 435, top: 22, width: 310, height: 265 } },

  // Section 08 - Store Experience (Image 3)
  { file: img3, out: 'store/store-interior-main.jpg', region: { left: 335, top: 450, width: 360, height: 235 } },
  { file: img3, out: 'store/store-exterior.jpg', region: { left: 700, top: 450, width: 235, height: 120 } },
  { file: img3, out: 'store/store-showcase.jpg', region: { left: 700, top: 575, width: 135, height: 110 } },
  { file: img3, out: 'store/store-customers.jpg', region: { left: 840, top: 575, width: 170, height: 110 } },

  // Section 09 - Testimonials (Image 3)
  { file: img3, out: 'testimonials/sana-farheen.jpg', region: { left: 318, top: 745, width: 88, height: 110 } },
  { file: img3, out: 'testimonials/farah-family.jpg', region: { left: 543, top: 745, width: 90, height: 110 } },
  { file: img3, out: 'testimonials/neha-reddy.jpg', region: { left: 768, top: 745, width: 90, height: 110 } },

  // Section 10 - Journal (Image 4: 723x1024)
  { file: img4, out: 'journal/journal-top-bangles.png', region: { left: 435, top: 15, width: 280, height: 225 } },
  { file: img4, out: 'journal/journal-how-to-choose.png', region: { left: 48, top: 247, width: 152, height: 98 } },
  { file: img4, out: 'journal/journal-bridal-guide.png', region: { left: 210, top: 247, width: 152, height: 98 } },
  { file: img4, out: 'journal/journal-style-tips.png', region: { left: 368, top: 247, width: 152, height: 98 } },
  { file: img4, out: 'journal/journal-premium-bangles.png', region: { left: 525, top: 247, width: 152, height: 98 } },

  // Section 11 - Final CTA (Image 4)
  { file: img4, out: 'cta/pink-jewellery-box.png', region: { left: 375, top: 445, width: 345, height: 265 } }
];

async function extract() {
  for (const crop of crops) {
    const dest = path.join(baseDir, crop.out);
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    try {
      await sharp(crop.file)
        .extract(crop.region)
        .toFile(dest);
      console.log(`Extracted: ${crop.out}`);
    } catch (err) {
      console.error(`Failed to extract ${crop.out}:`, err.message);
    }
  }
  console.log('All crops finished successfully!');
}

extract().catch(console.error);
