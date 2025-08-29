import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Drawer, useDrawersStack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type DrawerConfig = {
  offset?: number;
  radius?: any;
  position?: "left" | "right" | "top" | "bottom";
  size?: any;
  padding?: any;
  withCloseButton?: boolean;
  withOverlay?: boolean;
  overlayProps?: any;
  className?: string;
};

type LegacyDataPass = {
  drawerConfig?: DrawerConfig;
  title?: ReactNode;
  data?: any;
  component?: ReactNode | ((ctx: { data: any; close: () => void }) => ReactNode);
};

interface PageDrawerProps {
  opened?: boolean;
  onClose?: () => void;
  onOpenReady?: (api: {
    open: () => void;
    close: () => void;
    toggle: () => void;
    setTitle: (t: ReactNode) => void;
    setData: (d: any) => void;
  }) => void;
  onOpen?: (openFn: () => void) => void;
  title?: ReactNode;
  drawerConfig?: DrawerConfig;
  data?: any;
  render?: (ctx: { data: any; close: () => void }) => ReactNode;
  children?: ReactNode;
  dataPass?: LegacyDataPass;
}

export const PageDrawer = (props: PageDrawerProps) => {
  const legacy = props.dataPass || {};
  const stack = useDrawersStack(['delete-page', 'confirm-action', 'really-confirm-action']);
  const defaults: DrawerConfig = {
    offset: 8,
    radius: "md",
    position: "right",
    size: "lg",
    padding: "xl",
    withCloseButton: true,
    withOverlay: true,
    overlayProps: { opacity: 0.55, blur: 3 },
    className: "overflow-y-auto text-xl font-heading tracking-wide border-gray-200 dark:border-gray-700",
  };

  const mergedConfig: DrawerConfig = useMemo(
    () => ({
      ...defaults,
      ...(legacy.drawerConfig || {}),
      ...(props.drawerConfig || {}),
    }),
    [defaults, legacy.drawerConfig, props.drawerConfig]
  );

  const [internalOpened, handlers] = useDisclosure(false);
  const isControlled = typeof props.opened === "boolean";
  const opened = isControlled ? (props.opened as boolean) : internalOpened;

  const doClose = () => {
    if (isControlled) props.onClose?.();
    else handlers.close();
  };

  const [internalTitle, setInternalTitle] = useState<ReactNode>(
    props.title ?? legacy.title ?? null
  );
  const [internalData, setInternalData] = useState<any>(
    props.data ?? legacy.data ?? null
  );

  useEffect(() => {
    if (props.title !== undefined) setInternalTitle(props.title);
    if (props.data !== undefined) setInternalData(props.data);
  }, [props.title, props.data]);

  useEffect(() => {
    const api = {
      open: handlers.open,
      close: handlers.close,
      toggle: handlers.toggle,
      setTitle: setInternalTitle,
      setData: setInternalData,
    };

    props.onOpenReady?.(api);
    props.onOpen?.(handlers.open);
  }, []);
  const content = useMemo(() => {
    if (typeof props.render === "function") {
      return props.render({ data: internalData, close: doClose });
    }
    if (props.children) return props.children;

    const legacyComp = legacy.component;
    if (typeof legacyComp === "function") {
      return legacyComp({ data: internalData, close: doClose });
    }
    if (legacyComp) return legacyComp;

    return <span>No content provided</span>;
  }, [props.render, props.children, legacy.component, internalData]);

  return (
    <Drawer.Stack>
      <Drawer
        {...stack.register('delete-page')}
        offset={mergedConfig.offset}
        radius={mergedConfig.radius}
        opened={opened}
        onClose={doClose}
        title={legacy.title == '' || legacy.title == null || legacy.title == undefined ? internalTitle : legacy.title}
        position={mergedConfig.position}
        size={mergedConfig.size}
        padding={mergedConfig.padding}
        withCloseButton={mergedConfig.withCloseButton}
        overlayProps={mergedConfig.overlayProps}
        className={mergedConfig.className}
        withOverlay={mergedConfig.withOverlay}
      >
        <div className="">{content}</div>
      </Drawer>
    </Drawer.Stack>
  );
};
