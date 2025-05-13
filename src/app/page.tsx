// Import pro styly, pokud budete používat CSS Modules (volitelné)
// import styles from './admin.module.css';
// import Sidebar from '@/components/Sidebar'; // Sidebar is now in layout.tsx
import UserListSection from '@/components/UserListSection';
import DynamicMapWrapper from '@/components/DynamicMapWrapper';

// Hlavní komponenta stránky
export default function Home() {
  return (
    <>
      <DynamicMapWrapper />
      <UserListSection />
    </>
  );
}
