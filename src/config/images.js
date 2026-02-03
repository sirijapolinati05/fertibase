/**
 * Centralized Image Configuration
 * 
 * This file contains all image imports and exports for the entire application.
 * To change an image, simply update the import path here instead of searching through components.
 */

// ==================== BRANDING & LOGOS ====================
import logo from "../assets/logo.png";
import logoPng from "../assets/logo.png";
import logoSplash from "../assets/logo splash.png";

// ==================== HERO & ABOUT SECTIONS ====================
import aboutImage from "../assets/FertiBaseAbout.png";
import cloudImage from "../assets/wordcloud.jpeg";
import cloudddImage from "../assets/clouddd.jpeg";
import cloudwordImage from "../assets/wordcloud.jpeg";
import fertiBgImage from "../assets/fertibg.png";
import scrollImage from "../assets/logo.png";
import baseImage from "../assets/logo.png";
import imageeImage from "../assets/logo.png";

// ==================== PRODUCT IMAGES ====================

// Beni Base Products
import beniBase4kg from "../assets/Beni_Base_4kg.png";

// Carbomin Series
import carbominInitial from "../assets/CARBOMIN - I(INITIAL).png";
import carbominBooster from "../assets/CARBOMINBOOSTER.png";
import carbominFA from "../assets/CARBOMINFA.png";
import carbominSpecial from "../assets/CARBOMINSPECIAL.png";
import carboMin from "../assets/carbo_min.png";
import corbcen from "../assets/corbcen.png";

// Hydromin Series
import hydrominLevel1 from "../assets/HYDROMINLEVEL1.png";
import hydrominLevel2 from "../assets/HYDROMINLEVEL2.png";
import hydrominLevel3 from "../assets/HYDROMINLEVEL3.png";

// Copious Series
import copiousNP from "../assets/Copious-Np.png";
import copiousK from "../assets/CopiousK.png";
import copiousNPK from "../assets/CopiousNPK.png";

// Ferti Series
import fertiEleven from "../assets/ferti_eleven.png";
import fertiSeven from "../assets/ferti_seven.png";
import fertiCa21 from "../assets/fertica21.png";
import fertiCa6 from "../assets/fertica6.png";
import ferti6018Jpeg from "../assets/ferti6018.jpeg";
import ferti6018Png from "../assets/ferti6018.png";

// Other Products
import camags from "../assets/Camags.png";
import promore from "../assets/Promore.png";
import zinbase from "../assets/ZINBASE.png";
import bloom from "../assets/bloom.png";
import cancore from "../assets/cancore.png";
import cas from "../assets/cas.png";
import dfnc from "../assets/dfnc.png";
import liquidbase from "../assets/liquidbase.png";
import microlife from "../assets/microlife.png";
import mycore from "../assets/mycore.png";
import nitrbase from "../assets/nitrbase.png";
import phospobase from "../assets/phospobase.png";
import potaBase from "../assets/potaBase.png";
import t8 from "../assets/t8.png";
import zincore from "../assets/zincore.png";

// React Logo (default)
import reactLogo from "../assets/react.svg";

// ==================== EXPORTS ====================

/**
 * Branding & Logos
 */
export const LOGOS = {
    main: logoPng, 
    mainPng: logoPng,
    splash: logoSplash,
};

/**
 * Hero & About Section Images
 */
export const HERO_IMAGES = {
    about: aboutImage,
    cloud: cloudImage,
    clouddd: cloudddImage,
    cloudword: cloudwordImage,
    background: fertiBgImage,
    scroll: scrollImage,
    base: baseImage,
    imagee: imageeImage,
};

/**
 * Product Images - Organized by Category
 */
export const PRODUCTS = {
    // Beni Base
    beniBase: {
        fourKg: beniBase4kg,
    },

    // Carbomin Series
    carbomin: {
        initial: carbominInitial,
        booster: carbominBooster,
        fa: carbominFA,
        special: carbominSpecial,
        standard: carboMin,
        corbcen: corbcen,
    },

    // Hydromin Series
    hydromin: {
        level1: hydrominLevel1,
        level2: hydrominLevel2,
        level3: hydrominLevel3,
    },

    // Copious Series
    copious: {
        np: copiousNP,
        k: copiousK,
        npk: copiousNPK,
    },

    // Ferti Series
    ferti: {
        eleven: fertiEleven,
        seven: fertiSeven,
        ca21: fertiCa21,
        ca6: fertiCa6,
        f6018Jpeg: ferti6018Jpeg,
        f6018Png: ferti6018Png,
    },

    // Individual Products
    individual: {
        camags: camags,
        promore: promore,
        zinbase: zinbase,
        bloom: bloom,
        cancore: cancore,
        cas: cas,
        dfnc: dfnc,
        liquidbase: liquidbase,
        microlife: microlife,
        mycore: mycore,
        nitrbase: nitrbase,
        phospobase: phospobase,
        potaBase: potaBase,
        t8: t8,
        zincore: zincore,
    },
};

/**
 * Miscellaneous
 */
export const MISC = {
    reactLogo: reactLogo,
};

/**
 * Default export - All images in one object
 */
export default {
    logos: LOGOS,
    hero: HERO_IMAGES,
    products: PRODUCTS,
    misc: MISC,
};
