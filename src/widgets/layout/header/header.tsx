import { Link } from '@tanstack/react-router';

export const Header = () => {
  return (
    <header className="sticky top-0 z-[--z-navbar] flex h-[--navbar-height] items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <div>КНИТУ(КХТИ) Университет</div>
        <ul className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <div>Курсы</div>
          </li>
          <li>
            <Link to="/login">
              <button>Личный кабинет</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
