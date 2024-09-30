import Link from "next/link";

interface IBreadcrumbProps {
  pageName: string;
  breadcrumbItems: {
    id: number;
    name: string;
    url: string;
  }[];
}

const PageHeader = ({ breadcrumbItems, pageName }: IBreadcrumbProps) => {
  return (
    <div className="bg-white w-full py-3">
      <div className="flex items-start md:items-center justify-between h-full w-full max-w-6xl mx-auto px-5 xl:px-0">
        <div className="text-md md:text-xl font-semibold">{pageName}</div>
        <nav className="flex items-center px-5 py-1 bg-green-500">
          {breadcrumbItems.map((item, index) => (
            <div className="flex items-center">
              <Link href={item.url} key={item.id} className="hover:underline">
                <h3 className={`text-white text-sm font-semibold  capitalize`}>
                  {item.name}
                </h3>
              </Link>
              {index !== breadcrumbItems.length - 1 && (
                <h2 className="mx-2">/</h2>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PageHeader;
