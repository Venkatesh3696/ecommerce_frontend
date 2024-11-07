import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';

const AdminPtoductTile = ({
	product,
	setCurrentEditingId,
	setFormData,
	setOpenCreateProductsDialog,
	handleDelete,
}) => {
	return (
		<Card className='w-full  max-w-sm mx-auto'>
			<div className='reletive '>
				<img
					src={product?.image}
					alt={product?.title}
					className='w-full h-[300px] rounded-t-lg '
				/>
			</div>
			<CardContent>
				<h2 className='text-xl font-bold mb-2 '>{product?.title}</h2>
				<div>
					<p className='text-gray-600 text-sm mb-2'>
						{product?.description}
					</p>
					<div className='flex justify-between'>
						<p className='text-gray-600 text-sm mb-2 line-through'>
							Rs. {product?.price} /-
						</p>
						<p className='text-gray-600 text-md mb-2 font-extrabold'>
							Rs. {product?.salePrice} /-
						</p>
					</div>
					<p className='text-gray-600 text-sm mb-2'>
						{product?.category}
					</p>
				</div>
			</CardContent>
			<CardFooter className='flex justify-between items-center'>
				<Button
					onClick={() => {
						setFormData(product);
						setOpenCreateProductsDialog(true);
						setCurrentEditingId(product?._id);
					}}
				>
					Edit
				</Button>
				<Button
					onClick={() => {
						handleDelete(product?._id);
					}}
				>
					Delete
				</Button>
			</CardFooter>
		</Card>
	);
};

export default AdminPtoductTile;
