import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle.tsx';
import { useFilterStore } from '../stores/useFilterStore.tsx';
import { Zap, Bell, Menu, Search, Settings, X } from 'lucide-react';

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const searchTerm = useFilterStore((state) => state.searchTerm);
  const setSearchTerm = useFilterStore((state) => state.setSearchTerm);

  function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 1024);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
  }

  const links = [
    { href: '/', label: 'Dashboard', current: true },
    { href: '/tools', label: 'Tools' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/', label: 'Settings' },
  ];

  return (
    <>
      <nav className="relative bg-white shadow-sm dark:border-b dark:border-gray-800 dark:bg-black">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2 sm:px-6">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="rounded p-2 text-gray-400 hover:bg-white/5 hover:text-black sm:hidden dark:hover:text-white"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="text-md flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg dark:text-white">
                <Zap size={20} />
              </span>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TechCorp</span>
            </a>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {links.map(({ href, label, current }, index) => (
                  <a
                    key={index}
                    href={href}
                    aria-current={current ? 'page' : undefined}
                    className={`px-3 py-2 text-sm font-medium ${
                      current
                        ? 'hover:text-black dark:text-white dark:hover:text-white'
                        : 'text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {!useIsMobile() && (
            <div className="text-md space-beetween flex items-center justify-end space-x-3 sm:items-stretch">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-gray-500">
                  <Search />
                  <span className="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ThemeToggle />
              <button type="button" className="relative rounded-full px-3 py-2 dark:hover:text-white">
                <Bell className="dark:text-gray-300" />
              </button>
              <button type="button" className="relative rounded-full px-3 py-2 dark:hover:text-white">
                <Settings className="dark:text-gray-300" />
              </button>
            </div>
          )}
          <div className="relative">
            <button className="relative flex rounded-full px-3 py-2 text-gray-400">
              <div className="w-autotext-white flex size-8 items-center space-x-1 rounded-full bg-gray-200 text-sm shadow-xs dark:bg-white"></div>
            </button>

            <ul className="hidden w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden">
                  Your profile
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:outline-hidden">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>

        {useIsMobile() && (
          <div className="text-md flex max-w-7xl items-center justify-between px-4 pb-6">
            <div className="relative w-[250px]">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-gray-500">
                <Search />
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative flex justify-end">
              <ThemeToggle />
              <button type="button" className="relative rounded-full px-3 py-2 dark:hover:text-white">
                <Bell className="dark:text-gray-300" />
              </button>
              <button type="button" className="relative rounded-full px-3 py-2 dark:hover:text-white">
                <Settings className="dark:text-gray-300" />
              </button>
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="space-y-1 px-4 pt-2 pb-3 sm:ml-6 sm:hidden">
            <div className="flex flex-col space-x-4">
              {links.map(({ href, label, current }, index) => (
                <a
                  key={index}
                  href={href}
                  aria-current={current ? 'page' : undefined}
                  className={`px-3 py-2 text-sm font-medium ${
                    current
                      ? 'hover:text-black dark:text-white dark:hover:text-white'
                      : 'text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
