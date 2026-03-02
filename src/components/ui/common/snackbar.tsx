import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type RefType = {
  show: (
    message: string,
    opts: { type?: "error" | "warn" | "success"; duration?: number },
  ) => void;
};

const snackbarStyles = {
  error: "bg-red-500/10 border-red-500/20 text-red-600",
  warn: "bg-yellow-500/10 border-yellow-500/20 text-yellow-600",
  success: "bg-green-500/10 border-green-500/20 text-green-600",
};

const Snackbar = forwardRef<RefType>((_props, ref) => {
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"error" | "warn" | "success">("success");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = (
    message: string,
    opts: { type?: "error" | "warn" | "success"; duration?: number },
  ) => {
    setMessage(message);
    setType(opts.type || "success");
    setIsVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, opts.duration || 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Expose the show method to the parent component using the ref
  useImperativeHandle(ref, () => ({
    show,
  }));

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      {isVisible && (
        <div
          className={`p-4 rounded-2xl border ${snackbarStyles[type]} text-sm animate-fade-in`}
        >
          {message}
        </div>
      )}
    </div>
  );
});

Snackbar.displayName = "Snackbar";

export default Snackbar;
