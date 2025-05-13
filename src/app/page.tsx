// Import pro styly, pokud budete používat CSS Modules (volitelné)
// import styles from './admin.module.css';
import Sidebar from '@/components/Sidebar';
import UserListSection from '@/components/UserListSection';
import DynamicMapWrapper from '@/components/DynamicMapWrapper';

// Hlavní komponenta stránky
export default function Home() {
  return (
    // Hlavní kontejner pro celou palubní desku, využívá Tailwind CSS třídy
    <div className="flex min-h-screen"> {/* dashboard-container: display: flex; min-height: 100vh; */}
      <Sidebar />
      {/* Hlavní obsahová část */}
      <main className="flex-grow p-5 overflow-y-auto"> {/* main-content: flex-grow: 1; padding; overflow-y: auto; */}
        <DynamicMapWrapper />
        <UserListSection />
      </main>
    </div>
  );
}
