import DynamicMapWrapper from '@/components/DynamicMapWrapper';
import StatsBentoGrid from '@/components/StatsBentoGrid';
import UserListComponent from '@/components/UserListComponent';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between py-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Vítejte!</h1>
          <p className="text-gray-600 mt-1">Sledujte přehledy výkonu a funkce aplikace</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="border-b border-gray-300 pb-6 h-fit">
        <StatsBentoGrid />
      </div>

      <div>
        <DynamicMapWrapper />
      </div>
      <UserListComponent showAsActivity={true} />
    </div>
  );
}