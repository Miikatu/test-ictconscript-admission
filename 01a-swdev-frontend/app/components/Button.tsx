type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; // <- Important!
};

export function Button({ children, onClick, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={` h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
