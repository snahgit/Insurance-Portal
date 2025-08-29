import { toast } from "react-toastify";
import type { ToastOptions, ToastPosition as ReactToastifyPosition } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Initialize React Sweet Alert
const MySwal = withReactContent(Swal);

// Alert Types
export type AlertType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = ReactToastifyPosition;
export type SweetAlertPosition = 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end';

// Toast Alert Configuration Interface
export interface ToastAlertData {
    message: string;
    type: AlertType;
    position?: ToastPosition;
    autoClose?: number | false;
    hideProgressBar?: boolean;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
    draggable?: boolean;
    theme?: 'light' | 'dark' | 'colored';
    className?: string;
    progressClassName?: string;
    toastId?: string | number;
}

// Sweet Alert Configuration Interface
export interface SweetAlertData {
    title?: string;
    text?: string;
    html?: string;
    icon: AlertType;
    type: 'simple' | 'confirm';
    isCancel?: boolean;
    showCancelButton?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
    allowOutsideClick?: boolean;
    allowEscapeKey?: boolean;
    timer?: number;
    timerProgressBar?: boolean;
    showCloseButton?: boolean;
    focusConfirm?: boolean;
    position?: SweetAlertPosition;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
    customClass?: {
        container?: string;
        popup?: string;
        header?: string;
        title?: string;
        closeButton?: string;
        icon?: string;
        image?: string;
        content?: string;
        input?: string;
        actions?: string;
        confirmButton?: string;
        cancelButton?: string;
        footer?: string;
    };
}

// Sweet Alert Confirm Result Interface
export interface SweetAlertResult {
    isConfirmed: boolean;
    isDenied?: boolean;
    isDismissed?: boolean;
    value?: any;
}

// Audio Configuration Interface
export interface AudioConfig {
    enabled: boolean;
    paths: {
        success: string;
        error: string;
        warning: string;
        info: string;
    };
}

/**
 * Alert Service Class for React TypeScript Application
 * Provides unified interface for Toast and Sweet Alert notifications
 */
export class AlertService {
    private static audioConfig: AudioConfig = {
        enabled: true,
        paths: {
            success: 'assets/audio/notification/success/1.mp3',
            error: 'assets/audio/notification/success/2.mp3',
            warning: 'assets/audio/notification/success/3.mp3',
            info: 'assets/audio/notification/success/3.mp3',
        }
    };

    /**
     * Play notification sound based on alert type
     */
    private static playNotificationSound(type: AlertType): void {
        if (!this.audioConfig.enabled) return;

        try {
            const audioPath = this.audioConfig.paths[type];
            const audio = new Audio(audioPath);
            audio.play().catch(error => {
                console.warn('Could not play notification sound:', error);
            });
        } catch (error) {
            console.warn('Audio notification failed:', error);
        }
    }

    /**
     * Configure audio settings
     */
    static configureAudio(config: Partial<AudioConfig>): void {
        this.audioConfig = { ...this.audioConfig, ...config };
    }

    /**
     * Show Toast Alert using react-toastify
     */
    static toastrAlert(data: ToastAlertData): void {
        // Clear existing toasts if needed
        if (data.toastId) {
            toast.dismiss(data.toastId);
        }

        this.playNotificationSound(data.type);

        const toastOptions: ToastOptions = {
            position: data.position || 'bottom-right',
            autoClose: data.autoClose !== undefined ? data.autoClose : 4000,
            hideProgressBar: data.hideProgressBar || false,
            closeOnClick: data.closeOnClick !== undefined ? data.closeOnClick : true,
            pauseOnHover: data.pauseOnHover !== undefined ? data.pauseOnHover : true,
            draggable: data.draggable !== undefined ? data.draggable : true,
            theme: data.theme || 'colored',
            className: data.className,
            progressClassName: data.progressClassName,
            toastId: data.toastId,
        };

        switch (data.type) {
            case 'success':
                toast.success(data.message, toastOptions);
                break;
            case 'error':
                toast.error(data.message, toastOptions);
                break;
            case 'warning':
                toast.warn(data.message, toastOptions);
                break;
            case 'info':
                toast.info(data.message, toastOptions);
                break;
            default:
                toast(data.message, toastOptions);
        }
    }

