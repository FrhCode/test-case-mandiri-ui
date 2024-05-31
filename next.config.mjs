/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mandiri-api.farhandev.cloud",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "6001",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "207.148.72.187",
        port: "6001",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
