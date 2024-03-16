import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
	videoUrl: string;
	title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
	const [videoData, setVideoData] = useState({
		otp: "",
		playbackInfo: "",
	});

	useEffect(() => {
		axios
			.post("http://localhost:8000/api/v1/getVdoCipherOTP", {
				videoId: videoUrl,
			})
			.then((res) => {
				setVideoData(res.data);
			});
	}, [videoUrl]);

	return (
		<>
			{videoData.otp && videoData.playbackInfo !== "" && (
				<iframe
					src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=v1C4KBMwW4LqQDWm`}
					style={{
						border: 0,
						borderRadius: "16px",
						width: "100%",
						height: "100%",
						top: 0,
						left: 0,
					}}
					allowFullScreen={true}
					allow='encrypted-media'
				></iframe>
			)}
		</>
	);
};

export default CoursePlayer;
