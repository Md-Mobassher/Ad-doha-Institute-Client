import Link from "next/link";
type TSidebarItem = {
  id: string;
  title: string;
  link: string;
};

const Sidebar = ({ items }: { items: TSidebarItem[] }) => {
  return (
    <div className="">
      <ul className="menu  min-h-[500px] w-full">
        {items.map((item: TSidebarItem) => (
          <li
            className="w-full hover:bg-primary text-black hover:text-white rounded-lg py-1 lg:px-2 px-0 font-semibold text-wrap "
            key={item.id}
          >
            <Link href={`/${item.link}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
