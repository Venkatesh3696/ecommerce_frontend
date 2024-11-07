import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { API_URL } from '@/config';
import axios from 'axios';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

const ProductImageUpload = ({
	imageFile,
	setImageFile,
	uploadedImgUrl,
	setUploadedImgUrl,
	setImageLoadingState,
	imageLoadingState,
}) => {
	const inputRef = useRef(null);

	const handleImageChange = (event) => {
		console.log(event.target.files);
		const selectedFiles = event.target.files?.[0];
		if (selectedFiles) {
			setImageFile(selectedFiles);
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};
	const handleDrop = (e) => {
		e.preventDefault();
		const droppedFile = e.dataTransfer.files?.[0];
		if (droppedFile) {
			setImageFile(droppedFile);
		}
	};

	const handleRemoveImage = () => {
		setImageFile(null);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const uploadImageToCloudinary = async () => {
		setImageLoadingState(true);
		const data = new FormData();
		data.append('my_file', imageFile);
		const response = await axios.post(
			`${API_URL}/api/admin/products/upload-image`,
			data,
		);
		console.log('response ===>> ', response);
		if (response?.data?.success) {
			setImageLoadingState(false);
			setUploadedImgUrl(response.data.result.url);
		}
	};

	useEffect(() => {
		if (imageFile !== null) {
			uploadImageToCloudinary();
		}
	}, [imageFile]);

	return (
		<div className='w-full max-w-md mx-auto'>
			<Label className='text-xl font-semibold mb-2 block'>
				Upload Image
			</Label>
			<div
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className='border-2 border-dashed rounded-lg p-4 mt-4'
			>
				<Input
					id='image-upload'
					type='file'
					className='hidden'
					ref={inputRef}
					onChange={handleImageChange}
				/>
				{!imageFile ? (
					<div className='flex flex-col'>
						<Label
							htmlFor='image-upload'
							className='flex flex-col items-center justify-center h-32 cursor-pointer'
						>
							<UploadCloudIcon className='w-10 h-10 text-muted-foreground' />
							<span>Drag & drop Image to upload image</span>
						</Label>
						<img
							src={uploadedImgUrl}
							alt='product image'
							className='w-full aspect-square'
						/>
					</div>
				) : imageLoadingState ? (
					<Skeleton className='h-10 bg-gray-500' />
				) : (
					<div className='flex items-center justify-between '>
						<div>
							<FileIcon className='w-8 text-primary h-8 mr-2 ' />
						</div>
						<p className='text-sm font-medium '>{imageFile.name}</p>
						<Button
							variant='ghost'
							size='icon '
							className='text-muted-foreground hover:text-foreground'
							onClick={handleRemoveImage}
						>
							<XIcon className='w-4 h-4 ' />
							<span className='sr-only'>Remove Files</span>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductImageUpload;
