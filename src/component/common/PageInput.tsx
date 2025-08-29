import React, { useState } from 'react';
import { TextInput, PasswordInput, NumberInput, Textarea, Select, MultiSelect, Radio, Checkbox, Switch, Box, Group, Text, Button, ActionIcon, Paper, Center, Progress, Alert, Badge } from '@mantine/core';
import { DateInput, DatePickerInput, TimeInput, DateTimePicker, TimePicker } from '@mantine/dates';
import { Dropzone, IMAGE_MIME_TYPE, type FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconFile, IconTrash, IconDownload, IconEye, IconCloudUpload } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface BaseInputProps {
    label?: string;
    placeholder?: string;
    required?: boolean;
    resize?: string;
    error?: string;
    description?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    disabled?: boolean;
    readonly?: boolean;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    className?: string;
    name?: string,
    value?: any;
    clearable?: boolean;
    hideControls?: boolean;
    withCheckIcon?: boolean;
    thousandSeparator?: boolean;
    nothingFoundMessage?: string;
    timePickerProps?: any;
    valueFormat?: string;
    withDropdown?: boolean;
    format?: string;
    onChange?: (value: any) => void;
}

export const PageTextInput: React.FC<BaseInputProps> = ({
    label,
    placeholder,
    required,
    error,
    description,
    size = 'sm',
    disabled,
    readonly,
    leftSection,
    rightSection,
    className,
    value,
    name,
    onChange,
    ...props
}) => (
    <TextInput
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        description={description}
        size={size}
        disabled={disabled}
        readOnly={readonly}
        leftSection={leftSection}
        rightSection={rightSection}
        className={`${className} bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600`}
        value={value}
        name={name}
        onChange={(e) => !readonly && onChange?.(e.target.value)}
        {...props}
    />
);

export const PagePasswordInput: React.FC<BaseInputProps> = ({
    label,
    placeholder,
    required,
    error,
    description,
    size = 'sm',
    disabled,
    readonly,
    leftSection,
    rightSection,
    className,
    value,
    onChange,
    ...props
}) => (
    <PasswordInput
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        description={description}
        size={size}
        disabled={disabled}
        readOnly={readonly}
        leftSection={leftSection}
        rightSection={rightSection}
        className={`${className} bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600`}
        value={value}
        onChange={(e) => !readonly && onChange?.(e.target.value)}
        {...props}
    />
);

export const PageNumberInput: React.FC<BaseInputProps & { min?: number; max?: number; step?: number }> = ({
    label,
    placeholder,
    required,
    error,
    description,
    size = 'sm',
    disabled,
    readonly,
    leftSection,
    rightSection,
    className,
    value,
    onChange,
    min,
    max,
    thousandSeparator,
    hideControls,
    step,
    ...props
}) => (
    <NumberInput
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        description={description}
        size={size}
        hideControls={hideControls}
        thousandSeparator={thousandSeparator}
        disabled={disabled}
        readOnly={readonly}
        leftSection={leftSection}
        rightSection={rightSection}
        className={`${className} bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600`}
        value={value}
        onChange={readonly ? undefined : onChange}
        min={min}
        max={max}
        step={step}
        {...props}
    />
);

export const PageTextarea: React.FC<BaseInputProps & { rows?: number; autosize?: boolean; minRows?: number; maxRows?: number }> = ({
    label,
    placeholder,
    required,
    error,
    description,
    size = 'sm',
    disabled,
    readonly,
    className,
    value,
    onChange,
    rows,
    autosize,
    minRows,
    resize,
    maxRows,
    ...props
}) => (
    <Textarea
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        description={description}
        size={size}
        disabled={disabled}
        readOnly={readonly}
        className={`${className} bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600`}
        value={value}
        resize={resize as 'none' | 'both' | 'horizontal' | 'vertical' | undefined}
        onChange={(e) => !readonly && onChange?.(e.target.value)}
        rows={rows}
        autosize={autosize}
        minRows={minRows}
        maxRows={maxRows}
        {...props}
    />
);

