export const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => (
  <div className="relative group">
    {children}
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
      {text}
    </div>
  </div>
);
