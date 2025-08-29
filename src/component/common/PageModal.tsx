import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type ModalConfig = {
    size?: any;
    radius?: any;
    padding?: any;
    withCloseButton?: boolean;
    overlayProps?: any;
    className?: string;
    centered?: boolean;
    fullScreen?: boolean;
    lockScroll?: boolean;
    trapFocus?: boolean;
    closeOnEscape?: boolean;
    closeOnClickOutside?: boolean;
    zIndex?: any;
};

type LegacyDataPass = {
    modalConfig?: ModalConfig;
    title?: ReactNode;
    data?: any;
    component?: ReactNode | ((ctx: { data: any; close: () => void }) => ReactNode);
};

interface PageModalProps {
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
    modalConfig?: ModalConfig;
    data?: any;
    render?: (ctx: { data: any; close: () => void }) => ReactNode;
    children?: ReactNode;
    dataPass?: LegacyDataPass;
}

export const PageModal = (props: PageModalProps) => {
    const legacy = props.dataPass || {};

    const defaults: ModalConfig = {
        size: "lg",
        radius: "md",
        padding: "xl",
        withCloseButton: true,
        overlayProps: { opacity: 0.55, blur: 3 },
        className: "overflow-y-auto text-xl font-heading tracking-wide border border-gray-200 dark:border-gray-700",
        centered: true,
        fullScreen: false,
        lockScroll: true,
        trapFocus: true,
        closeOnEscape: true,
        closeOnClickOutside: true,
    };

    const mergedConfig: ModalConfig = useMemo(
        () => ({
            ...defaults,
            ...(legacy.modalConfig || {}),
            ...(props.modalConfig || {}),
        }),
        [defaults, legacy.modalConfig, props.modalConfig]
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
        <Modal
            opened={opened}
            onClose={doClose}
            title={legacy.title == '' || legacy.title == null || legacy.title == undefined ? internalTitle : legacy.title}
            size={mergedConfig.size}
            radius={mergedConfig.radius}
            padding={mergedConfig.padding}
            withCloseButton={mergedConfig.withCloseButton}
            overlayProps={mergedConfig.overlayProps}
            className={mergedConfig.className}
            centered={mergedConfig.centered}
            fullScreen={mergedConfig.fullScreen}
            lockScroll={mergedConfig.lockScroll}
            trapFocus={mergedConfig.trapFocus}
            closeOnEscape={mergedConfig.closeOnEscape}
            closeOnClickOutside={mergedConfig.closeOnClickOutside}
            zIndex={mergedConfig.zIndex}
        >
            <div className="min-h-[200px]">
                {content}
            </div>
        </Modal>
    );
};
