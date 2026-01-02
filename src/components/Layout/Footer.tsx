import { ShoppingBag } from "lucide-react";

export const Footer = () => (
  <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-12">
    <div className="max-container-w mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2 opacity-60">
        <ShoppingBag size={18} />
        <span className="font-bold">WMT Store</span>
      </div>
      <p className="text-slate-500 text-sm">
        © 2024 Built with React & Tailwind CSS.
      </p>
    </div>
  </footer>
);