    /**
     * Show Sweet Alert using SweetAlert2
     */
    static async sweetAlert(data: SweetAlertData): Promise<boolean | SweetAlertResult> {
        this.playNotificationSound(data.icon);

        const iconMap: Record<AlertType, 'success' | 'error' | 'warning' | 'info'> = {
            success: 'success',
            error: 'error',
            warning: 'warning',
            info: 'info',
        };

        const defaultTitles: Record<AlertType, string> = {
            success: 'Success!',
            error: 'Error!',
            warning: 'Warning!',
            info: 'Information',
        };

        if (data.type === 'simple') {
            const result = await MySwal.fire({
                title: data.title || defaultTitles[data.icon],
                text: data.text,
                html: data.html as string,
                icon: iconMap[data.icon],
                position: data.position || 'top',
                showConfirmButton: false,
                timer: data.timer || 1500,
                timerProgressBar: data.timerProgressBar || false,
                showCloseButton: data.showCloseButton || false,
                allowOutsideClick: data.allowOutsideClick !== undefined ? data.allowOutsideClick : true,
                allowEscapeKey: data.allowEscapeKey !== undefined ? data.allowEscapeKey : true,
                customClass: data.customClass,
            });
            return result;
        }

        if (data.type === 'confirm') {
            return new Promise<boolean>((resolve, reject) => {
                MySwal.fire({
                    title: data.title || 'Are you sure?',
                    text: data.text,
                    html: data.html as string,
                    icon: iconMap[data.icon],
                    showConfirmButton: true,
                    showCancelButton: data.isCancel !== undefined ? data.isCancel : true,
                    confirmButtonText: data.confirmButtonText || 'Yes',
                    cancelButtonText: data.cancelButtonText || 'No',
                    confirmButtonColor: data.confirmButtonColor || '#3A9DF8',
                    cancelButtonColor: data.cancelButtonColor || '#dc3545',
                    allowOutsideClick: data.allowOutsideClick !== undefined ? data.allowOutsideClick : false,
                    allowEscapeKey: data.allowEscapeKey !== undefined ? data.allowEscapeKey : true,
                    focusConfirm: data.focusConfirm !== undefined ? data.focusConfirm : true,
                    position: data.position || 'center',
                    customClass: data.customClass,
                }).then((result: SweetAlertResult) => {
                    resolve(result.isConfirmed);
                }).catch((error: Error) => {
                    reject(error);
                });
            });
        }

        throw new Error('Invalid alert type. Use "simple" or "confirm".');
    }

    /**
     * Quick success notification
     */
    static success(message: string, title?: string, useSweet: boolean = false, options?: Partial<ToastAlertData | SweetAlertData>): void | Promise<boolean | SweetAlertResult> {
        if (useSweet) {
            return this.sweetAlert({
                type: 'simple',
                icon: 'success',
                title,
                text: message,
                ...options as Partial<SweetAlertData>,
            });
        }

        this.toastrAlert({
            type: 'success',
            message: title ? `${title}: ${message}` : message,
            ...options as Partial<ToastAlertData>,
        });
    }

    /**
     * Quick error notification
     */
    static error(message: string, title?: string, useSweet: boolean = false, options?: Partial<ToastAlertData | SweetAlertData>): void | Promise<boolean | SweetAlertResult> {
        if (useSweet) {
            return this.sweetAlert({
                type: 'simple',
                icon: 'error',
                title,
                text: message,
                ...options as Partial<SweetAlertData>,
            });
        }

        this.toastrAlert({
            type: 'error',
            message: title ? `${title}: ${message}` : message,
            ...options as Partial<ToastAlertData>,
        });
    }

    /**
     * Quick warning notification
     */
    static warning(message: string, title?: string, useSweet: boolean = false, options?: Partial<ToastAlertData | SweetAlertData>): void | Promise<boolean | SweetAlertResult> {
        if (useSweet) {
            return this.sweetAlert({
                type: 'simple',
                icon: 'warning',
                title,
                text: message,
                ...options as Partial<SweetAlertData>,
            });
        }

        this.toastrAlert({
            type: 'warning',
            message: title ? `${title}: ${message}` : message,
            ...options as Partial<ToastAlertData>,
        });
    }

    /**
     * Quick info notification
     */
    static info(message: string, title?: string, useSweet: boolean = false, options?: Partial<ToastAlertData | SweetAlertData>): void | Promise<boolean | SweetAlertResult> {
        if (useSweet) {
            return this.sweetAlert({
                type: 'simple',
                icon: 'info',
                title,
                text: message,
                ...options as Partial<SweetAlertData>,
            });
        }

        this.toastrAlert({
            type: 'info',
            message: title ? `${title}: ${message}` : message,
            ...options as Partial<ToastAlertData>,
        });
    }

    /**
     * Confirmation dialog
     */
    static async confirm(
        message: string,
        title?: string,
        icon: AlertType = 'warning',
        options?: Partial<SweetAlertData>
    ): Promise<boolean> {
        return this.sweetAlert({
            type: 'confirm',
            icon,
            title,
            text: message,
            ...options,
        }) as Promise<boolean>;
    }

    /**
     * Delete confirmation dialog
     */
    static async confirmDelete(
        itemName?: string,
        title: string = 'Delete Confirmation',
        options?: Partial<SweetAlertData>
    ): Promise<boolean> {
        const message = itemName
            ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
            : 'Are you sure you want to delete this item? This action cannot be undone.';

        return this.confirm(message, title, 'warning', {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#dc3545',
            ...options,
        });
    }

    /**
     * Show loading alert
     */
    static showLoading(title: string = 'Loading...', text?: string): void {
        MySwal.fire({
            title,
            text,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                MySwal.showLoading();
            },
        });
    }

    /**
     * Close any open sweet alert
     */
    static close(): void {
        MySwal.close();
    }

    /**
     * Clear all toast notifications
     */
    static clearToasts(): void {
        toast.dismiss();
    }
}
export default AlertService;