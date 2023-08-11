module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.filename = "static/js/[name].js";
    }
    return config;
  },
  images: {
    unoptimized: true,
  },
};
