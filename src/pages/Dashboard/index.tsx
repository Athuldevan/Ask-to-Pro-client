import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
      </div>
    </>
  );
}
