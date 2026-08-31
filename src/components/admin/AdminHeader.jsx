import { Menu } from "lucide-react";

export default function AdminHeader({ onMenuClick }) {
  return (
    <header
      dir="rtl"
      className="
        sticky
        top-0
        z-30
        border-b
        border-white/10
        bg-[#0b0b0b]/90
        px-4
        py-4
        backdrop-blur-xl
        sm:px-6
        lg:px-10
      "
    >
      <div className="flex items-center justify-between">

        {/* Right */}
        <div>

          <p className="text-[11px] tracking-[3px] text-primary">
            FARHIDWOOD ADMIN
          </p>

          <h1 className="mt-1 text-lg font-bold text-white sm:text-xl">
            پنل مدیریت
          </h1>

        </div>

        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            text-white
            transition
            hover:border-primary
            hover:text-primary
            lg:hidden
          "
        >
          <Menu size={22} />
        </button>

      </div>
    </header>
  );
}