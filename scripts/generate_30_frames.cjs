const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const seqDir = path.resolve('public/assets/hero/sequence');

// 9 Base Keyframes
const keyframeFiles = [
  'frame-00.jpg', // 0°
  'frame-01.jpg', // 11.25°
  'frame-02.jpg', // 22.5°
  'frame-03.jpg', // 33.75°
  'frame-04.jpg', // 45.0°
  'frame-05.jpg', // 56.25°
  'frame-06.jpg', // 67.5°
  'frame-07.jpg', // 78.75°
  'frame-08.jpg'  // 90.0°
].map(f => path.join(seqDir, f));

const TOTAL_FRAMES = 31; // 0 to 30 => 0° to 90° with 3° step
const WIDTH = 1280;
const HEIGHT = 720;

async function buildSequence() {
  console.log('Pre-processing 9 keyframes to standardized 1280x720 buffers...');
  const keyframeBuffers = await Promise.all(
    keyframeFiles.map(async (file) => {
      return await sharp(file)
        .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'right' })
        .toBuffer();
    })
  );

  console.log(`Generating ${TOTAL_FRAMES} frames (3° per frame from 0° to 90°)...`);

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const angle = i * 3;
    const progress = i / (TOTAL_FRAMES - 1); // 0.0 to 1.0
    const scaled = progress * (keyframeBuffers.length - 1); // 0 to 8
    const lowerIdx = Math.min(Math.floor(scaled), keyframeBuffers.length - 2);
    const fraction = scaled - lowerIdx;

    const frameNum = String(i).padStart(2, '0');
    const outJpg = path.join(seqDir, `box_deg_${frameNum}.jpg`);
    const outWebp = path.join(seqDir, `box_deg_${frameNum}.webp`);

    if (fraction === 0 || i === 0) {
      // Pure keyframe
      await sharp(keyframeBuffers[lowerIdx])
        .jpeg({ quality: 90 })
        .toFile(outJpg);
      await sharp(keyframeBuffers[lowerIdx])
        .webp({ quality: 90 })
        .toFile(outWebp);
    } else if (i === TOTAL_FRAMES - 1) {
      // Last keyframe
      await sharp(keyframeBuffers[keyframeBuffers.length - 1])
        .jpeg({ quality: 90 })
        .toFile(outJpg);
      await sharp(keyframeBuffers[keyframeBuffers.length - 1])
        .webp({ quality: 90 })
        .toFile(outWebp);
    } else {
      // Smooth alpha blend between lowerIdx and lowerIdx + 1
      const upperIdx = lowerIdx + 1;
      
      // Create upper image with modulated alpha channel
      const upperAlphaBuffer = await sharp(keyframeBuffers[upperIdx])
        .ensureAlpha()
        .linear(1, 0) // ensure valid levels
        .raw()
        .toBuffer({ resolveWithObject: true });

      // Modulate alpha bytes by fraction
      const { data, info } = upperAlphaBuffer;
      for (let p = 3; p < data.length; p += 4) {
        data[p] = Math.round(data[p] * fraction);
      }

      const upperWithAlpha = await sharp(data, {
        raw: {
          width: info.width,
          height: info.height,
          channels: 4
        }
      }).png().toBuffer();

      // Composite over lowerIdx
      await sharp(keyframeBuffers[lowerIdx])
        .composite([{ input: upperWithAlpha, blend: 'over' }])
        .jpeg({ quality: 90 })
        .toFile(outJpg);

      await sharp(keyframeBuffers[lowerIdx])
        .composite([{ input: upperWithAlpha, blend: 'over' }])
        .webp({ quality: 90 })
        .toFile(outWebp);
    }

    console.log(`Generated Frame ${frameNum}: ${angle}° -> box_deg_${frameNum}.webp`);
  }

  console.log('✅ All 31 frames generated successfully at 3° increments!');
}

buildSequence().catch(console.error);
