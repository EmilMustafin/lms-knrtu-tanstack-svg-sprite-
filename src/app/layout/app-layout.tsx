import { Link, Outlet } from '@tanstack/react-router';
import { useAppLayout } from './useAppLayout';
import { Button } from '../../shared/ui/button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu/dropdown-menu';
import { Icon } from '@/shared/ui/icon/icon';
import { Input } from '@/shared/ui/input/input';
import { Footer } from '@/widgets/layout';

export const AppLayout = () => {
  const { handleLogout } = useAppLayout();

  return (
    <main>
      <div className="h-[calc(100dvh-var(--footer-height))]">
        <div className="flex h-full flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-[--z-navbar] flex h-[--navbar-height] items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="relative ml-auto flex-1 md:grow-0">
              <Icon
                name="search"
                className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Icon
                    name="user"
                    className="h-6 w-6"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/settings">Настройки</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => void handleLogout()}>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <div className="grid flex-1 items-start gap-4 overflow-scroll p-4">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};