export const PageSelect: React.FC<BaseInputProps & { data: string[] | { value: string; label: string }[]; searchable?: boolean; clearable?: boolean }> = ({
    label,
    placeholder,
    required,
    error,
    description,
    size = 'sm',
    disabled,
    readonly,
    leftSection,
    rightSection,
    className,
    value,
    onChange,
    data,
    searchable,
    clearable,
    nothingFoundMessage = 'No options found',
    ...props
}) => (
    <Select
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        description={description}
        size={size}
        disabled={disabled || readonly}
        leftSection={leftSection}
        rightSection={rightSection}
        className={`${className} bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600`}
        value={value}
        onChange={readonly ? undefined : onChange}
        data={data}
        searchable={readonly ? false : searchable}
        clearable={readonly ? false : clearable}
        nothingFoundMessage={nothingFoundMessage}
        {...props}
    />
);

export const PageMultiSelect: React.FC<BaseInputProps & { data: string[] | { value: string; label: string }[]; searchable?: boolean; clearable?: boolean }> = ({
    label,
    placeholder,
    required,
    error,
    description,
    size = 'sm',
    disabled,
    readonly,
    leftSection,
    rightSection,
    className,
    value,
    onChange,
    data,
    searchable,
    withCheckIcon,
    clearable,
    ...props
}) => (
    <MultiSelect
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        description={description}
        size={size}
        disabled={disabled || readonly}
        leftSection={leftSection}
        rightSection={rightSection}
        className={`${className} bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600`}
        value={value}
        onChange={readonly ? undefined : onChange}
        data={data}
        withCheckIcon={withCheckIcon}
        searchable={readonly ? false : searchable}
        clearable={readonly ? false : clearable}
        {...props}
    />
);

interface PageRadioGroupProps extends BaseInputProps {
    data: { value: string; label: string }[];
    orientation?: 'horizontal' | 'vertical';
    color?: string;
}

export const PageRadioGroup: React.FC<PageRadioGroupProps> = ({
    label,
    required,
    error,
    description,
    value,
    onChange,
    data,
    readonly,
    orientation = 'horizontal',
    color = 'blue',
    ...props
}) => (
    <Box className="bg-transparent dark:bg-transparent">
        {label && (
            <Text size="sm" fw={500} mb={5} className="text-gray-900 dark:text-white">
                {label} {required && <span style={{ color: 'red' }}>*</span>}
            </Text>
        )}
        {description && (
            <Text size="xs" c="dimmed" mb={5} className="text-gray-600 dark:text-gray-400">
                {description}
            </Text>
        )}
        <Radio.Group value={value} onChange={readonly ? undefined : onChange} error={error} {...props}>
            <Group mt="xs" style={{ flexDirection: orientation === 'vertical' ? 'column' : 'row' }}>
                {data.map((item) => (
                    <Radio
                        key={item.value}
                        value={item.value}
                        label={item.label}
                        color={color}
                        disabled={readonly}
                    />
                ))}
            </Group>
        </Radio.Group>
    </Box>
);

interface PageCheckboxGroupProps extends BaseInputProps {
    data: { value: string; label: string }[];
    orientation?: 'horizontal' | 'vertical';
    color?: string;
}

export const PageCheckboxGroup: React.FC<PageCheckboxGroupProps> = ({
    label,
    required,
    error,
    description,
    value = [],
    onChange,
    data,
    readonly,
    orientation = 'horizontal',
    color = 'blue',
}) => {
    const handleChange = (itemValue: string, checked: boolean) => {
        if (readonly) return;

        if (checked) {
            onChange?.([...value, itemValue]);
        } else {
            onChange?.(value.filter((v: string) => v !== itemValue));
        }
    };

    return (
        <Box className="bg-transparent dark:bg-transparent">
            {label && (
                <Text size="sm" fw={500} mb={5} className="text-gray-900 dark:text-white">
                    {label} {required && <span style={{ color: 'red' }}>*</span>}
                </Text>
            )}
            {description && (
                <Text size="xs" c="dimmed" mb={5}>
                    {description}
                </Text>
            )}
            <Group mt="xs" style={{ flexDirection: orientation === 'vertical' ? 'column' : 'row' }}>
                {data.map((item) => (
                    <Checkbox
                        key={item.value}
                        label={item.label}
                        color={color}
                        checked={value.includes(item.value)}
                        disabled={readonly}
                        onChange={(e) => handleChange(item.value, e.currentTarget.checked)}
                    />
                ))}
            </Group>
            {error && (
                <Text size="xs" c="red" mt={5}>
                    {error}
                </Text>
            )}
        </Box>
    );
};

