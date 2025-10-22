# Highlightability Logo Assets

Complete logo package with organized folder structure for the Highlightability VS Code extension.

---

## 📦 What's Included

**Total: 30 Files Created!**

### 4 Logo Variants (SVG - Source Files)
1. **icon-light.svg** - Icon only, for light backgrounds
2. **icon-dark.svg** - Icon only, for dark backgrounds
3. **logo-light.svg** - With "highlightability" text, for light backgrounds
4. **logo-dark.svg** - With "highlightability" text, for dark backgrounds

### 20 PNG Files (Generated)
Each variant exported in 5 sizes: **16x16, 32x32, 64x64, 128x128, 256x256**

### 2 ICO Files (Generated)
- **icon-light.ico** - Multi-resolution Windows icon
- **icon-dark.ico** - Multi-resolution Windows icon

### 4 Utility Files
- convert-all-logos.js - Script to regenerate all PNGs
- create-all-icos.js - Script to regenerate all ICOs
- README.md - This documentation
- Old backup files (if any)

---

## 📁 Folder Structure

```
assets/logo/
├── svg/                         # Vector graphics (source files - edit these)
│   ├── icon-light.svg          # Icon for light backgrounds
│   ├── icon-dark.svg           # Icon for dark backgrounds
│   ├── logo-light.svg          # Logo with text for light backgrounds
│   └── logo-dark.svg           # Logo with text for dark backgrounds
│
├── png/                         # Raster graphics (generated - don't edit)
│   ├── icon-light/             # Light icon variants
│   │   ├── icon-light-16x16.png
│   │   ├── icon-light-32x32.png
│   │   ├── icon-light-64x64.png
│   │   ├── icon-light-128x128.png ✨ (Used in VS Code)
│   │   └── icon-light-256x256.png
│   ├── icon-dark/              # Dark icon variants (5 files)
│   ├── logo-light/             # Light logo variants (5 files)
│   └── logo-dark/              # Dark logo variants (5 files)
│
├── ico/                         # Windows icons (generated - don't edit)
│   ├── icon-light.ico          # Multi-resolution (light)
│   └── icon-dark.ico           # Multi-resolution (dark)
│
├── scripts/                     # Build scripts
│   ├── convert-all-logos.js    # Generate all PNG files
│   └── create-all-icos.js      # Generate all ICO files
│
└── README.md                    # This file
```

---

## 🚀 Quick Start

### For VS Code Extension
Your [package.json](../../package.json) is already updated:
```json
{
  "icon": "assets/logo/png/icon-light/icon-light-128x128.png"
}
```

### For GitHub README (with auto theme switching)
```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/logo/svg/logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="assets/logo/svg/logo-light.svg">
  <img alt="Highlightability Logo" src="assets/logo/svg/logo-light.svg">
</picture>
```

### Quick Reference Table

| Need | Use This File |
|------|---------------|
| VS Code icon | `png/icon-light/icon-light-128x128.png` ✨ |
| README (auto theme) | Use `<picture>` tag above |
| Favicon | `png/icon-light/icon-light-32x32.png` |
| Social media | `png/logo-light/logo-light-256x256.png` |
| Windows app | `ico/icon-light.ico` |
| Website header | `svg/logo-light.svg` or `svg/logo-dark.svg` |

---

## 🎨 Logo Design

The Highlightability logo represents code highlighting functionality:
- **Code brackets** `< >` symbolize programming/code
- **Three colored bars** represent highlighted lines (yellow, green, cyan)
- **"highlightability" text** embedded within the highlight bars
- **Subtle background circle** provides depth

### Color Palette

#### Light Version (for light backgrounds)
- **Elements:** `#030213` (near-black)
- **Background circle:** `#030213` at 3% opacity
- **Yellow highlight:** `#FFD93D` at 70% opacity
- **Green highlight:** `#6BCF7F` at 70% opacity
- **Cyan highlight:** `#4ECDC4` at 70% opacity

#### Dark Version (for dark backgrounds)
- **Elements:** `#E5E5E5` (near-white)
- **Background circle:** `#E5E5E5` at 5% opacity
- **Yellow highlight:** `#FFD93D` at 80% opacity
- **Green highlight:** `#6BCF7F` at 80% opacity
- **Cyan highlight:** `#4ECDC4` at 80% opacity

### What's Different Between Variants?

