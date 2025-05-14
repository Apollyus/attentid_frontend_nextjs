// Import pro styly, pokud budete používat CSS Modules (volitelné)
// import styles from './admin.module.css';
// import Sidebar from '@/components/Sidebar'; // Sidebar is now in layout.tsx
import UserListComponent from '@/components/UserListComponent'; // Import the new user list
import DynamicMapWrapper from '@/components/DynamicMapWrapper';
import StatsBentoGrid from '@/components/StatsBentoGrid';

// Hlavní komponenta stránky
export default function Home() {
  return (
    <>
      <DynamicMapWrapper />
      <StatsBentoGrid />
      <UserListComponent className='p-5' /> {/* Use the new user list component */}
    </>
  );
}
