const MenuSection = ({ number, title, emoji, children }) => (
  <div className="mb-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-yellow-400">{emoji}</span>
      <h2 className="font-bold text-[18px] text-red-600">
        {number}. {title}
      </h2>
    </div>
    <div className="grid md:grid-cols-4 gap-5">{children}</div>
  </div>
);

export default MenuSection;
