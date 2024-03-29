import Footer from "../components/Route/Footer";

export default function FaqLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
			<div className='text-center justify-center mb-20 w-full'>{children}</div>
			<Footer />
		</section>
	);
}
