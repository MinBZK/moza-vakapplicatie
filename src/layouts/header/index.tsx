"use client";

const Header = () => {
  return (
    <>
      <div className="absolute top-0 right-0 z-30 h-36 w-36 overflow-hidden">
        <span
          className="absolute top-8 -right-16 w-56 rotate-45 bg-yellow-400 py-1 text-center font-medium shadow-md"
          role="alert"
        >
          In ontwikkeling
        </span>
      </div>
      <header className="border-primary border-b-2 pb-2">
        <div>
          <nav className="">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
              <span className="self-center text-2xl whitespace-nowrap">
                Vakapplicatie
              </span>
              <div
                className="hidden w-full md:block md:w-auto"
                id="navbar-default"
              />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
