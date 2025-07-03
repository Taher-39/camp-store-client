import { NavLink } from "react-router-dom";
import {
  ShoppingCart,
  // Users,
  Package,
  Settings,
  LogOut,
  Percent,
  // MessageSquare,
  User,
  Home,
  Heart,
  History,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/Auth/authSlice";

interface SidebarProps {
  mobileView?: boolean;
  onLinkClick?: () => void;
}

const Sidebar = ({ mobileView = false, onLinkClick }: SidebarProps) => {
  const user = useAppSelector(useCurrentUser);

  const guestLinks = [
    {
      name: "Login",
      path: "/login",
      icon: <LogIn className="h-5 w-5" />,
    },
    {
      name: "Register",
      path: "/register",
      icon: <UserPlus className="h-5 w-5" />,
    },
  ];

  // Common links for all users
  const commonLinks = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-5 w-5" />,
      roles: ["admin", "super_admin", "modaretor", "customer"],
    },
    {
      name: "Profile",
      path: "/account/profile",
      icon: <User className="h-5 w-5" />,
      roles: ["admin", "super_admin", "modaretor", "customer"],
    },
    {
      name: "Settings",
      path: "/account/settings",
      icon: <Settings className="h-5 w-5" />,
      roles: ["admin", "super_admin", "modaretor", "customer"],
    },
    {
      name: "Track Order",
      path: "/track-order",
      icon: <History className="h-5 w-5" />,
      roles: ["customer"],
    },
  ];

  // Admin-only links
  const adminLinks = [
    {
      name: "Products",
      path: "/admin/product-management",
      icon: <Package className="h-5 w-5" />,
      roles: ["admin", "super_admin", "modaretor"],
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      roles: ["admin", "super_admin", "modaretor"],
    },
    // {
    //   name: "Customers",
    //   path: "/admin/customers",
    //   icon: <Users className="h-5 w-5" />,
    //   roles: ["admin", "super_admin", "modaretor"],
    // },
    {
      name: "Coupons",
      path: "/admin/coupon-management",
      icon: <Percent className="h-5 w-5" />,
      roles: ["admin", "super_admin", "modaretor"],
    },
    // {
    //   name: "Messages",
    //   path: "/admin/messages",
    //   icon: <MessageSquare className="h-5 w-5" />,
    //   roles: ["admin", "super_admin", "modaretor"],
    // },
  ];

  // Customer-only links
  const customerLinks = [
    {
      name: "My Orders",
      path: "/my-orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      roles: ["customer"],
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: <Heart className="h-5 w-5" />,
      roles: ["customer"],
    },
  ];

  // Combine all links and filter by user role
  const allLinks = [...commonLinks, ...adminLinks, ...customerLinks];
  let filteredLinks = [{ name: "", path: "/", icon: <></>, roles: [""] }];
  if (user) {
    filteredLinks = allLinks.filter((link) => link.roles.includes(user.role));
  }

  return (
    <div className={`flex flex-col h-full ${mobileView ? "p-2" : ""}`}>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {(user ? filteredLinks : guestLinks).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#9EA647]/10 text-[#818a27]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#818a27]"
                }`
              }
            >
              {link.icon}
              <span className="ml-3">{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {user && (
        <div className="border-t p-4">
          <button className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-[#818a27]">
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
