import clsx from "clsx";
import { CheckCircle2 } from "lucide-react";
import { memo } from "react";

interface NotificationProps {
  message: string | null;
}

export const Notification = memo(({ message }: NotificationProps) => {
  if (!message) return null;

  return (
    <div
      className={clsx(
        "fixed bottom-6 left-0 right-0 w-fit m-auto z-[60]",
        "animate-in fade-in slide-in-from-bottom duration-300"
      )}
    >
      <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
        <CheckCircle2 size={18} className="text-emerald-400" />
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
});
