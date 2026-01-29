# Quick Image Reference

## Import Statement

```javascript
import { LOGOS, HERO_IMAGES, PRODUCTS } from "../config/images";
```

## Quick Reference Table

| Category                | Property                    | File Name                 |
| ----------------------- | --------------------------- | ------------------------- |
| **Logos**               |                             |                           |
|                         | `LOGOS.main`                | logo.jpg                  |
|                         | `LOGOS.mainPng`             | logo.png                  |
|                         | `LOGOS.splash`              | b.png                     |
| **Hero/About**          |                             |                           |
|                         | `HERO_IMAGES.about`         | FertiBaseAbout.png        |
|                         | `HERO_IMAGES.cloud`         | cloud.jpeg                |
|                         | `HERO_IMAGES.background`    | fertibg.png               |
| **Products - Carbomin** |                             |                           |
|                         | `PRODUCTS.carbomin.initial` | CARBOMIN - I(INITIAL).png |
|                         | `PRODUCTS.carbomin.booster` | CARBOMINBOOSTER.png       |
|                         | `PRODUCTS.carbomin.fa`      | CARBOMINFA.png            |
|                         | `PRODUCTS.carbomin.special` | CARBOMINSPECIAL.png       |
| **Products - Hydromin** |                             |                           |
|                         | `PRODUCTS.hydromin.level1`  | HYDROMINLEVEL1.png        |
|                         | `PRODUCTS.hydromin.level2`  | HYDROMINLEVEL2.png        |
|                         | `PRODUCTS.hydromin.level3`  | HYDROMINLEVEL3.png        |
| **Products - Copious**  |                             |                           |
|                         | `PRODUCTS.copious.np`       | Copious-Np.png            |
|                         | `PRODUCTS.copious.k`        | CopiousK.png              |
|                         | `PRODUCTS.copious.npk`      | CopiousNPK.png            |
| **Products - Ferti**    |                             |                           |
|                         | `PRODUCTS.ferti.eleven`     | ferti_eleven.png          |
|                         | `PRODUCTS.ferti.seven`      | ferti_seven.png           |
|                         | `PRODUCTS.ferti.ca21`       | fertica21.png             |
|                         | `PRODUCTS.ferti.ca6`        | fertica6.png              |

## Common Usage Patterns

### In JSX

```javascript
<img src={LOGOS.main} alt="Logo" />
<img src={HERO_IMAGES.about} alt="About Us" />
<img src={PRODUCTS.carbomin.initial} alt="Carbomin Initial" />
```

### To Change an Image

1. Open `src/config/images.js`
2. Find the import line
3. Change the file path
4. Save - all components update automatically!

## File Location

📁 `src/config/images.js` - Main configuration file  
📁 `src/config/IMAGE_GUIDE.md` - Full documentation
