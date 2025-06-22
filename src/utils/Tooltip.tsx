export const Tooltip = ({
  text,
  children,
  position = "top",
  delay = 100,
}: {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}) => (
  <div className="relative inline-block group">
    {children}
    <div
      role="tooltip"
      className={`
        absolute z-50 px-2 py-1 text-xs text-white bg-gray-800 rounded-md whitespace-nowrap
        opacity-0 group-hover:opacity-100 transition-opacity duration-${delay}
        ${
          position === "top" 
            ? "bottom-full left-1/2 transform -translate-x-1/2 mb-1" 
            : position === "bottom" 
            ? "top-full left-1/2 transform -translate-x-1/2 mt-1" 
            : position === "left" 
            ? "right-full top-1/2 transform -translate-y-1/2 mr-1" 
            : "left-full top-1/2 transform -translate-y-1/2 ml-1"
        }
      `}
    >
      {text}
      {/* Tooltip arrow */}
      <div
        className={`
          absolute w-2 h-2 bg-gray-800 transform rotate-45
          ${
            position === "top" 
              ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" 
              : position === "bottom" 
              ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" 
              : position === "left" 
              ? "right-0 top-1/2 -translate-y-1/2 translate-x-1/2" 
              : "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
          }
        `}
      />
    </div>
  </div>
);