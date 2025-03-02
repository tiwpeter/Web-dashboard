"use client";

export default function Slieder() {
  return (
    <div className="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0">
      <div className="h-19">
        {/* Fix sidenav-close to pass a string, e.g., "true" */}
        <i
          className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times dark:text-white text-slate-400 xl:hidden"
          sidenav-close="true"
        ></i>
        <a
          className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700"
          href="https://demos.creative-tim.com/argon-dashboard-tailwind/pages/dashboard.html"
          target="_blank"
        >
          <img
            src="/slie/store.png"
            className="inline h-full max-w-full transition-all duration-200 dark:hidden ease-nav-brand max-h-8"
            alt="main_logo"
          />
          <img
            src="/slie/store.png"
            className="hidden h-full max-w-full transition-all duration-200 dark:inline ease-nav-brand max-h-8"
            alt="main_logo"
          />
          <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">
            E-commerce Dashboard 2
          </span>
        </a>
      </div>

      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

      <ul className="flex flex-col pl-0 mb-0">
        <li className="mt-0.5 w-full hover:text-gray-400">
          <a
            href="/pages/dashboard"
            className="p-4 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors dark:text-white dark:opacity-80"
          >
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center ">
              <img src="/slie/home.png" className="w-6 h-6" alt="Home Icon" />
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
              Dashboard
            </span>
          </a>
        </li>
        <li className="mt-0.5 w-full hover:text-gray-400">
          <a
            href="/pages/product"
            className="p-4 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors dark:text-white dark:opacity-80"
          >
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center ">
              <img
                src="/slie/shopping-cart.png"
                className="w-6 h-6"
                alt="Product Icon"
              />
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
              Product
            </span>
          </a>
        </li>
        <li className="mt-0.5 w-full hover:text-gray-400">
          <a
            href="/pages/category"
            className="p-4 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors dark:text-white dark:opacity-80"
          >
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center ">
              <img
                src="/slie/home.png"
                className="w-6 h-6"
                alt="Category Icon"
              />
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
              Category
            </span>
          </a>
        </li>
        <li className="mt-0.5 w-full hover:text-gray-400">
          <a
            href="/pages/order"
            className="p-4 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors dark:text-white dark:opacity-80"
          >
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center ">
              <img
                src="/slie/invoice.png"
                className="w-6 h-6"
                alt="Orders Icon"
              />
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
              Orders
            </span>
          </a>
        </li>

        <li className="w-full mt-4">
          <h6 className="mb-4 pl-6 ml-2 text-xs font-bold leading-tight uppercase dark:text-white opacity-60">
            Account pages
          </h6>
        </li>

        <li className="mt-0.5 w-full">
          <a
            className="dark:text-white dark:opacity-80 p-4 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
            href="./pages/profile.html"
          >
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center ">
              <i className="relative top-0 text-sm leading-normal text-slate-700 ni ni-single-02"></i>
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
              Profile
            </span>
          </a>
        </li>
        <li className="mt-0.5 w-full">
          <a
            className="dark:text-white dark:opacity-80 p-4 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
            href="./pages/sign-in.html"
          >
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center ">
              <i className="relative top-0 text-sm leading-normal text-orange-500 ni ni-single-copy-04"></i>
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
              Sign In
            </span>
          </a>
        </li>

        <li className="mt-0.5 w-full">
          <a
            className="dark:text-white dark:opacity-80 p-4 py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
            href="./pages/sign-up.html"
          >
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center ">
              <i className="relative top-0 text-sm leading-normal text-cyan-500 ni ni-collection"></i>
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
              Sign Up
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}
