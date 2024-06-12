/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "mandiri-api.farhandev.my.id",
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
