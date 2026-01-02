# PWA Icons Generation

Since PNG icons need to be generated, you have two options:

## Option 1: Use Online Generator
1. Go to https://realfavicongenerator.net/ or https://www.pwabuilder.com/imageGenerator
2. Upload the `icon.svg` file from this folder
3. Download generated icons and place them here

## Option 2: Use ImageMagick (if installed)
Run these commands:
```bash
magick convert icon.svg -resize 72x72 icon-72.png
magick convert icon.svg -resize 96x96 icon-96.png
magick convert icon.svg -resize 128x128 icon-128.png
magick convert icon.svg -resize 144x144 icon-144.png
magick convert icon.svg -resize 152x152 icon-152.png
magick convert icon.svg -resize 192x192 icon-192.png
magick convert icon.svg -resize 384x384 icon-384.png
magick convert icon.svg -resize 512x512 icon-512.png
```

## Option 3: Quick Fallback
The PWA will still work without icons - it will just use a default browser icon.
To make icons work immediately, you can reference the SVG directly.

## Required Icons:
- icon-72.png (72x72)
- icon-96.png (96x96)
- icon-128.png (128x128)
- icon-144.png (144x144)
- icon-152.png (152x152)
- icon-192.png (192x192)
- icon-384.png (384x384)
- icon-512.png (512x512)
