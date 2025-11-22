/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wzhvsbkwpjvxvuzfdlkh.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**", // match all public storage paths
      },
    ],
  },
};

module.exports = nextConfig;
