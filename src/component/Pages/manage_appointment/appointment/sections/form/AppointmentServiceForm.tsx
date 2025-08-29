import { useState } from "react";
import { Card, Grid, Group, Text, Badge, ActionIcon, Paper, Divider, Box } from "@mantine/core";
import { IconPercentage, IconCalculator, IconBuildingBank, IconPlus, IconTrash, IconCurrencyDollar, IconMedicalCross } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { useFormHelper } from "../../../../../../services/helperService";
import { zodAppointmentServiceSchema, type AppointmentServiceFormType } from "../../../../../../services/zod_schema/appointment/zodAppointmentServiceSchema";
import { PageSelect, PageTextInput } from "../../../../../common/PageInput";

export const AppointmentServiceForm = (_props: { dataPass: any }) => {
  const appointmentServiceSchema = zodAppointmentServiceSchema();
  const form = useFormHelper<AppointmentServiceFormType>({
    initialValues: {
      services: [
        {
          serviceName: "",
          serviceFee: "",
        }
      ],
      totalServiceFee: "",
      taxPercentage: "",
      totalEstimatedCharge: "",
      userPay: "",
      insurancePay: "",
      insuranceCompany: "",
    },
    validationSchema: appointmentServiceSchema,
    mode: "controlled",
  });

  // const { status } = useAddCat(() => {
  //   // Success callback placeholder
  // });

  const isLoading = false;

  const onSubmitCall = () => {
    try {
      notifications.show({
        title: "Success!",
        message: "Outpatient form submitted successfully",
        color: "green",
      });
      console.log("Form Data:", form.values);
      console.log("Services:", form.values.services);
      form.reset();
      setServiceIds([Math.floor(Math.random() * 100)]);
    } catch (error) {
      notifications.show({
        title: "Error!",
        message: "Please check all required fields",
        color: "red",
      });
    }
  };

  const [serviceIds, setServiceIds] = useState<number[]>([Math.floor(Math.random() * 100)]);

  const handleAddServiceSection = () => {
    const newId = Math.floor(Math.random() * 100);
    setServiceIds((prev) => [...prev, newId]);
    const currentServices = form.values.services || [];
    form.setFieldValue('services', [...currentServices, { serviceName: "", serviceFee: "" }]);
  };

  const handleDeleteServiceSection = (index: number) => {
    if (serviceIds.length <= 1) {
      notifications.show({
        title: "Error",
        color: "red",
        message: "You cannot delete last one",
      });
      return;
    }
    setServiceIds((prev) => prev.filter((_, i) => i !== index));
    const currentServices = form.values.services || [];
    const updatedServices = currentServices.filter((_, i) => i !== index);
    form.setFieldValue('services', updatedServices);
  };

  return (
    <Box className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <Card withBorder radius="md" className="border-blue-200 dark:border-blue-700 mb-4 bg-white dark:bg-gray-800">
                <Card.Section className="bg-blue-100 dark:bg-blue-900/50 px-4 py-3 rounded-t-md">
                  <Group justify="space-between">
                    <Text fw={600} size="md" className="text-blue-800 dark:text-blue-200">Put all information in below</Text>
                  </Group>
                </Card.Section>
                <Card.Section className="px-3 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-lg">
                  <FormWrapper
                    form={form}
                    onSubmit={onSubmitCall}
                    submitButtonText="Submit & accept"
                    isLoading={isLoading}
                    submitButtonIcon={<IconPlus size={16} />}>
                    <Grid>
                      <Grid.Col span={{ base: 12 }}>
                        <Group justify="space-between" align="center" className="mb-4">
                          <Group gap="xs">
                            <IconMedicalCross size={20} className="text-blue-600 dark:text-blue-400" />
                            <Text fw={600} size="lg" className="text-gray-800 dark:text-gray-200">Services & Billing</Text>
                          </Group>
                          <ActionIcon
                            variant="light"
                            color="blue"
                            size="lg"
                            className="hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-300"
                            onClick={handleAddServiceSection}
                          >
                            <IconPlus size={16} />
                          </ActionIcon>
                        </Group>
                        <Grid gutter="md">
                          {serviceIds && serviceIds.length !== 0 && serviceIds.map((serviceId, index) => (
                            <Grid.Col key={serviceId} span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                              <Paper className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-700 hover:shadow-lg transition-all duration-300 h-full" withBorder >
                                <Group justify="space-between" align="center" className="mb-3">
                                  <Badge color="cyan" variant="light" size="sm" className="font-semibold" >Service #{index + 1}</Badge>
                                  <ActionIcon
                                    variant="light"
                                    color="red"
                                    size="sm"
                                    className="hover:bg-red-100 transition-all duration-300"
                                    onClick={() => handleDeleteServiceSection(index)}
                                  >
                                    <IconTrash size={12} />
                                  </ActionIcon>
                                </Group>
                                <div className="space-y-3">
                                  <Grid>
                                    <Grid.Col span={{ base: 12 }}>
                                      <FormField label="Service Name" required>
                                        <PageTextInput
                                          placeholder="Enter service name"
                                          size="sm"
                                          {...form.getInputProps(`services.${index}.serviceName`)}
                                          className="border-cyan-200 focus:border-cyan-500"
                                          leftSection={<IconMedicalCross size={14} />}
                                        />
                                      </FormField>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12 }}>
                                      <FormField label="Service Fee" required>
                                        <PageTextInput
                                          placeholder="$0.00"
                                          size="sm"
                                          {...form.getInputProps(`services.${index}.serviceFee`)}
                                          className="border-cyan-200 focus:border-cyan-500"
                                          leftSection={<IconCurrencyDollar size={14} />}
                                        />
                                      </FormField>
                                    </Grid.Col>
                                  </Grid>
                                </div>
                              </Paper>
                            </Grid.Col>
                          ))}
                        </Grid>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <Divider my="md" size="xs" variant="dashed" color="blue" label="Put below information" labelPosition="center" className="w-full" />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <Grid>
                          <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 4, xs: 12 }}>
                            <FormField label="Total Service Fee" required>
                              <PageTextInput
                                placeholder="Total Service Fee"
                                size="sm"
                                {...form.getInputProps("totalServiceFee")}
                                leftSection={<IconCurrencyDollar size={16} />}
                              />
                            </FormField>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 4, xs: 12 }}>
                            <FormField label="Tax %" required>
                              <PageTextInput
                                placeholder="Tax %"
                                size="sm"
                                {...form.getInputProps("taxPercentage")}
                                leftSection={<IconPercentage size={16} />}
                              />
                            </FormField>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 4, xs: 12 }}>
                            <FormField label="Total Estimated Charge" required>
                              <PageTextInput
                                placeholder="Total Estimated Charge"
                                {...form.getInputProps("totalEstimatedCharge")}
                                size="sm"
                                leftSection={<IconCalculator size={16} />}
                              />
                            </FormField>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 4, xs: 12 }}>
                            <FormField label="User Pay" required>
                              <PageTextInput
                                placeholder="User Pay"
                                size="sm"
                                {...form.getInputProps("userPay")}
                                leftSection={<IconCurrencyDollar size={16} />}
                              />
                            </FormField>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 4, xs: 12 }}>
                            <FormField label="Insurance Pay" required>
                              <PageTextInput
                                placeholder="Insurance Pay"
                                {...form.getInputProps("insurancePay")}
                                size="sm"
                                leftSection={<IconCurrencyDollar size={16} />}
                              />
                            </FormField>
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, lg: 4, md: 4, sm: 4, xs: 12 }}>
                            <FormField label="Insurance Company" required>
                              <PageSelect
                                placeholder="Insurance Company *"
                                data={["Molina Insurance", "Lifewise Insurance"]}
                                size="sm"
                                {...form.getInputProps("insuranceCompany")}
                                leftSection={<IconBuildingBank size={16} />}
                              />
                            </FormField>
                          </Grid.Col>
                        </Grid>
                      </Grid.Col>
                    </Grid>
                  </FormWrapper>
                </Card.Section>
              </Card>
            </Grid.Col>
          </Grid >
        </Card.Section>
      </Card>
    </Box>
  );
};
