import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import { Fragment, useEffect, useState } from 'react';
import ProductImageUpload from '../../components/admin-view/image-upload';
import { useDispatch, useSelector } from 'react-redux';
import {
	addNewProduct,
	deleteProduct,
	editProduct,
	fetchAllProducts,
} from '@/store/admin/products-slice';
import { useToast } from '@/hooks/use-toast';
import AdminPtoductTile from '@/components/admin-view/product-tile';

const initialFormData = {
	image: null,
	title: '',
	description: '',
	category: '',
	brand: '',
	price: '',
	salePrice: '',
	totalStock: '',
};

const AdminProducts = () => {
	const [openCreateProductsDialog, setOpenCreateProductsDialog] =
		useState(false);
	const [formData, setFormData] = useState(initialFormData);
	const [imageFile, setImageFile] = useState(null);
	const [uploadedImgUrl, setUploadedImgUrl] = useState('');
	const [currentEditingId, setCurrentEditingId] = useState(null);
	const [imageLoadingState, setImageLoadingState] = useState(false);
	const { productsList } = useSelector((state) => state.adminProducts);
	const dispatch = useDispatch();
	const toast = useToast();

	const onSubmitForm = (e) => {
		e.preventDefault();

		currentEditingId !== null
			? dispatch(editProduct({ id: currentEditingId, formData })).then(
					(data) => {
						console.log(data);
						if (data?.payload?.success) {
							dispatch(fetchAllProducts());
							setFormData(initialFormData);
							setOpenCreateProductsDialog(false);
							setCurrentEditingId(null);
						}
					},
			  )
			: dispatch(
					addNewProduct({
						...formData,
						image: uploadedImgUrl,
					}),
			  ).then((data) => {
					if (data?.payload?.success) {
						dispatch(fetchAllProducts());
						setImageFile(null);
						setFormData(initialFormData);
						toast({
							title: 'Product added successfully!',
						});
						setOpenCreateProductsDialog(false);
					}
			  });
	};

	const isFormValid = () => {
		return Object.keys(formData)
			.map((key) => formData[key] !== '')
			.every((item) => item);
	};

	const handleDelete = (currentProductId) => {
		console.log(currentProductId);
		dispatch(deleteProduct(currentProductId)).then((data) => {
			if (data?.payload?.success) {
				dispatch(fetchAllProducts());
				setCurrentEditingId(null);
				setOpenCreateProductsDialog(false);
			}
		});
	};

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	return (
		<Fragment>
			<div className='mb-5 w-full flex justify-end'>
				<Button onClick={() => setOpenCreateProductsDialog(true)}>
					Add New Product
				</Button>
			</div>
			<div className='grid gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-scroll'>
				{productsList && productsList.length > 0 ? (
					productsList.map((product) => (
						<AdminPtoductTile
							key={product._id}
							product={product}
							setCurrentEditingId={setCurrentEditingId}
							setFormData={setFormData}
							setOpenCreateProductsDialog={
								setOpenCreateProductsDialog
							}
							handleDelete={handleDelete}
						/>
					))
				) : (
					<p>No products found</p>
				)}
			</div>
			<Sheet
				open={openCreateProductsDialog}
				onOpenChange={() => {
					setOpenCreateProductsDialog(false);
					setFormData(initialFormData);
					setCurrentEditingId(null);
				}}
			>
				<SheetContent
					side='right'
					className='overflow-y-auto max-h-screen'
				>
					<SheetHeader>
						<SheetTitle>
							{currentEditingId !== null
								? 'Edit Product'
								: 'Add New Product'}
						</SheetTitle>
					</SheetHeader>
					<ProductImageUpload
						imageFile={imageFile}
						setImageFile={setImageFile}
						uploadedImgUrl={uploadedImgUrl}
						setUploadedImgUrl={setUploadedImgUrl}
						imageLoadingState={imageLoadingState}
						setImageLoadingState={setImageLoadingState}
					/>
					<div className='py-6 '>
						<CommonForm
							onSubmit={onSubmitForm}
							formData={formData}
							setFormData={setFormData}
							buttonText={
								currentEditingId !== null ? 'Edit' : 'Add'
							}
							formControls={addProductFormElements}
							isButtonDisabled={!isFormValid()}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</Fragment>
	);
};

export default AdminProducts;
