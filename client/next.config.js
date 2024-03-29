/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your Next.js configuration options go here
	images: {
		domains: [
			"nextui-docs-v2.vercel.app",
			"img.freepik.com",
			"cdn-icons-png.freepik.com",
			"res.cloudinary.com",
			"images.unsplash.com",
			"randomuser.me",
		], // Add your hostname(s) here
	},
	experimental: {
		suppressHydrationWarning: true,
	},
};

module.exports = nextConfig;
