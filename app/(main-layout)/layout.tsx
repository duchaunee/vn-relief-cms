export default function MappingDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex-1 flex flex-col mt-[104px] lg:mt-0 lg:static fixed">
      {children}
    </div>
  );
}
