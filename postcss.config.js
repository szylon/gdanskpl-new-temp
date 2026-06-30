
const purgecss = require('@fullhuman/postcss-purgecss');
const glob = require('glob-all');
const path = require('path');



module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    // require('postcss-import-ext-glob'),
    // require('postcss-import'),
    purgecss({
    //   paths: glob.sync([
    //     path.join(__dirname, 'templates/**/*.html.twig'),
    //     path.join(__dirname, 'assets/js/**/*.js'),
    // ]),
        content: [
          //'./assets/**/*.js',
          './templates/**/*.{twig,php,html}',
          //'./public/dist-new2/js/**/*.{js}',
          // './node_modules/bootstrap/dist/**/*.{js,jsx,ts,tsx,map}',
          // './node_modules/owl.carousel/dist/**/*.{js,jsx,ts,tsx,map}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
                safelist: {
                  standard: ["html", "body"],
                  deep: [],
                greedy: [/^html.*/, /^article-foto.*/, /^search.*/, /^column-count-*.*/, /owl-.+/, /row-.+/, /dropdown-.+/, /col-.+/, /^back-to-.+/, /position-fixed/, /^project-finished.*/, /^fa-caret-up/, /^aos-animate.*/, /^bootstrap-table.*/, /^slider-before-image.*/ ],
                },
      }),
  ]
}