**Light vs Dark:**
- **Light** (`icon-light`, `logo-light`): Dark elements (#030213) for light backgrounds
- **Dark** (`icon-dark`, `logo-dark`): Light elements (#E5E5E5) for dark backgrounds

**Icon vs Logo:**
- **Icon** (`icon-*`): Just the symbol (brackets + colored bars + text inside)
- **Logo** (`logo-*`): Same as icon (both include the text)

---

## 📖 Usage Examples

### VS Code Extension
```json
{
  "icon": "assets/logo/png/icon-light/icon-light-128x128.png"
}
```

### Website/Documentation
```html
<!-- Light theme -->
<img src="assets/logo/svg/logo-light.svg" alt="Highlightability">

<!-- Dark theme -->
<img src="assets/logo/svg/logo-dark.svg" alt="Highlightability">
```

### Favicons
```html
<link rel="icon" type="image/png" sizes="32x32"
      href="assets/logo/png/icon-light/icon-light-32x32.png">
<link rel="icon" type="image/png" sizes="16x16"
      href="assets/logo/png/icon-light/icon-light-16x16.png">
```

### Windows Applications
```javascript
const iconPath = 'assets/logo/ico/icon-light.ico';
```

---

## 🔄 Regenerating Assets

If you modify the SVG files and need to regenerate PNGs and ICOs:

### 1. Convert All SVGs to PNGs
```bash
cd assets/logo
node scripts/convert-all-logos.js
```
Creates 20 PNG files (4 variants × 5 sizes) in organized folders.

### 2. Create ICO Files
```bash
cd assets/logo
node scripts/create-all-icos.js
```
Creates 2 ICO files in the `ico/` folder.

### Prerequisites
```bash
npm install --save-dev sharp png-to-ico
```

---

## 📏 Size Guide

| Size | Use Case |
|------|----------|
| 16x16 | Favicons, tiny UI elements |
| 32x32 | Toolbar icons, small UI |
| 64x64 | Medium icons |
| 128x128 | **VS Code Marketplace icon** ✨ |
| 256x256 | High-DPI displays, large previews, social media |

---

## 🎯 When to Use Each Variant

| Variant | Best For | Background Color |
|---------|----------|------------------|
| **icon-light** | VS Code Marketplace, light-themed apps, default | Light/White |
| **icon-dark** | Dark-themed apps, dark mode websites | Dark/Black |
| **logo-light** | README headers, documentation (light theme) | Light/White |
| **logo-dark** | README headers, documentation (dark theme) | Dark/Black |

---

## 📐 Brand Guidelines

### ✅ Do's
- Use SVG files whenever possible for crisp display
- Maintain aspect ratio when scaling
- Use the light variant on light backgrounds
- Use the dark variant on dark backgrounds
- Keep adequate spacing around the logo

### ❌ Don'ts
- Don't alter the colors (use the correct variant instead)
- Don't add drop shadows or effects
- Don't rotate or skew the logo
- Don't place on busy/patterned backgrounds
- Don't use low-resolution PNG when SVG is available
- Don't mix variants (e.g., light elements on light background)

---

## 🔧 Technical Specifications

### SVG Files
- **Location:** `svg/`
- **Viewbox:** 120x120
- **Format:** Clean, optimized SVG
- **Size:** ~1-28 KB per file

### PNG Files
- **Location:** `png/[variant-name]/`
- **Format:** PNG with transparency
- **Color Space:** RGB
- **Sizes:** 16, 32, 64, 128, 256 pixels (square)
- **Size:** ~300 bytes to 5 KB each

### ICO Files
- **Location:** `ico/`
- **Format:** Multi-resolution ICO
- **Included sizes:** 16, 32, 64, 128, 256
- **Size:** ~360 KB each

### Total Package Size
- **SVG files:** ~30 KB
- **PNG files:** ~100 KB
- **ICO files:** ~700 KB
- **Total:** ~830 KB

---

## 📋 File Naming Convention

```
[type]-[theme]-[size].extension

Examples:
icon-light-128x128.png    # Icon, light theme, 128x128 pixels
logo-dark-256x256.png     # Logo, dark theme, 256x256 pixels
icon-light.svg            # Icon, light theme, vector
icon-dark.ico             # Icon, dark theme, Windows icon
```

---

## ✅ Next Steps

1. ✅ Test the icon in VS Code by running `vsce package`
2. ✅ Add logo to your GitHub README
3. ✅ Update documentation with new logo
4. ✅ Add favicon to any websites
5. ✅ Share on social media with the new branding!

---

## 📦 Ready For

- ✅ VS Code Marketplace
- ✅ GitHub README (with automatic theme switching)
- ✅ Documentation sites
- ✅ Social media
- ✅ Windows applications
- ✅ Web applications
- ✅ Favicons

---

## 📝 License

These logo assets are part of the Highlightability project and follow the same MIT license.

---

## 🆘 Need Help?

Check the main project [README](../../README.md) for more information.

---

**🎨 All set! Your Highlightability logo is ready to use!**
