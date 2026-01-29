# Image Configuration Guide

This file explains how to use the centralized image configuration system for the Fertibase website.

## Overview

All images are now managed through a single configuration file located at:
```
src/config/images.js
```

This makes it easy to:
- Find and update image paths in one place
- Add new images without touching component files
- Organize images by category
- Maintain consistency across the application

## How to Use

### 1. Importing Images in Components

Instead of importing images directly from the assets folder:

**❌ Old Way (Don't do this):**
```javascript
import logo from "../assets/logo.jpg";
import aboutImage from "../assets/FertiBaseAbout.png";
```

**✅ New Way (Do this):**
```javascript
import { LOGOS, HERO_IMAGES } from "../config/images";

// Then use them in your component:
<img src={LOGOS.main} alt="Logo" />
<img src={HERO_IMAGES.about} alt="About" />
```

### 2. Available Image Categories

The configuration exports the following categories:

#### **LOGOS**
- `LOGOS.main` - Main logo (logo.jpg)
- `LOGOS.mainPng` - Main logo PNG version
- `LOGOS.splash` - Splash screen logo

#### **HERO_IMAGES**
- `HERO_IMAGES.about` - About section image
- `HERO_IMAGES.cloud` - Cloud image
- `HERO_IMAGES.clouddd` - Alternative cloud image
- `HERO_IMAGES.cloudword` - Cloud word image
- `HERO_IMAGES.background` - Background image
- `HERO_IMAGES.scroll` - Scroll image
- `HERO_IMAGES.base` - Base image
- `HERO_IMAGES.imagee` - Generic image

#### **PRODUCTS**
Organized by product series:

**Beni Base:**
- `PRODUCTS.beniBase.fourKg`

**Carbomin Series:**
- `PRODUCTS.carbomin.initial`
- `PRODUCTS.carbomin.booster`
- `PRODUCTS.carbomin.fa`
- `PRODUCTS.carbomin.special`
- `PRODUCTS.carbomin.standard`
- `PRODUCTS.carbomin.corbcen`

**Hydromin Series:**
- `PRODUCTS.hydromin.level1`
- `PRODUCTS.hydromin.level2`
- `PRODUCTS.hydromin.level3`

**Copious Series:**
- `PRODUCTS.copious.np`
- `PRODUCTS.copious.k`
- `PRODUCTS.copious.npk`

**Ferti Series:**
- `PRODUCTS.ferti.eleven`
- `PRODUCTS.ferti.seven`
- `PRODUCTS.ferti.ca21`
- `PRODUCTS.ferti.ca6`
- `PRODUCTS.ferti.f6018Jpeg`
- `PRODUCTS.ferti.f6018Png`

**Individual Products:**
- `PRODUCTS.individual.camags`
- `PRODUCTS.individual.promore`
- `PRODUCTS.individual.zinbase`
- `PRODUCTS.individual.bloom`
- `PRODUCTS.individual.cancore`
- `PRODUCTS.individual.cas`
- `PRODUCTS.individual.dfnc`
- `PRODUCTS.individual.liquidbase`
- `PRODUCTS.individual.microlife`
- `PRODUCTS.individual.mycore`
- `PRODUCTS.individual.nitrbase`
- `PRODUCTS.individual.phospobase`
- `PRODUCTS.individual.photobase`
- `PRODUCTS.individual.t8`
- `PRODUCTS.individual.zincore`

### 3. Adding New Images

To add a new image:

1. **Add the image file** to `src/assets/` folder
2. **Open** `src/config/images.js`
3. **Import** the image at the top:
   ```javascript
   import newProductImage from "../assets/new-product.png";
   ```
4. **Add it to the appropriate export** section:
   ```javascript
   export const PRODUCTS = {
     // ... existing products
     individual: {
       // ... existing individual products
       newProduct: newProductImage,
     }
   };
   ```

### 4. Changing an Image

To replace an image:

1. **Open** `src/config/images.js`
2. **Find** the import statement for the image you want to change
3. **Update** the path:
   ```javascript
   // Change this:
   import logo from "../assets/logo.jpg";
   
   // To this:
   import logo from "../assets/new-logo.jpg";
   ```

That's it! All components using that image will automatically use the new one.

## Examples

### Example 1: Using Logo in a Component

```javascript
import { LOGOS } from "../config/images";

function Header() {
  return (
    <img src={LOGOS.main} alt="Fertibase Logo" />
  );
}
```

### Example 2: Using Product Images

```javascript
import { PRODUCTS } from "../config/images";

function ProductCard() {
  return (
    <div>
      <img src={PRODUCTS.carbomin.initial} alt="Carbomin Initial" />
      <img src={PRODUCTS.ferti.eleven} alt="Ferti Eleven" />
    </div>
  );
}
```

### Example 3: Using All Images

```javascript
import images from "../config/images";

function Gallery() {
  return (
    <div>
      <img src={images.logos.main} alt="Logo" />
      <img src={images.hero.about} alt="About" />
      <img src={images.products.carbomin.initial} alt="Product" />
    </div>
  );
}
```

## Benefits

✅ **Easy Maintenance** - Change images in one place  
✅ **Better Organization** - Images grouped by category  
✅ **Type Safety** - Clear structure makes it harder to make mistakes  
✅ **Faster Development** - No need to remember exact file paths  
✅ **Consistency** - Everyone uses the same image references

## Files Already Updated

The following components have been updated to use the centralized configuration:
- ✅ `About.jsx` - Uses `HERO_IMAGES.about`
- ✅ `Navbar.jsx` - Uses `LOGOS.main`
- ✅ `Footer.jsx` - Uses `LOGOS.main`
- ✅ `FertibaseSplash.jsx` - Uses `LOGOS.splash`

## Need Help?

If you need to add a new category or have questions about organizing images, refer to the structure in `src/config/images.js` and follow the same pattern.