export const PageDateInput: React.FC<BaseInputProps> = ({
    label,
    placeholder,
    required,
    error,
    description,
    size = 'sm',
    disabled,
    readonly,
    leftSection,
    rightSection,
    className,
    value,
    onChange,
    ...props
}) => (
    <DateInput
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        description={description}
        size={size}
        disabled={disabled || readonly}
        leftSection={leftSection}
        rightSection={rightSection}
        className={`${className} bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600`}
        value={value}
        onChange={readonly ? undefined : onChange}
        {...props}
    />
);

export const PageDateRangePicker: React.FC<BaseInputProps> = ({
    label,
    placeholder,
    required,
    error,
    description,
    size = 'sm',
    disabled,
    readonly,
    leftSection,
    rightSection,
    className,
    value,
    clearable,
    onChange,
    valueFormat,
    ...props
}) => (
    <DatePickerInput
        type="range"
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        description={description}
        size={size}
        disabled={disabled || readonly}
        leftSection={leftSection}
        rightSection={rightSection}
        className={className}
        value={value}
        valueFormat={valueFormat}
        clearable={readonly ? false : clearable}
        onChange={readonly ? undefined : onChange}
        {...props}
    />
);

export const PageTimeInput: React.FC<BaseInputProps> = ({
    label,
    placeholder,
    required,
    error,
    description,
    size = 'sm',
    disabled,
    readonly,
    leftSection,
    rightSection,
    className,
    value,
    onChange,
    ...props
}) => (
    <TimeInput
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        description={description}
        size={size}
        disabled={disabled || readonly}
        leftSection={leftSection}
        rightSection={rightSection}
        className={className}
        value={value}
        onChange={readonly ? undefined : onChange}
        {...props}
    />
);

export const PageTimePicker: React.FC<BaseInputProps & { withSeconds?: boolean }> = ({
    label,
    required,
    error,
    description,
    withDropdown,
    size = 'sm',
    disabled,
    readonly,
    className,
    value,
    format = "12h",
    onChange,
    withSeconds = false,
    ...props
}) => (
    <TimePicker
        label={label}
        required={required}
        withDropdown={withDropdown}
        error={error}
        description={description}
        size={size}
        disabled={disabled || readonly}
        className={`${className} bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600`}
        value={value}
        // format={format}
        withSeconds={withSeconds}
        onChange={readonly ? undefined : onChange}
        {...props}
    />
);

export const PageDateTimeInput: React.FC<BaseInputProps> = ({
    label,
    placeholder,
    required,
    error,
    description,
    size = 'sm',
    disabled,
    readonly,
    leftSection,
    rightSection,
    className,
    value,
    clearable,
    timePickerProps,
    valueFormat,
    onChange,
    ...props
}) => (
    <DateTimePicker
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        description={description}
        size={size}
        readOnly={readonly}
        disabled={disabled}
        leftSection={leftSection}
        valueFormat={valueFormat}
        rightSection={rightSection}
        className={`${className} bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600`}
        value={value}
        clearable={readonly ? false : clearable}
        timePickerProps={timePickerProps}
        onChange={readonly ? undefined : onChange}
        {...props}
    />
);

export const PageSwitch: React.FC<BaseInputProps & { color?: string }> = ({
    label,
    description,
    disabled,
    readonly,
    value,
    onChange,
    color = 'blue',
    ...props
}) => (
    <Switch
        label={label}
        description={description}
        disabled={disabled || readonly}
        checked={value}
        onChange={(e) => !readonly && onChange?.(e.currentTarget.checked)}
        color={color}
        {...props}
    />
);

interface PageFileUploadProps extends BaseInputProps {
    accept?: string[];
    multiple?: boolean;
    maxSize?: number;
    onDrop?: (files: FileWithPath[], isMultiple: boolean) => void;
    onReject?: (files: any[]) => void;
    uploadedFiles?: File[];
    onRemoveFile?: (index: number) => void;
    showPreview?: boolean;
    height?: number;
    uploadText?: string;
    supportText?: string;
}

