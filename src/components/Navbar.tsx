import { useState } from 'react';
import { Bell, Menu, Search, Settings, Sun, X } from 'lucide-react';

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="relative border-b bg-white dark:border-gray-800 dark:bg-black">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2 sm:px-6">
          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="rounded p-2 text-gray-400 hover:bg-white/5 hover:text-white sm:hidden"
          >
            {mobileOpen ? <X color="black" size={24} /> : <Menu color="black" size={24} />}
          </button>
          <div className="text-md flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img
                alt="TechCorp"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TechCorp</span>
            </a>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a href="/" aria-current="page" className="px-3 py-2 text-sm font-medium text-white">
                  Dashboard
                </a>
                <a href="/tools" className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-white">
                  Tools
                </a>
                <a href="/analytics" className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-white">
                  Analytics
                </a>
                <a href="/" className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-white">
                  Settings
                </a>
              </div>
            </div>
          </div>
          <div className="text-md space-beetween flex items-center justify-center space-x-3 sm:items-stretch sm:justify-end">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="me-1 rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              <Search className="text-gray-300" />
              <span className="sr-only">Search tools...</span>
            </button>
            <div className="relative hidden md:block">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-gray-500">
                <Search />
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Search tools..."
              />
            </div>
            <button
              type="button"
              className="relative rounded-full px-3 py-2 focus:outline-2 focus:outline-offset-2 dark:hover:text-white"
            >
              <Sun className="text-gray-300" />
            </button>
            <button
              type="button"
              className="relative rounded-full px-3 py-2 text-gray-400 focus:outline-2 focus:outline-offset-2 dark:hover:text-white"
            >
              <Bell className="text-gray-300" />
            </button>
            <button
              type="button"
              className="relative rounded-full px-3 py-2 text-gray-400 focus:outline-2 focus:outline-offset-2 dark:hover:text-white"
            >
              <Settings className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Panel mobile */}
        {mobileOpen && (
          <div className="space-y-1 px-4 pt-2 pb-3 sm:hidden">{/* map navigation items as links here */}</div>
        )}
      </nav>
    </>
  );
}
