"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  Calendar,
  Settings,
  LogOut,
  Sun,
  Moon,
  User,
  UserPlus,
} from "lucide-react";

import { useTheme } from "next-themes";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success("You have been logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800 px-4 md:px-6">
      <Link
        href="/"
        className="flex items-center gap-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
      >
        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <span className="text-xl">API Dashboard</span>
      </Link>

      <div className="ml-auto flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-800"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-800"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-slate-800 border-blue-200 dark:border-slate-700"
            >
              <DropdownMenuLabel>
                {session.user?.name || session.user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/login")}
              className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-slate-700"
            >
              <User className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button
              variant="default"
              onClick={() => router.push("/register")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Register
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
