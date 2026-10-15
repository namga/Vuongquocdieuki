#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const androidRoot = path.join(root, 'android');
const source = path.join(root, 'www', 'assets', 'icon-512.png');
if (!fs.existsSync(source)) {
  console.error('Missing branded icon:', source);
  process.exit(1);
}
if (!fs.existsSync(androidRoot)) {
  console.error('Android project does not exist yet.');
  process.exit(1);
}
const res = path.join(androidRoot, 'app', 'src', 'main', 'res');
const sizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};
const temp = path.join(root, '.icon-build-temp');
fs.mkdirSync(temp, { recursive: true });
try {
  for (const [folder, size] of Object.entries(sizes)) {
    const outDir = path.join(res, folder);
    fs.mkdirSync(outDir, { recursive: true });
    const out = path.join(outDir, 'ic_launcher.png');
    const round = path.join(outDir, 'ic_launcher_round.png');
    // ImageMagick is available on GitHub ubuntu runners. Fall back to copying
    // the 512px PNG only if ImageMagick is unavailable; Android can still load it.
    try {
      execFileSync('convert', [source, '-resize', `${size}x${size}`, out]);
      execFileSync('convert', [source, '-resize', `${size}x${size}`, round]);
    } catch (e) {
      fs.copyFileSync(source, out);
      fs.copyFileSync(source, round);
    }
  }
  // Android adaptive icon XML: use the branded square image as foreground and
  // a solid green background. The foreground uses a safe inset.
  const anydpi = path.join(res, 'mipmap-anydpi-v26');
  fs.mkdirSync(anydpi, { recursive: true });
  fs.writeFileSync(path.join(anydpi, 'ic_launcher.xml'),
    '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n' +
    '  <background android:drawable="@color/ic_launcher_background"/>\n' +
    '  <foreground android:drawable="@mipmap/ic_launcher_foreground"/>\n' +
    '</adaptive-icon>\n');
  fs.writeFileSync(path.join(anydpi, 'ic_launcher_round.xml'),
    '<?xml version="1.0" encoding="utf-8"?>\n' +
    '<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n' +
    '  <background android:drawable="@color/ic_launcher_background"/>\n' +
    '  <foreground android:drawable="@mipmap/ic_launcher_foreground"/>\n' +
    '</adaptive-icon>\n');
  const fgDir = path.join(res, 'drawable');
  fs.mkdirSync(fgDir, { recursive: true });
  try {
    execFileSync('convert', [source, '-resize', '432x432', path.join(res, 'mipmap-xxxhdpi', 'ic_launcher_foreground.png')]);
  } catch {
    fs.copyFileSync(source, path.join(res, 'mipmap-xxxhdpi', 'ic_launcher_foreground.png'));
  }
  // Reference the foreground bitmap from mipmap resource so generated XML resolves.
  const values = path.join(res, 'values');
  fs.mkdirSync(values, { recursive: true });
  const colorsFile = path.join(values, 'ic_launcher_background.xml');
  fs.writeFileSync(colorsFile,
    '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n' +
    '  <color name="ic_launcher_background">#2D9463</color>\n' +
    '</resources>\n');
  console.log('Applied Bé Học Vui app icon to Android mipmap resources.');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
