import { HomeIcon, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logoutUser } from "@/store/auth-slice";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

const ShoppingHeader = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState("");

  const { user } = useSelector((state) => state.auth);

  const MenuItems = () => {
    const handleNavigate = (getCurrentMenuItem) => {
      sessionStorage.removeItem("filters");
      console.log(getCurrentMenuItem);
      const currentFilter =
        getCurrentMenuItem.id !== "home"
          ? { category: [getCurrentMenuItem.id] }
          : null;

      if (currentFilter) {
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        navigate(
          `${getCurrentMenuItem.path}?category=${getCurrentMenuItem.id}`
        );
      } else {
        sessionStorage.removeItem("filters");
        navigate(getCurrentMenuItem.path);
      }
    };

    return (
      <nav className="flex flex-col mb-3 gap-6 lg:mb-0  lg:items-center lg:flex-row">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
          <Label
            key={menuItem.id}
            onClick={() => handleNavigate(menuItem)}
            className="text-sm font-medium cursor-pointer"
          >
            {menuItem.label}
          </Label>
        ))}
      </nav>
    );
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const HeaderRightContent = () => {
    return (
      <div className="flex flex-col gap-4 lg:items-center lg:flex-row ">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/shop/cart")}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User Cart</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black cursor-pointer ">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56 top-20">
            <DropdownMenuLabel>Logged in as {user.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigate("/shop/account");
              }}
            >
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch, user]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 ">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HomeIcon className="h-6 w-6 " />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs ">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
