const path = require('path');
const customWebpackConfig = require('../config/webpack.config')(
  'development',
);

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    const svgRule = {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      include: path.resolve(__dirname, '../src'),
      oneOf: [
        {
          test: /\.inline\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: 'raw-loader',
        },
        {
          test: /\.jsx\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                dimensions: true,
                svgoConfig: {
                  plugins: {
                    removeViewBox: false,
                  },
                },
              },
            },
          ],
        },
        {
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: '2048',
                mimetype: 'image/svg+xml',
                esModule: false,
              },
            },
          ],
        },
      ],
    };

    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules.map((rule) => {
            if (
              String(rule.test) ===
              String(
                /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
              )
            ) {
              return {
                ...rule,
                test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
              };
            }
            return rule;
          }),
          svgRule,
        ],
      },
    };
  },
  core: {
    builder: 'webpack5',
  },
};
