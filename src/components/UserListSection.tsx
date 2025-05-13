export default function UserListSection() {
  const users = [
    {
      name: "Uživatel 1",
      email: "uzivatel1@example.com",
      role: "Admin",
      addedDate: "2023-01-15",
      lastActive: "2023-03-10",
    },
    {
      name: "Uživatel 2",
      email: "uzivatel2@example.com",
      role: "Editor",
      addedDate: "2023-02-20",
      lastActive: "2023-03-08",
    },
    {
      name: "Uživatel 3",
      email: "uzivatel3@example.com",
      role: "Viewer",
      addedDate: "2023-03-01",
      lastActive: "2023-03-09",
    },
  ];

  return (
    <section className="mb-5 p-6 border border-secondary rounded-lg bg-background shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-5">Seznam uživatelů</h2>
      <div className="divide-y divide-secondary">
        {users.map((user, index) => (
          <div
            key={index}
            className="py-2 flex justify-between items-center hover:bg-gray-100 rounded-lg px-4 transition-colors"
          >
            <div className="flex flex-wrap items-center gap-x-4">
              <p className="text-lg font-semibold text-foreground">{user.name}</p>
              <p className="text-sm text-foreground">{user.email}</p>
              <p className="text-sm text-gray-600">Role: {user.role}</p>
              <p className="text-sm text-gray-600">Přidán: {user.addedDate}</p>
              <p className="text-sm text-gray-600">Naposledy aktivní: {user.lastActive}</p>
            </div>
            <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-accent transition-colors">
              Akce
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
