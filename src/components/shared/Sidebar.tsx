import Link from "next/link";
type TSidebarItem = {
  id: string;
  title: string;
  link: string;
};

const Sidebar = ({ items }: { items: TSidebarItem[] }) => {
  return (
    <div className="">
      <div className="">
        <ul className="menu  min-h-[500px] w-full mt-2">
          {items.map((item: TSidebarItem) => (
            <li
              className="w-full hover:bg-primary text-black hover:text-white rounded-lg py-1 font-semibold"
              key={item.id}
            >
              <Link href={`/${item.link}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="divider divider-horizontal h-[98%] mt-2"></div>
    </div>
  );
};

export default Sidebar;
