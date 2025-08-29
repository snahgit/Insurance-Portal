import { notifications } from "@mantine/notifications";
import { useFormHelper } from "../../../../../../services/helperService";
import { Box, Card, Grid, Group, Text } from "@mantine/core";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { IconDevicesPc, IconPlus } from "@tabler/icons-react";
import { useCreateDepartment } from "../../../../../../hooks/query_hooks/departmentHooks";
import { departmentAddEditSchema, type DepartmentAddEditFormType } from "../../../../../../services/zod_schema/medical_provider/department/zodDepartmentAddEditSchema";
import { PageTextarea, PageTextInput } from "../../../../../common/PageInput";

export const DepartmentAddEditForm = (props: { dataPass: any }) => {
    const { departmentInfo } = props.dataPass;
    const departmentObject = departmentAddEditSchema();

    const form = useFormHelper<DepartmentAddEditFormType>({
        initialValues: {
            name: departmentInfo.name || '',
            description: departmentInfo.description || '',
        },
        validationSchema: departmentObject,
        mode: 'controlled',
    });

    const { mutate: createDepartment, status } = useCreateDepartment(() => {
        notifications.show({
            title: 'Success!',
            message: 'Department created successfully',
            color: 'green',
        });
        form.reset();
    });

    const isLoading = status === "pending";
    const mode = departmentInfo.id ? "edit" : "create";

    const onSubmitCall = (formData: DepartmentAddEditFormType) => {
        const validatedData = departmentObject.parse(formData);
        createDepartment(validatedData);
    };

    return (
        <Box>
            <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
                <Card.Section>
                    <Grid>
                        <Grid.Col span={{ base: 12 }}>
                            <Card withBorder radius="md" className="border-blue-200 dark:border-blue-600 bg-white dark:bg-gray-800">
                                <Card.Section className="bg-blue-100 dark:bg-blue-900/30 px-4 py-3 rounded-t-md">
                                    <Group justify="space-between">
                                        <Text fw={600} size="md" className="text-cyan-800 dark:text-cyan-200">Fill out Info</Text>
                                    </Group>
                                </Card.Section>
                                <Card.Section className="px-4 py-3 bg-white dark:bg-gray-800">
                                    <FormWrapper
                                        form={form}
                                        onSubmit={onSubmitCall}
                                        submitButtonText={mode === "create" ? "Create department" : "Update department"}
                                        submitButtonIcon={<IconPlus size={16} />}
                                        isLoading={isLoading}>
                                        <Grid>
                                            <Grid.Col span={{ base: 12 }}>
                                                <FormField label="Department name" required>
                                                    <PageTextInput
                                                        placeholder="Enter department name"
                                                        size="sm"
                                                        {...form.getInputProps('name')}
                                                        leftSection={<IconDevicesPc size={16} />} />
                                                </FormField>
                                            </Grid.Col>
                                            <Grid.Col span={{ base: 12 }}>
                                                <FormField label="Department description" required >
                                                    <PageTextarea
                                                        placeholder="Enter description"
                                                        resize="vertical"
                                                        size="sm"
                                                        rows={5}
                                                        {...form.getInputProps('description')} />
                                                </FormField>
                                            </Grid.Col>
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
