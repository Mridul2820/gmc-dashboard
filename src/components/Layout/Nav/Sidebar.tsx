import { useState } from "react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronRight, ChevronDown } from "lucide-react";

const sidebarItems = [
  {
    title: "Brands",
    subItems: [
      { name: "All Brands", href: "/dashboard/brands" },
      { name: "Add Brand", href: "/dashboard/brands/add" },
    ],
  },
];

export default function Sidebar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="sticky top-0 h-screen w-64 bg-gray-900 text-white p-4 border-r border-gray-800">
      <nav className="space-y-4">
        {sidebarItems.map((item) => (
          <Collapsible key={item.title} open={openSections[item.title]}>
            <CollapsibleTrigger
              className="flex items-center justify-between w-full p-2 text-lg font-medium hover:bg-gray-800 rounded-lg transition-all"
              onClick={() => toggleSection(item.title)}
            >
              {item.title}
              {openSections[item.title] ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-4 border-l border-gray-700 pl-2 space-y-2 mt-2">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  className="block p-2 text-sm hover:text-blue-400 transition-colors"
                >
                  {subItem.name}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </nav>
    </aside>
  );
}
