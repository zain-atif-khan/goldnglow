const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const img3 = 'C:\\Users\\SIRI\\.gemini\\antigravity-ide\\brain\\e8cd4b85-1f10-4bac-a4b8-b1c9bc08ed51\\.user_uploaded\\media_1787821712591.jpg';
const baseDir = path.join(__dirname, '../public/assets');

async function fixStore() {
  const meta = await sharp(img3).metadata();
  console.log('Img3 size:', meta.width, meta.height);

  // Precision crops for Section 08:
  // Store Interior Main: left 335, top 455, width 360, height 175
  // Store Exterior: left 700, top 455, width 230, height 90
  // Store Showcase: left 700, top 550, width 110, height 80
  // Store Customers: left 815, top 550, width 120, height 80

  const storeCrops = [
    { out: 'store/store-interior-main.jpg', region: { left: 335, top: 455, width: 360, height: 175 } },
    { out: 'store/store-exterior.jpg', region: { left: 700, top: 455, width: 235, height: 90 } },
    { out: 'store/store-showcase.jpg', region: { left: 700, top: 550, width: 112, height: 80 } },
    { out: 'store/store-customers.jpg', region: { left: 818, top: 550, width: 120, height: 80 } },
  ];

  for (const c of storeCrops) {
    const dest = path.join(baseDir, c.out);
    await sharp(img3).extract(c.region).toFile(dest);
    console.log(`Re-cropped ${c.out}`);
  }
}

fixStore().catch(console.error);
