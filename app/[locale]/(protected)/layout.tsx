import Navbar from '@/components/Navbar';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '5rem' }}>{children}</main>
    </>
  );
}
