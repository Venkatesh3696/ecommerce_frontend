import CommonForm from '@/components/common/form';
import { registerFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
	userName: '',
	email: '',
	password: '',
};

const AuthRegister = () => {
	const [formData, setForData] = useState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { toast } = useToast();

	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(registerUser(formData)).then((data) => {
			console.log({ data });

			if (data?.payload?.success) {
				toast({
					title: data?.payload?.message,
				});
				navigate('/auth/login');
			} else {
				toast({
					title: data?.payload?.message,
					variant: 'destructive',
				});
			}
			console.log(data);
		});
	};

	return (
		<div className='mx-auto w-full max-w-md space-y-6'>
			<div className='text-center'>
				<h1 className='text-3xl font-bold tracking-tighter text-foreground'>
					Create new account
				</h1>
				<p className='mt-2'>
					Already have account?
					<Link
						className='font-medium ml-2 text-primary hover:underline'
						to='/auth/login'
					>
						Login
					</Link>
				</p>
			</div>
			<CommonForm
				formControls={registerFormControls}
				formData={formData}
				setFormData={setForData}
				onSubmit={onSubmit}
				buttonText={'Sign Up'}
			/>
		</div>
	);
};

export default AuthRegister;
