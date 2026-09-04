const sharp = require('sharp');
const path = require('path');

const img3 = 'C:/Users/SIRI/.gemini/antigravity-ide/brain/e8cd4b85-1f10-4bac-a4b8-b1c9bc08ed51/.user_uploaded/media_1787821712591.jpg';
const baseDir = path.join(__dirname, '..', 'public', 'assets');

async function fixTestimonials() {
  // Testimonials in Image 3 are located around top 650-810
  // Let's crop:
  // Sana Farheen: left: 315, top: 660, width: 90, height: 130
  // Farah & Family: left: 540, top: 660, width: 95, height: 130
  // Neha Reddy: left: 765, top: 660, width: 95, height: 130
  
  const testCrops = [
    { out: 'testimonials/sana-farheen.jpg', region: { left: 315, top: 650, width: 92, height: 135 } },
    { out: 'testimonials/farah-family.jpg', region: { left: 540, top: 650, width: 95, height: 135 } },
    { out: 'testimonials/neha-reddy.jpg', region: { left: 765, top: 650, width: 95, height: 135 } },
  ];

  for (const crop of testCrops) {
    const dest = path.join(baseDir, crop.out);
    try {
      await sharp(img3).extract(crop.region).toFile(dest);
      console.log(`Successfully extracted ${crop.out}`);
    } catch (e) {
      console.error(`Error on ${crop.out}:`, e.message);
    }
  }
}

fixTestimonials();
