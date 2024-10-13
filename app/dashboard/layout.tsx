import { SideBarMenuItem } from "@/components/sidebar/SideBarMenuItem";
import { BiSolidDashboard } from "react-icons/bi";
import { GrConfigure } from "react-icons/gr";
import { MdDataUsage, MdOutlineAttachMoney } from "react-icons/md";

const links = [
  { name: "Kanban", href: "kanban", description: "Tablero de estado de las compras", icon: (<BiSolidDashboard />) },
  { name: "Compras", href: "shopping", description: "Gestión de las compras", icon: (<MdOutlineAttachMoney />) },
  { name: "Consumos", href: "consumption", description: "Gestión de los consumos", icon: (<MdDataUsage />) },
];
const configLink = { name: "Configuraciones", href: "settings", description: "Reglas del sistema", icon: (<GrConfigure />) }

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-row mt-7 gap-4 mx-4">
      <nav className="hidden sm:flex flex-col w-[275px] min-h-[calc(100vh-3.0rem)] bg-white bg-opacity-10 p-5 rounded-3xl">
        <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
          Supply Chain Kanban<span className="text-blue-700">.</span>
        </h1>

        <div className="border-gray-700 border my-3" />
        <div className="flex flex-col h-full justify-between">
          {/* Opciones del menú */}
          <div>
            {
              links.map(option => (
                <SideBarMenuItem
                  key={option.name}
                  title={option.name}
                  to={option.href}
                  description={option.description}
                  icon={option.icon}
                />
              ))
            }
          </div>
          <SideBarMenuItem
            key={configLink.name}
            title={configLink.name}
            to={configLink.href}
            description={configLink.description}
            icon={configLink.icon}
          />
        </div>

      </nav>

      <section className=" flex flex-col w-full h-[calc(100vh-50px)]  bg-white bg-opacity-10 p-5 rounded-3xl">
        <div className="flex flex-row h-full">
          <div className="flex flex-col flex-auto h-full p-1">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}