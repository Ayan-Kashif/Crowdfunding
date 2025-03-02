/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Apply CSP to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self'; 
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://trusted-source.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: https://trusted-image-source.com;
              font-src 'self' https://fonts.gstatic.com https://js.stripe.com;
              connect-src 'self' https://api.yourbackend.com;
              frame-src 'self' https://trusted-iframe.com;
            `.replace(/\n/g, ""), // Remove new lines
          },
        ],
      },
    ];
  },
};

export default nextConfig;

