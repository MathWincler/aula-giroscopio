const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Esta é a parte importante:
// Nós pegamos as extensões de assets padrão e adicionamos 'mp3' e 'wav'.
config.resolver.assetExts.push('mp3', 'wav');

module.exports = config;