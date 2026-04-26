import Navbar from '@/components/Navbar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5rem', paddingBottom: '3rem' }}>
        {children}
      </main>
    </>
  );
}
