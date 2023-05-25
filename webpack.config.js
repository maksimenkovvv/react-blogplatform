/* eslint-disable no-undef */
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-react-loader',
          },
        ],
      },
    ],
  },
};
