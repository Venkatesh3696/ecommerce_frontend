import { filterOptions } from '@/config';
import React, { Fragment } from 'react';

const ProductFilter = () => {
	return (
		<div className='bg-background rounded-lg shadow-sm'>
			<div className='p-4 border-b'>
				<h2 className='text-lg font-semibold'>Filters</h2>
			</div>
			<div className='p-4 space-y-4'>
				{Object.keys(filterOptions).map((item) => (
					<Fragment key={item}>
						<div>
							<h3 className='text-base font-bold'>{item}</h3>
						</div>
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default ProductFilter;
