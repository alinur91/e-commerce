import React, { RefObject, useEffect } from "react";

type CartProductsSidebarProps = {
  open: boolean;
  children: React.ReactNode;
  sidebarContentRef: RefObject<HTMLElement>;
};

const CartProductsSidebar = ({
  open,
  children,
  sidebarContentRef,
}: CartProductsSidebarProps) => {
  useEffect(() => {
    if (open) {
      // Disable scrolling when the sidebar is open
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling when the sidebar is closed
      document.body.style.overflow = "auto";
    }

    return () => {
      // Restore default overflow property when component unmounts
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div className="pointer-events-auto	fixed bottom-0 z-10 h-full w-full overflow-y-auto backdrop-blur-sm sm:h-[90.5%]">
      <div
        ref={sidebarContentRef as RefObject<HTMLDivElement>}
        className="min-h-dvh w-full bg-white px-4 py-28 shadow-2xl transition-all duration-300 sm:w-[450px] sm:px-8 sm:py-14"
      >
        {children}
      </div>
    </div>
  );
};

export default CartProductsSidebar;
