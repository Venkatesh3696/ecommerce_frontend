export const registerFormControls = [
	{
		name: 'userName',
		label: 'User Name',
		placeholder: 'Enter your username',
		type: 'text',
		conmonentType: 'input',
	},
	{
		name: 'email',
		label: 'Email ',
		placeholder: 'Enter your email',
		type: 'email',
		conmonentType: 'input',
	},
	{
		name: 'password',
		label: 'Password',
		placeholder: 'Enter your password',
		type: 'password',
		conmonentType: 'input',
	},
];
export const loginFormControls = [
	{
		name: 'email',
		label: 'Email ',
		placeholder: 'Enter your email',
		type: 'email',
		conmonentType: 'input',
	},
	{
		name: 'password',
		label: 'Password',
		placeholder: 'Enter your password',
		type: 'password',
		conmonentType: 'input',
	},
];

export const addProductFormElements = [
	{
		label: 'Title',
		name: 'title',
		componentType: 'input',
		type: 'text',
		placeholder: 'Enter product title',
	},
	{
		label: 'Description',
		name: 'description',
		componentType: 'textarea',
		placeholder: 'Enter product description',
	},
	{
		label: 'Category',
		name: 'category',
		componentType: 'select',
		options: [
			{ id: 'men', label: 'Men' },
			{ id: 'women', label: 'Women' },
			{ id: 'kids', label: 'Kids' },
			{ id: 'accessories', label: 'Accessories' },
			{ id: 'footwear', label: 'Footwear' },
		],
	},
	{
		label: 'Brand',
		name: 'brand',
		componentType: 'select',
		options: [
			{ id: 'nike', label: 'Nike' },
			{ id: 'adidas', label: 'Adidas' },
			{ id: 'puma', label: 'Puma' },
			{ id: 'levi', label: "Levi's" },
			{ id: 'zara', label: 'Zara' },
			{ id: 'h&m', label: 'H&M' },
		],
	},
	{
		label: 'Price',
		name: 'price',
		componentType: 'input',
		type: 'number',
		placeholder: 'Enter product price',
	},
	{
		label: 'Sale Price',
		name: 'salePrice',
		componentType: 'input',
		type: 'number',
		placeholder: 'Enter sale price (optional)',
	},
	{
		label: 'Total Stock',
		name: 'totalStock',
		componentType: 'input',
		type: 'number',
		placeholder: 'Enter total stock',
	},
];

export const shoppingViewHeaderMenuItems = [
	{
		id: 'home',
		label: 'Home',
		path: '/shop/home',
	},
	{
		id: 'men',
		label: 'Men',
		path: '/shop/listing',
	},
	{
		id: 'women',
		label: 'Women',
		path: '/shop/listing',
	},
	{
		id: 'kids',
		label: 'Kids',
		path: '/shop/listing',
	},
	{
		id: 'footwear',
		label: 'Footwear',
		path: '/shop/listing',
	},
	{
		id: 'accessories',
		label: 'Accessories',
		path: '/shop/listing',
	},
];

export const filterOptions = {
	category: [
		{ id: 'men', label: 'Men' },
		{ id: 'women', label: 'Women' },
		{ id: 'kids', label: 'Kids' },
		{ id: 'accessories', label: 'Accessories' },
		{ id: 'footwear', label: 'Footwear' },
	],
	brand: [
		{ id: 'nike', label: 'Nike' },
		{ id: 'adidas', label: 'Adidas' },
		{ id: 'puma', label: 'Puma' },
		{ id: 'levi', label: "Levi's" },
		{ id: 'zara', label: 'Zara' },
		{ id: 'h&m', label: 'H&M' },
	],
};

let API_URL;

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
	API_URL = 'http://localhost:5000';

	// eslint-disable-next-line no-undef
} else if (process.env.NODE_ENV === 'production') {
	API_URL = 'https://e-commerce-backend-8kn7.onrender.com';
} else {
	// Default or testing environment
	API_URL = 'https://e-commerce-backend-8kn7.onrender.com';
}

export { API_URL };