export const PageFileUpload: React.FC<PageFileUploadProps> = ({
    label,
    required,
    error,
    description,
    accept = IMAGE_MIME_TYPE,
    multiple = false,
    maxSize = 5 * 1024 ** 2,
    onDrop,
    onReject,
    uploadedFiles = [],
    onRemoveFile,
    showPreview = true,
    height = 200,
    uploadText = "Drop files here or click to select",
    supportText,
    className,
}) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [showUploadedFiles, setShowUploadedFiles] = useState(false);

    // Dynamic support text based on multiple prop
    const defaultSupportText = multiple
        ? "Attach as many files as you like, each file should not exceed 5MB"
        : "Upload a single file, should not exceed 5MB";

    const finalSupportText = supportText || defaultSupportText;

    // Dynamic upload text based on multiple prop
    const defaultUploadText = multiple
        ? "Drop files here or click to select"
        : "Drop file here or click to select";

    const finalUploadText = uploadText === "Drop files here or click to select" ? defaultUploadText : uploadText;

    const handleDrop = (files: FileWithPath[]) => {
        setIsDragActive(false);
        const filesToProcess = multiple ? files : files.slice(0, 1);
        setIsUploading(true);
        setUploadProgress(0);
        onDrop?.(filesToProcess, multiple);
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
                return prev + 20;
            });
        }, 50);
    };

    const handleReject = (files: any[]) => {
        setIsDragActive(false);
        onReject?.(files);
        notifications.show({
            title: 'Upload Error',
            message: 'Some files were rejected. Please check file size and type.',
            color: 'red',
        });
    };

    const getFileIcon = (file: File) => {
        if (file.type.startsWith('image/')) {
            return <IconPhoto size={20} />;
        }
        return <IconFile size={20} />;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Box className={`${className} bg-transparent dark:bg-transparent`}>
            {label && (
                <Group justify="space-between" align="center" mb={8}>
                    <Text size="sm" fw={500} className="text-gray-900 dark:text-white">
                        {label} {required && <span style={{ color: 'red' }}>*</span>}
                    </Text>
                    <Badge
                        size="xs"
                        variant="light"
                        color={multiple ? "blue" : "green"}
                        className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    >
                        {multiple ? "Multiple Files" : "Single File"}
                    </Badge>
                </Group>
            )}
            {description && (
                <Text size="xs" c="dimmed" mb={8} className="text-gray-600 dark:text-gray-400">
                    {description}
                </Text>
            )}

            <Paper
                withBorder
                className={`relative overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 ${isDragActive
                    ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                    } ${error ? 'border-red-400 dark:border-red-500' : ''}`}
                style={{ minHeight: height }}
            >
                {/* Main Upload Area */}
                {!showUploadedFiles && (
                    <Dropzone
                        onDrop={handleDrop}
                        onReject={handleReject}
                        onDragEnter={() => setIsDragActive(true)}
                        onDragLeave={() => setIsDragActive(false)}
                        maxSize={maxSize}
                        accept={accept}
                        multiple={multiple}
                        className="h-full"
                        styles={{
                            root: {
                                border: 'none',
                                backgroundColor: 'transparent',
                                padding: 0,
                            },
                            inner: {
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        }}
                    >
                        <Center style={{ minHeight: height }}>
                            <Box className="text-center p-6">
                                <div className="mb-4">
                                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${isDragActive
                                        ? 'bg-blue-100 dark:bg-blue-900/30 scale-110'
                                        : 'bg-gray-100 dark:bg-gray-800'
                                        }`}>
                                        <IconCloudUpload
                                            size={32}
                                            className={`transition-colors duration-300 ${isDragActive
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'text-gray-600 dark:text-gray-400'
                                                }`}
                                        />
                                    </div>
                                </div>

                                <Text size="lg" fw={600} mb={4} className={`transition-colors duration-300 ${isDragActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                                    }`}>
                                    {finalUploadText}
                                </Text>

                                <Text size="sm" c="dimmed" mb={16} className="text-gray-500 dark:text-gray-400">
                                    {finalSupportText}
                                </Text>

                                <Button
                                    variant="light"
                                    color="blue"
                                    size="sm"
                                    leftSection={<IconUpload size={16} />}
                                    className="transition-all duration-300 hover:scale-105"
                                >
                                    {multiple ? "Choose Files" : "Choose File"}
                                </Button>
                            </Box>
                        </Center>
                    </Dropzone>
                )}

                {/* Uploaded Files View */}
                {showUploadedFiles && uploadedFiles.length > 0 && showPreview && (
                    <Box p={16} style={{ minHeight: height }}>
                        <Group justify="space-between" align="center" mb={16}>
                            <Text size="sm" fw={500}>
                                {multiple
                                    ? `Uploaded Files (${uploadedFiles.length})`
                                    : "Uploaded File"
                                }
                            </Text>
                            <Button
                                variant="light"
                                size="xs"
                                leftSection={<IconUpload size={14} />}
                                onClick={() => setShowUploadedFiles(false)}
                            >
                                Upload More
                            </Button>
                        </Group>

                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {uploadedFiles.map((file, index) => (
                                <Paper
                                    key={index}
                                    withBorder
                                    className="p-3 transition-all duration-200 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <Group justify="space-between">
                                        <Group>
                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                                {getFileIcon(file)}
                                            </div>
                                            <Box>
                                                <Text size="sm" fw={500} lineClamp={1}>
                                                    {file.name}
                                                </Text>
                                                <Text size="xs" c="dimmed">
                                                    {formatFileSize(file.size)}
                                                </Text>
                                            </Box>
                                        </Group>
                                        <Group gap={8}>
                                            {file.type.startsWith('image/') && (
                                                <ActionIcon
                                                    variant="light"
                                                    color="blue"
                                                    size="sm"
                                                    onClick={() => {
                                                        const url = URL.createObjectURL(file);
                                                        window.open(url, '_blank');
                                                    }}
                                                >
                                                    <IconEye size={14} />
                                                </ActionIcon>
                                            )}
                                            <ActionIcon
                                                variant="light"
                                                color="green"
                                                size="sm"
                                                onClick={() => {
                                                    const url = URL.createObjectURL(file);
                                                    const a = document.createElement('a');
                                                    a.href = url;
                                                    a.download = file.name;
                                                    a.click();
                                                }}
                                            >
                                                <IconDownload size={14} />
                                            </ActionIcon>
                                            <ActionIcon
                                                variant="light"
                                                color="red"
                                                size="sm"
                                                onClick={() => onRemoveFile?.(index)}
                                            >
                                                <IconTrash size={14} />
                                            </ActionIcon>
                                        </Group>
                                    </Group>
                                </Paper>
                            ))}
                        </div>
                    </Box>
                )}

                {isUploading && (
                    <Box className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                        <Text size="sm" mb={8} className="text-center">
                            Uploading files...
                        </Text>
                        <Progress value={uploadProgress} size="sm" radius="xl" />
                    </Box>
                )}

                {/* File Count Badge */}
                {uploadedFiles.length > 0 && !showUploadedFiles && (
                    <Box className="absolute top-3 right-3">
                        <Button
                            variant="filled"
                            size="xs"
                            color="blue"
                            onClick={() => setShowUploadedFiles(true)}
                            leftSection={<IconFile size={14} />}
                        >
                            {uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''}
                        </Button>
                    </Box>
                )}
            </Paper>

            {error && (
                <Alert color="red" variant="light" mt={8}>
                    <Text size="sm">{error}</Text>
                </Alert>
            )}
        </Box>
    );
};

const PageInput = {
    Text: PageTextInput,
    Password: PagePasswordInput,
    Number: PageNumberInput,
    Textarea: PageTextarea,
    Select: PageSelect,
    MultiSelect: PageMultiSelect,
    RadioGroup: PageRadioGroup,
    CheckboxGroup: PageCheckboxGroup,
    Date: PageDateInput,
    DateRange: PageDateRangePicker,
    Time: PageTimeInput,
    TimePicker: PageTimePicker,
    DateTime: PageDateTimeInput,
    Switch: PageSwitch,
    FileUpload: PageFileUpload,
};

export default PageInput;