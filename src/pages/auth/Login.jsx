import CommonForm from '@/components/common/form';
import { loginFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const initialState = {
	userName: '',
	password: '',
};

const AuthLogin = () => {
	const [formData, setForData] = useState(initialState);
	const dispatch = useDispatch();
	const { toast } = useToast();

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(loginUser(formData)).then((data) => {
			if (data?.payload?.success) {
				toast({
					title: data?.payload?.message,
				});
			} else {
				toast({
					title: data?.message,
					variant: 'destructive',
				});
			}
		});
	};

	return (
		<div className='mx-auto w-full max-w-md space-y-6'>
			<div className='text-center'>
				<h1 className='text-3xl font-bold tracking-tighter text-foreground'>
					Sign in to Account
				</h1>
				<p className='mt-2'>
					Don&apos;t have account?
					<Link
						className='font-medium ml-2 text-primary hover:underline'
						to='/auth/register'
					>
						Register
					</Link>
				</p>
			</div>
			<CommonForm
				formControls={loginFormControls}
				formData={formData}
				setFormData={setForData}
				onSubmit={onSubmit}
				buttonText={'Sign In'}
			/>
		</div>
	);
};

export default AuthLogin;
