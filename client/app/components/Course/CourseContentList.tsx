import { useState } from "react";

import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";

type CourseContentListProps = {
	data: any;
	activeVideo?: number;
	setActiveVideo?: any;
	isDemo?: boolean;
};

const CourseContentList = ({
	data,
	activeVideo,
	setActiveVideo,
	isDemo,
}: CourseContentListProps) => {
	const [visibleSections, setVisibleSections] = useState<Set<string>>(
		new Set<string>()
	);

	const videoSections: string[] = [
		...new Set<string>(data?.map((item: any) => item.videoSection)),
	];

	let totalCount: number = 0;

	const toggleSection = (section: string) => {
		const newVisibleSections = new Set(visibleSections);

		if (newVisibleSections.has(section)) {
			newVisibleSections.delete(section);
		} else {
			newVisibleSections.add(section);
		}

		setVisibleSections(newVisibleSections);
	};

	return (
		<div
			className={`mt-[15px] w-full ${
				!isDemo && "ml-[-30px] min-h-screen sticky top-24 left-0 z-30"
			}`}
		>
			{videoSections.map((section: string, sectionIndex: number) => {
				const isSectionVisible = visibleSections.has(section);

				const sectionVideos: any[] = data.filter(
					(item: any) => item.videoSection === section
				);

				const sectionVideoCount: number = sectionVideos.length;
				const sectionVideoLength: number = sectionVideos.reduce(
					(totalLength: number, item: any) => totalLength + item.videoLength,
					0
				);
				const sectionStartIndex: number = totalCount;
				totalCount += sectionVideoCount;

				const sectionContentHours: number = sectionVideoLength / 60;

				return (
					<div className={`${!isDemo && "border-b pb-2"}`} key={section}>
						<div className='w-full flex'>
							<div className='w-full flex justify-between items-center'>
								<h2 className='text-[22px] text-black dark:text-white'>
									{section}
								</h2>
								<button
									className='mr-4 cursor-pointer text-black dark:text-white'
									onClick={() => toggleSection(section)}
								>
									{isSectionVisible ? (
										<ArrowDropUpRoundedIcon />
									) : (
										<ArrowDropDownRoundedIcon />
									)}
								</button>
							</div>
						</div>
						<h5 className=''>
							{sectionVideoCount} Lessons ·{" "}
							{sectionVideoLength < 60
								? sectionVideoLength
								: sectionContentHours.toFixed(2)}{" "}
							{sectionVideoLength > 60 ? "hours" : "minutes"}
						</h5>
						<br />
						{isSectionVisible && (
							<div className='w-full'>
								{sectionVideos.map((item: any, index: number) => {
									const videoIndex: number = sectionStartIndex + index;
									const contentLength: number = item.videoLength / 60;
									return (
										<div
											className={`w-full ${
												videoIndex === activeVideo ? "" : ""
											} cursor-pointer transition-all p-2`}
											key={item._id}
											onClick={() =>
												isDemo ? null : setActiveVideo(videoIndex)
											}
										>
											<div className='flex items-start'>
												<div>
													<OndemandVideoRoundedIcon
														color='primary'
														className='mr-2
                                                        '
													/>
												</div>
												<h1 className='text-[18px] inline-block break-words '>
													{item.title}
												</h1>
											</div>
											<h5 className='pl-8 '>
												{item.videoLength > 60
													? contentLength.toFixed(2)
													: item.videoLength}{" "}
												{item.videoLength > 60 ? "hours" : "minutes"}
											</h5>
										</div>
									);
								})}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default CourseContentList;
