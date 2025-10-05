import SidebarNotes from './SidebarNotes';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarNotes />
      {children}
    </>
  );
}
