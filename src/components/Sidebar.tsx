export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-background text-foreground p-5 border-r border-secondary"> {/* Use background for sidebar, border-secondary */}
      <h1 className="text-3xl font-bold mb-5 text-primary">AttentID</h1>
      <p className="text text-gray-700">Navigace</p> {/* Lighter text for "Postranní panel" */}
      {/* Navigation items can be added here */}
      {/* Example of a navigation link, if you want to add them later */}
      {/* <nav className="mt-5">
        <a href="#" className="block py-2 px-3 rounded hover:bg-accent hover:text-white">Dashboard</a>
        <a href="#" className="block py-2 px-3 rounded hover:bg-accent hover:text-white mt-1">Users</a>
        <a href="#" className="block py-2 px-3 rounded hover:bg-accent hover:text-white mt-1">Settings</a>
      </nav> */}
    </aside>
  );
}