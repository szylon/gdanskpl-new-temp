const Encore = require("@symfony/webpack-encore");
const path = require("path");
const glob = require("glob");
const { merge } = require("webpack-merge");

// Ścieżki do katalogów z plikami
let entryFront = "js/prefixes";
let entryBack = "./assets/prefixes";

let entryCssFront = "css/main";
let entryCssBack = "./assets/main/style/default/subpages";

// ----------------------------------------------------------------------------
// Konfiguracja dla dist

Encore.setOutputPath("public/dist").setPublicPath("/dist");

Encore.addStyleEntry("css/main/contrast", "./assets/main/style/contrast/main.scss")

  // Domyślne skrypty strony
  .addEntry("js/main/main", "./assets/main/js/main.js")
  .addEntry("js/main/main.defer", "./assets/main/js/main.defer.js")
  .addEntry("js/main/search", "./assets/main/js/search.js")
  .addEntry("js/main/article.defer", "./assets/main/js/article.defer.js")
  .addEntry("js/main/player.defer", "./assets/main/js/player.defer.js")
  .addEntry("js/main/wydarzenia.defer", "./assets/main/js/plugins/wydarzenia/wydarzenia.defer.js")
  .addEntry("js/main/react-sample", "./assets/main/js/react-sample.js");

// Dynamiczne dodawanie plików SCSS
const styleFiles = glob.sync("**/*.scss", {
  cwd: entryCssBack,
});
styleFiles.forEach((file) => {
  Encore.addStyleEntry(`${entryCssFront}/${file.replace(/\.scss$/, "")}`, `${entryCssBack}/${file}`);
});

// Dynamiczne dodawanie własnych skryptów JS
const entryPoints = glob.sync("**/*.js", {
  cwd: entryBack,
});
entryPoints.forEach((item) => {
  Encore.addEntry(`${entryFront}/${item.replace(/\.js$/, "")}`, `${entryBack}/${item}`);
});

// Konfiguracja Webpacka
Encore.enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .enableSassLoader()
  // .enablePostCssLoader()

  // Usunięcie komentarzy w wersji produkcyjnej
  .configureTerserPlugin((options) => {
    options.terserOptions = {
      output: {
        comments: false,
      },
    };
  });

const finalConfig = Encore.getWebpackConfig();

// Konfiguracja Babel (dla React)
const babelConfig = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
};

// Eksport końcowej konfiguracji
module.exports = merge(finalConfig, babelConfig);