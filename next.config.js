const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({
  //   optimizeImagesInDev: false,
  optimizeImages: true,
  defaultImageLoader: "responsive-loader",
  responsive: {
    adapter: require("responsive-loader/sharp"),
    sizes: [320, 640, 960, 1200],
    //   esModule: true,
  },
});
