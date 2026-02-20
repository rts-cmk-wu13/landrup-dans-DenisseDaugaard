/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
 images: {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "4000",
      pathname: "/file-bucket/**",
    },
  ],
},
  reactCompiler: true,
};

export default nextConfig;
