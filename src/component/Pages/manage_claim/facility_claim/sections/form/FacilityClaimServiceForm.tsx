import { Box, Card, Grid, Group, Text, NumberInput, ActionIcon } from "@mantine/core";
import { IconCalendar, IconClipboardList, IconMathFunction, IconPin, IconPlus, IconSearch, IconWriting } from "@tabler/icons-react";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { PageDateRangePicker, PageSelect, PageTextInput } from "../../../../../common/PageInput";
import { useFormHelper } from "../../../../../../services/helperService";
import { notifications } from "@mantine/notifications";
import { facilityClaimServiceSchema, type FacilityClaimServiceFormType } from "../../../../../../services/zod_schema/manage_claim/facility_claim/zodFacilityClaimServiceSchema";


export const FacilityClaimServiceForm = (props: { dataPass: any }) => {
  const { handleServiceCallback, receivedServiceList } = props.dataPass;
  const CPT_OPTIONS = [
    { value: "0011A", label: "0011A (ADM SARSCOV2 100MCG/0.5ML1ST)" },
    { value: "0012A", label: "0012A (ADM SARSCOV2 100MCG/0.5ML2ND)" },
    { value: "0100T", label: "0100T (PROSTH RETINA RECEIVE&GEN)" },
    { value: "0148U", label: "0148U (DRUG ASSAY 100+ RX/METABLT)" },
    { value: "0152U", label: "0152U (NFCT BCT FNG PRST DNA >1000)" },
    { value: "0258U", label: "0258U (AI PSOR MRNA 50-100 GEN ALG)" },
  ];

  const facilityClaimServiceObject = facilityClaimServiceSchema();
  const form = useFormHelper<FacilityClaimServiceFormType>({
    initialValues: {
      dateOfService: [null, null],
      placeOfService: "",
      emg: "",
      cptNumber: "",
      cptHcpcs: "",
      modifier: "",
      diagnosisPointer: "",
      charges: 0,
      daysOrUnits: 1,
      epsdtFamilyPlan: "",
      idQual: "",
      referringProviderId: "",
    },
    validationSchema: facilityClaimServiceObject,
    mode: "controlled",
  });
  const isLoading = false;
  const onSubmitCall = (data: FacilityClaimServiceFormType) => {
    const validatedData = facilityClaimServiceObject.parse(data);
    if (handleServiceCallback) {
      const newService = {
        dateOfService: validatedData.dateOfService,
        placeOfService: validatedData.placeOfService,
        emg: validatedData.emg,
        cptNumber: validatedData.cptNumber,
        cptHcpcs: validatedData.cptHcpcs,
        modifier: validatedData.modifier,
        diagnosisPointer: validatedData.diagnosisPointer,
        charges: validatedData.charges,
        daysOrUnits: validatedData.daysOrUnits,
        epsdtFamilyPlan: validatedData.epsdtFamilyPlan,
        idQual: validatedData.idQual,
        referringProviderId: validatedData.referringProviderId,
      };
      handleServiceCallback([...receivedServiceList, newService]);
    }
    setTimeout(() => {
      notifications.show({
        title: "Success!",
        message: "Service added successfully.",
        color: "green",
      });
      form.reset();
    }, 600);
  };

  return (
    <Box>
      <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <Card withBorder radius="md" className="border-sky-200">
                <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                  <Group gap="xs">
                    <IconClipboardList size={16} color="teal" />
                    <Text fw={600} size="sm" className="text-sky-800">Add Service Information</Text>
                  </Group>
                </Card.Section>
                <Card.Section className="px-3 py-3">
                  <FormWrapper
                    form={form}
                    onSubmit={onSubmitCall}
                    submitButtonText="Add Service"
                    isLoading={isLoading}
                    submitButtonIcon={<IconPlus size={16} />}>
                    <Grid>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Date Of Service (From – To)" required>
                          <PageDateRangePicker
                            placeholder="Select range"
                            {...form.getInputProps("dateOfService")}
                            size="sm"
                            leftSection={<IconCalendar size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Place Of Service" required>
                          <PageTextInput
                            placeholder="Place Of Service"
                            {...form.getInputProps("placeOfService")}
                            size="sm"
                            leftSection={<IconPin size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="EMG" required>
                          <PageTextInput
                            placeholder="Enter EMG"
                            {...form.getInputProps("emg")}
                            size="sm"
                            leftSection={<IconWriting size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="CPT Number" required>
                          <PageTextInput
                            placeholder="CPT Number"
                            {...form.getInputProps("cptNumber")}
                            size="sm"
                            rightSection={
                              <ActionIcon
                                variant="subtle"
                                aria-label="Search appointment"
                              // onClick={handleRevealCpt}
                              >
                                <IconSearch size={16} />
                              </ActionIcon>
                            }
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="CPT/HCPCS" required>
                          <PageSelect
                            searchable
                            clearable
                            withCheckIcon
                            placeholder="Select CPT/HCPCS"
                            {...form.getInputProps("cptHcpcs")}
                            data={CPT_OPTIONS}
                            size="sm"
                            leftSection={<IconSearch size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Modifier">
                          <PageTextInput
                            placeholder="Enter modifier"
                            {...form.getInputProps("modifier")}
                            size="sm"
                            leftSection={<IconWriting size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Diagnosis Pointer" required>
                          <PageTextInput
                            placeholder="Enter diagnosis pointer"
                            {...form.getInputProps("diagnosisPointer")}
                            size="sm"
                            leftSection={<IconWriting size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Charges" required>
                          <NumberInput
                            hideControls
                            thousandSeparator
                            placeholder="0.00"
                            {...form.getInputProps("charges")}
                            size="sm"
                            leftSection={<IconMathFunction size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Days or Units" required>
                          <NumberInput
                            hideControls
                            placeholder="0.00"
                            {...form.getInputProps("daysOrUnits")}
                            size="sm"
                            leftSection={<IconMathFunction size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="EPSDT Family Plan" required>
                          <PageTextInput
                            placeholder="Enter EPSDT Family Plan"
                            {...form.getInputProps("epsdtFamilyPlan")}
                            size="sm"
                            leftSection={<IconWriting size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="ID Qual" required>
                          <PageTextInput
                            placeholder="Enter ID Qual"
                            {...form.getInputProps("idQual")}
                            size="sm"
                            leftSection={<IconWriting size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Referring Provider ID" required>
                          <PageTextInput
                            placeholder="Enter Referring Provider ID"
                            {...form.getInputProps("referringProviderId")}
                            size="sm"
                            leftSection={<IconWriting size={16} />}
                          />
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
