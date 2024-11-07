import { HomeIcon, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingViewHeaderMenuItems } from '@/config';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { logoutUser } from '@/store/auth-slice';

const ShoppingHeader = () => {
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const MenuItems = () => {
		return (
			<nav className='flex flex-col mb-3 gap-6 lg:mb-0  lg:items-center lg:flex-row'>
				{shoppingViewHeaderMenuItems.map((menuItem) => (
					<Link
						key={menuItem.id}
						to={menuItem.path}
						className='text-sm font-medium'
					>
						{menuItem.label}
					</Link>
				))}
			</nav>
		);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	const HeaderRightContent = () => {
		console.log(user, 'user ');
		return (
			<div className='flex flex-col gap-4 lg:items-center lg:flex-row '>
				<Button
					variant='outline'
					size='icon'
				>
					<ShoppingCart className='w-6 h-6' />
					<span className='sr-only'>USer Cart</span>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className='bg-black '>
							<AvatarFallback className='bg-black text-white font-extrabold'>
								{user.userName[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						side='right'
						className='w-56 '
					>
						<DropdownMenuLabel>
							Logged in as {user.userName}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								navigate('/shop/account');
							}}
						>
							<UserCog className='mr-2 h-4 w-4' />
							Account
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<LogOut className='h-4 w-4 mr-2' />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		);
	};

	return (
		<header className='sticky top-0 z-40 w-full border-b bg-background'>
			<div className='flex h-16 items-center justify-between px-4 md:px-6 '>
				<Link
					to='/shop/home'
					className='flex items-center gap-2'
				>
					<HomeIcon className='h-6 w-6 ' />
					<span className='font-bold'>Ecommerce</span>
				</Link>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant='outline'
							size='icon'
							className='lg:hidden'
						>
							<Menu className='h-6 w-6' />
							<span className='sr-only'>Toggle header menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent
						side='left'
						className='w-full max-w-xs '
					>
						<MenuItems />
						<HeaderRightContent />
					</SheetContent>
				</Sheet>
				<div className='hidden lg:block'>
					<MenuItems />
				</div>

				<div className='hidden lg:block'>
					<HeaderRightContent />
				</div>
			</div>
		</header>
	);
};

export default ShoppingHeader;
