import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type Props = {
	rating: number; // Rating value between 0 and 5
};

const Ratings: React.FC<Props> = ({ rating }) => {
	const renderStars = () => {
		const stars = [];
		// Loop to create individual star components based on the rating
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				// Render a filled star if the index is less than or equal to the rating
				stars.push(
					<span key={i} className='text-yellow-400'>
						<StarRoundedIcon />
					</span>
				);
			} else {
				// Render an empty star if the index is greater than the rating
				stars.push(
					<span key={i} className='text-gray-300'>
						<StarRoundedIcon />
					</span>
				);
			}
		}
		return stars;
	};

	return (
		<div className='flex items-center'>
			{renderStars()}
			{/* <span className='ml-2'>{rating}/5</span> */}
		</div>
	);
};

export default Ratings;
