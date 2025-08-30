import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { closeSecurityModal, openSecurityModal } from '../redux/slices/securityModalSlice';
import { PageModal } from '../component/common/PageModal';
import { IconAlertCircle, IconCheck, IconLock, IconShield, IconTypeface } from '@tabler/icons-react';
import { FormField, FormWrapper } from '../component/common/PageFromWrapper';
import { PageSelect, PageTextarea, PageTextInput } from '../component/common/PageInput';
import { Alert, Grid } from '@mantine/core';
import { securityCheckSchema, type SecurityCheckSchemaFormType } from '../services/zod_schema/zodSecurityCheckSchema';
import { notifications } from '@mantine/notifications';
import { useFormHelper } from '../services/helperService';
import { useUpdateSecurityCheck } from '../hooks/query_hooks/securityCheckHooks';

interface SecurityCheckContextProps {
    children?: React.ReactNode;
}

export const useSecurityCheck = () => {
    const dispatch = useDispatch();
    const requireSecurityCheck = (action: () => void, actionType?: string) => {
        dispatch(openSecurityModal({ onSuccessAction: actionType }));
        const actionId = `security_action_${Date.now()}`;
        (window as any)[actionId] = action;
        sessionStorage.setItem('pendingSecurityAction', actionId);
    };
    return { requireSecurityCheck };
};

export const SecurityCheckContext: React.FC<SecurityCheckContextProps> = ({ children }) => {
    const dispatch = useDispatch();
    const securityModal = useSelector((state: RootState) => state.securityModal);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [securityPinText, setSecurityPinText] = useState<string>('Security pin');

    const securityCheckObject = securityCheckSchema();

    const form = useFormHelper<SecurityCheckSchemaFormType>({
        initialValues: {
            securityPin: 'test123',
            securityType: 'View detail access',
            reason: 'NA',
        },
        validationSchema: securityCheckObject,
        mode: 'controlled',
    });

    const { mutate: updateSecurityCheck, status } = useUpdateSecurityCheck(() => {
        setIsLoading(status === 'pending' ? true : false);
        notifications.show({
            title: 'Success!',
            message: 'Security check updated successfully',
            color: 'green',
        });
        form.reset();
    });

    const onSubmitCall = async (formData: SecurityCheckSchemaFormType) => {
        setIsLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const isSecurityValid = true;
            if (isSecurityValid) {
                handleSecuritySuccess();
            } else {
                setError('Security check failed. Please contact administrator.');
            }
        } catch (err) {
            setError('An error occurred during security validation. Please try again.');
        } finally {
            setIsLoading(false);
        }
        const validatedData = securityCheckObject.parse(formData);
        updateSecurityCheck({ id: 'someId', body: validatedData });
    };

    const handleSecuritySuccess = () => {
        const actionId = sessionStorage.getItem('pendingSecurityAction');
        if (actionId && (window as any)[actionId]) {
            const action = (window as any)[actionId];
            action();
            delete (window as any)[actionId];
            sessionStorage.removeItem('pendingSecurityAction');
        }
        form.reset();
        dispatch(closeSecurityModal());
    };

    const handleSecurityClose = () => {
        const actionId = sessionStorage.getItem('pendingSecurityAction');
        if (actionId) {
            delete (window as any)[actionId];
            sessionStorage.removeItem('pendingSecurityAction');
        }

        dispatch(closeSecurityModal());
    };

    useEffect(() => {
        if (securityModal.onSuccessAction == 'treatment') {
            setSecurityPinText('Patient authorization pin');
        }
    }, [securityModal.onSuccessAction]);

    return (
        <Fragment>
            {children}
            <PageModal
                opened={securityModal.isOpen}
                onClose={handleSecurityClose}
                title="Security Verification Required"
                modalConfig={{
                    size: 'lg',
                    centered: true,
                    closeOnClickOutside: false,
                    closeOnEscape: false,
                    zIndex: 300
                }}
            >
                <div className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-md">
                    <div className="text-center mb-6">
                        <IconShield size={48} className="mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Security Verification</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Please confirm your action and provide necessary details for security purposes.
                        </p>
                    </div>

                    <FormWrapper
                        form={form}
                        onSubmit={onSubmitCall}
                        isLoading={isLoading}
                        error={error}
                        submitButtonText="Verify & Proceed"
                        showCancelButton={true}
                        onCancel={handleSecurityClose}
                        submitButtonIcon={<IconCheck size={16} />}
                        columns={1}
                        actionButtonAlignment="center"
                    >
                        <Grid>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <FormField label={securityPinText} required>
                                    <PageTextInput
                                        placeholder="Enter security pin..."
                                        size='sm'
                                        {...form.getInputProps('securityPin')}
                                        leftSection={<IconLock size={16} />}
                                    />
                                </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <FormField label="Security Type" required>
                                    <PageSelect
                                        placeholder="Select action type..."
                                        {...form.getInputProps('securityType')}
                                        data={[
                                            'Quick view access',
                                            'View detail access',
                                            'Edit access',
                                            'Delete access',
                                            'Other'
                                        ]}
                                        searchable
                                        leftSection={<IconTypeface size={16} />}
                                    />
                                </FormField>
                            </Grid.Col>
                            {form.values.securityType === 'Other' && (
                                <Grid.Col span={{ base: 12 }}>
                                    <FormField label="Reason" required>
                                        <PageTextarea
                                            placeholder="Enter the reason for this action..."
                                            {...form.getInputProps('reason')}
                                            rows={4}
                                            minRows={3}
                                            maxRows={6}
                                            autosize
                                        />
                                    </FormField>
                                </Grid.Col>
                            )}
                        </Grid>
                    </FormWrapper>

                    <Alert icon={<IconAlertCircle size={16} />}
                        color="blue"
                        variant="light"
                        className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200"
                    >
                        <strong>Security Notice:</strong> All actions are logged and monitored for security purposes.
                        Please ensure you have proper authorization for this action.
                    </Alert>
                </div>
            </PageModal>
        </Fragment>
    );
};
