import { notifications } from "@mantine/notifications";
import { useFormHelper } from "../../../../../../services/helperService";
import { Box, Card, Grid, Group, Text } from "@mantine/core";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { IconDevicesPc, IconPlus } from "@tabler/icons-react";
import { useCreateDepartment } from "../../../../../../hooks/query_hooks/departmentHooks";
import { PageSelect, PageTextarea, PageTextInput } from "../../../../../common/PageInput";
import { helpSupportAddEditSchema, type HelpSupportAddEditFormType } from "../../../../../../services/zod_schema/quick_assist/help_support/zodHelpSupportAddEditSchema";
import type { RootState } from "../../../../../../redux/store";
import { useSelector } from "react-redux";

export const HelpSupportAddEditForm = (props: { dataPass: any }) => {
    const { helpSupportInfo } = props.dataPass;
    const modalDrawer = useSelector((state: RootState) => state.modalDrawer);
    const helpSupportAddEditObject = helpSupportAddEditSchema();
    const form = useFormHelper<HelpSupportAddEditFormType>({
        initialValues: {
            title: helpSupportInfo?.title || '',
            description: helpSupportInfo?.description || '',
            category: helpSupportInfo?.category?.name || '',
            priority: helpSupportInfo?.priority || '',
            message: '',
        },
        validationSchema: helpSupportAddEditObject,
        mode: 'controlled',
    });

    const { mutate: __createDepartment, status } = useCreateDepartment(() => {
        notifications.show({
            title: 'Success!',
            message: 'Department created successfully',
            color: 'green',
        });
        form.reset();
    });

    const isLoading = status === "pending";
    const mode = helpSupportInfo.id ? "edit" : "create";

    const onSubmitCall = (__formData: HelpSupportAddEditFormType) => {
        // const validatedData = helpSupportAddEditObject.parse(formData);
        // createDepartment(validatedData);
    };

    return (
        <Box>
            <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
                <Card.Section>
                    <Grid>
                        <Grid.Col span={{ base: 12 }}>
                            <Card withBorder radius="md" className="border-blue-200">
                                <Card.Section className="bg-blue-100 px-4 py-3 rounded-t-md">
                                    <Group justify="space-between">
                                        <Text fw={600} size="md" className="text-cyan-800">Fill out below all info</Text>
                                    </Group>
                                </Card.Section>
                                <Card.Section className="px-4 py-3">
                                    <FormWrapper
                                        form={form}
                                        onSubmit={onSubmitCall}
                                        submitButtonText={mode === "create" ? "Create ticket" : "Update ticket"}
                                        submitButtonIcon={<IconPlus size={16} />}
                                        isLoading={isLoading}>
                                        <Grid>
                                            <Grid.Col span={{ base: 12 }}>
                                                <FormField label="Title" required error={form.errors.name as string} >
                                                    <PageTextInput
                                                        placeholder="Enter title"
                                                        size="sm"
                                                        {...form.getInputProps('title')}
                                                        leftSection={<IconDevicesPc size={16} />}
                                                    />
                                                </FormField>
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12 }}>
                                                <FormField label="Description" required >
                                                    <PageTextarea
                                                        placeholder="Enter description"
                                                        resize="vertical"
                                                        size="sm"
                                                        rows={5}
                                                        {...form.getInputProps('description')} />
                                                </FormField>
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                                <FormField label="Category" required >
                                                    <PageSelect
                                                        placeholder="Select Category"
                                                        size="sm"
                                                        data={['Account and Login Issues', 'Technical Issues', 'Billing Issues']}
                                                        leftSection={<IconDevicesPc size={16} />}
                                                        {...form.getInputProps('category')}>
                                                    </PageSelect>
                                                </FormField>
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                                <FormField label="Priority" required >
                                                    <PageSelect
                                                        placeholder="Select Priority"
                                                        size="sm"
                                                        data={['High', 'Medium', 'Low']}
                                                        leftSection={<IconDevicesPc size={16} />}
                                                        {...form.getInputProps('priority')}>
                                                    </PageSelect>
                                                </FormField>
                                            </Grid.Col>
                                            {modalDrawer.pageModal.type === 'add' && (
                                                <Grid.Col span={{ base: 12 }}>
                                                    <FormField label="Your message" required >
                                                        <PageTextarea
                                                            placeholder="Enter your message"
                                                            resize="vertical"
                                                            size="sm"
                                                            rows={5}
                                                            {...form.getInputProps('message')} />
                                                    </FormField>
                                                </Grid.Col>
                                            )}
                                        </Grid>
                                    </FormWrapper>
                                </Card.Section>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Card.Section>
            </Card>
        </Box>
    );
};
