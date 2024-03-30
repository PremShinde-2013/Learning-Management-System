import About from "../components/Route/About";
import Footer from "../components/Route/Footer";

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10 lg:mt-60  '>
			<div className='  text-center justify-center  w-screen lg:mt-60 mt-[1600px]'>
				{children}
			</div>
		</section>
	);
}
