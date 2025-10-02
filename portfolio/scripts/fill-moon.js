const sharp = require('sharp');
const path = require('path');

(async () => {
  try {
    const inputPath = path.join(__dirname, '..', 'public', 'moon.png');
    const outputPath = path.join(__dirname, '..', 'public', 'moon_filled.png');

    const img = sharp(inputPath).ensureAlpha();
    const meta = await img.metadata();
    const width = meta.width || 800;
    const height = meta.height || 800;

    // Create a mask where near-white becomes transparent. We threshold bright pixels
    // (likely background) and invert so the foreground remains opaque in the mask.
    const maskBuffer = await img
      .clone()
      .removeAlpha()
      .greyscale()
      .threshold(240) // pixels >= 240 become white (background)
      .negate() // invert: foreground is white in mask
      .toBuffer();

    // Apply the mask to the original image (dest-in keeps the masked-area)
    const maskedBuffer = await img
      .clone()
      .composite([{ input: maskBuffer, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // Create a solid navy background and composite the masked moon over it
    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: '#021227'
      }
    })
      .composite([{ input: maskedBuffer, blend: 'over' }])
      .png()
      .toFile(outputPath);

    console.log('Created', outputPath);
  } catch (err) {
    console.error('Error processing image:', err);
    process.exit(1);
  }
})();
