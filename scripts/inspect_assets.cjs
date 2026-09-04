const sharp = require('sharp');
const path = require('path');

const uploads = [
  'C:/Users/SIRI/.gemini/antigravity-ide/brain/e8cd4b85-1f10-4bac-a4b8-b1c9bc08ed51/.user_uploaded/media_1787821694152.png',
  'C:/Users/SIRI/.gemini/antigravity-ide/brain/e8cd4b85-1f10-4bac-a4b8-b1c9bc08ed51/.user_uploaded/media_1787821705015.png',
  'C:/Users/SIRI/.gemini/antigravity-ide/brain/e8cd4b85-1f10-4bac-a4b8-b1c9bc08ed51/.user_uploaded/media_1787821712591.jpg',
  'C:/Users/SIRI/.gemini/antigravity-ide/brain/e8cd4b85-1f10-4bac-a4b8-b1c9bc08ed51/.user_uploaded/media_1787821719882.png',
];

async function main() {
  for (let i = 0; i < uploads.length; i++) {
    const meta = await sharp(uploads[i]).metadata();
    console.log(`Image ${i + 1}: ${uploads[i]} -> ${meta.width}x${meta.height}`);
  }
}

main().catch(console.error);
