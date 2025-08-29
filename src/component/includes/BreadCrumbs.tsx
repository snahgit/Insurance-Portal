import { Breadcrumbs, Anchor, Box } from "@mantine/core";
import { Fragment } from "react/jsx-runtime";

interface BreadcrumbItem {
  title: string;
  href: string;
  isActive?: boolean;
  className?: string;
}

interface BreadcrumbConfig {
  pageTitle: string;
  items: BreadcrumbItem[];
}

export const Breadcrumb = (props: { dataPass?: BreadcrumbConfig; }) => {
  const { pageTitle, items } = props.dataPass || {};

  return (
    <Fragment>
      <Box className="mb-3 py-3">
        <Box className="pb-2">
          <h3 className="text-[27px] font-bold mb-0 text-color-blue dark:text-gray-200">
            {pageTitle || "Page"}
          </h3>
        </Box>
        <Box>
          <Breadcrumbs className="">
            {items?.map((item, index) => {
              return (
                <Anchor
                  href={item.href}
                  key={index}
                  className={`${item.className + `${item.href == "#" ?
                    ' cursor-default' :
                    ' cursor-pointer dark:hover:text-gray-400 hover:text-blue-800 duration-75'}`
                    + ' text-sm no-underline hover:no-underline'} 
                    ${!item.isActive ?
                      'text-gray-500 dark:text-gray-50' :
                      'text-blue-600 dark:text-gray-200'}`}
                  style={item.isActive ? { pointerEvents: 'none' } : {}}>{item.title}</Anchor>
              );
            })}
          </Breadcrumbs>
        </Box>
      </Box>
    </Fragment>
  );
};
