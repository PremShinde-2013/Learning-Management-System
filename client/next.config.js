/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your Next.js configuration options go here
	images: {
		domains: [
			"nextui-docs-v2.vercel.app",
			"img.freepik.com",
			"cdn-icons-png.freepik.com",
		], // Add your hostname(s) here
	},
};

module.exports = nextConfig;
