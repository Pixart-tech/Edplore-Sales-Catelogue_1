const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Treat web viewer files as static assets so we can require() them
const assetExts = config.resolver.assetExts;
const sourceExts = config.resolver.sourceExts;

config.resolver.assetExts = Array.from(new Set([...assetExts, 'html', 'css', 'mjs', 'ftl', 'map']));
config.resolver.sourceExts = sourceExts.filter(ext => ext !== 'mjs');

module.exports = config;
