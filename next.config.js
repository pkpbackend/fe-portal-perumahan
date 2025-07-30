const path = require("path");
const env = require("./next-env");
module.exports = {
  output: 'export',
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    ...env,
  },
  images: {
    unoptimized: true
  }
};
