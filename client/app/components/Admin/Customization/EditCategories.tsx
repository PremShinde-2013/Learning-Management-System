import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import {
	useEditLayoutMutation,
	useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import Loader from "../../Loader/Loader";
import { AddCircleOutlineRounded, DeleteRounded } from "@mui/icons-material";
import { Input } from "@nextui-org/input";
import { Button, Card, Divider } from "@nextui-org/react";

type EditCategoriesProps = {};

const EditCategories = ({}: EditCategoriesProps) => {
	const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
		refetchOnMountOrArgChange: true,
	});

	const [editLayout, { isSuccess: layoutSuccess, error }] =
		useEditLayoutMutation();

	const [categories, setCategories] = useState<any>([]);

	useEffect(() => {
		if (data) {
			setCategories(data.layout.categories);
		}
		if (layoutSuccess) {
			refetch();
			toast.success("Categories updated successfully");
		}

		if (error && "data" in error) {
			const errorData = error as any;
			toast.error(errorData?.data?.message);
		}
	}, [data, layoutSuccess, error, refetch]);

	const handleCategoriesAdd = (id: any, value: string) => {
		setCategories((prevCategory: any) =>
			prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
		);
	};

	const newCategoriesHandler = () => {
		if (categories[categories.length - 1].title === "") {
			toast.error("Category title cannot be empty");
		} else {
			setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
		}
	};

	const areCategoriesUnchanged = (
		originalCategories: any[],
		newCategories: any[]
	) => {
		return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
	};

	const isAnyCategoryTitleEmpty = (categories: any[]) => {
		return categories.some((q) => q.title === "");
	};

	const editCategoriesHandler = async () => {
		if (
			!areCategoriesUnchanged(data.layout.categories, categories) &&
			!isAnyCategoryTitleEmpty(categories)
		) {
			await editLayout({
				type: "Categories",
				categories,
			});
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<Card className='mt-12 ml-3'>
					<div className=' mt-6  text-center  flex  flex-col gap-4'>
						<h1>All Categories</h1>
						{categories?.map((item: any, index: number) => {
							return (
								<div className='p-3' key={index}>
									<div className='flex items-center w-full justify-center gap-6 '>
										<Input
											className='w-auto'
											value={item.title}
											onChange={(e) =>
												handleCategoriesAdd(item._id, e.target.value)
											}
											placeholder='Enter category title...'
										/>
										<DeleteRounded
											className='text-[18px] cursor-pointer'
											onClick={() => {
												setCategories((prevCategory: any) =>
													prevCategory.filter((i: any) => i._id !== item._id)
												);
											}}
										/>
									</div>
								</div>
							);
						})}
						<Divider className='mx-6' />
						<div className='w-full flex justify-center'>
							<AddCircleOutlineRounded
								className='dark:text-white text-black text-[25px] cursor-pointer'
								onClick={newCategoriesHandler}
							/>
						</div>
						<div className=' flex justify-end m-6 '>
							<Button
								className={` 
            ${
							areCategoriesUnchanged(data.layout.categories, categories) ||
							isAnyCategoryTitleEmpty(categories)
								? "!cursor-not-allowed"
								: "!cursor-pointer "
						}
          `}
								variant='flat'
								color='primary'
								onClick={
									areCategoriesUnchanged(data.layout.categories, categories) ||
									isAnyCategoryTitleEmpty(categories)
										? () => null
										: editCategoriesHandler
								}
							>
								Save
							</Button>
						</div>
					</div>
				</Card>
			)}
		</>
	);
};

export default EditCategories;
