import { BooleanState } from "@/types/utils";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

interface Props {
  dialog: BooleanState;
}

const CartSidebar = ({ dialog }: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (dialog.value) {
      timeoutId = setTimeout(() => {
        dialog.setFalse;
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [dialog.value]);

  return (
    <div className="w-full">
      <div
        className={`transition-all duration-200 ease-in absolute overflow-hidden shadow-lg rounded-2xl border ${
          dialog.value
            ? "right-5 top-24 w-[400px]"
            : "w-0 -right-[200px] top-24"
        }`}
      >
        <div className="p-4 max-w-md w-full bg-white pointer-events-auto  text-slate-900  opacity-100 translate-x-0">
          <div className="flex items-center justify-between">
            <p className="block text-base font-semibold leading-none">
              Added to cart!
            </p>
            <Icon
              onClick={dialog.setFalse}
              icon="iconamoon:close-light"
              className="text-xl cursor-pointer"
            />
          </div>
          <div className="border-t border-slate-200  my-4"></div>
          <div className="flex ">
            <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between ">
                  <div>
                    <h3 className="text-base font-medium ">
                      Hand-Painted Ceramic Vase
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 ">
                      <span>Violet</span>
                      <span className="mx-2 border-l border-slate-200  h-4"></span>
                      <span>Gasio</span>
                    </p>
                  </div>
                  <div className="mt-0.5">
                    <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                      <span className="text-green-500 !leading-none">$500</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500 ">Qty 5</p>
                <div className="flex cursor-pointer">
                  <button
                    type="button"
                    className="font-medium text-blue-600 dark:text-primary-500 "
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
