import { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Footer from "../Route/Footer";
import CourseDetails from "./CourseDetails";
import {
	useCreatePaymentIntentMutation,
	useGetStripePublishablekeyQuery,
} from "@/redux/features/orders/ordersApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { loadStripe } from "@stripe/stripe-js";

type CourseDetailsPageProps = {
	id: string;
};

const CourseDetailsPage = ({ id }: CourseDetailsPageProps) => {
	const [route, setRoute] = useState("Login");

	const [open, setOpen] = useState(false);

	const { data, isLoading } = useGetCourseDetailsQuery(id);

	const { data: config } = useGetStripePublishablekeyQuery({});

	const [createPaymentIntent, { data: paymentIntentData }] =
		useCreatePaymentIntentMutation();

	const { data: userData } = useLoadUserQuery(undefined, {});

	const [stripePromise, setStripePromise] = useState<any>(null);

	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		if (config) {
			const publishablekey = config?.publishablekey;
			setStripePromise(loadStripe(publishablekey));
		}

		if (data && userData?.user) {
			const amount = Math.round(data.course.price * 100);
			createPaymentIntent(amount);
		}
	}, [config, createPaymentIntent, data, userData]);

	useEffect(() => {
		if (paymentIntentData) {
			setClientSecret(paymentIntentData?.client_secret);
		}
	}, [paymentIntentData]);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					<Heading
						title={`${data.course.name} - E-Learning`}
						description={
							"E-Learning is a programming community which is developed by Alireza Rastineh for helping programmers"
						}
						keywords={data?.course?.tags}
					/>
					{stripePromise && (
						<CourseDetails
							data={data.course}
							stripePromise={stripePromise}
							clientSecret={clientSecret}
							setRoute={setRoute}
							setOpen={setOpen}
						/>
					)}
					<Footer />
				</div>
			)}
		</>
	);
};

export default CourseDetailsPage;
