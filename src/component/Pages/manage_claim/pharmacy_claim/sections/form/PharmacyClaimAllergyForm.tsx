import { Box, Card, Grid, Group, Text } from "@mantine/core";
import { IconCalendar, IconClipboardList, IconPin, IconPlus } from "@tabler/icons-react";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { PageDateInput, PageNumberInput, PageSelect, PageTextInput } from "../../../../../common/PageInput";
import { useFormHelper } from "../../../../../../services/helperService";
import { notifications } from "@mantine/notifications";
import { pharmacyClaimAllergySchema, type PharmacyClaimAllergyFormType } from "../../../../../../services/zod_schema/manage_claim/pharmacy_claim/zodPharmacyClaimAllergySchema";


export const PharmacyClaimAllergyForm = (props: { dataPass: any }) => {
  const { handleAllergyCallback, receivedAllergieList } = props.dataPass;

  const pharmacyClaimAllergyObject = pharmacyClaimAllergySchema();
  const form = useFormHelper<PharmacyClaimAllergyFormType>({
    initialValues: {
      dateOfAllergy: '',
      numberOfVialsAllergy: 0,
      numberOfTreatmentsAllergy: 0,
      daysSupplyAllergy: "",
      vialContainsAllergy: "",
      administeredByAllergy: "",
      directionsAllergy: '',
      ingredientsAllergy: '',
      chargePerTreatmentAllergy: 0,
      chargeForPreparationAllergy: 0,
      totalChargeAllergy: 0,
    },
    validationSchema: pharmacyClaimAllergyObject,
    mode: "controlled",
  });
  const isLoading = false;
  const onSubmitCall = (data: PharmacyClaimAllergyFormType) => {
    const validatedData = pharmacyClaimAllergyObject.parse(data);
    if (handleAllergyCallback) {
      const newAllergy = {
        dateOfAllergy: validatedData.dateOfAllergy,
        numberOfVialsAllergy: validatedData.numberOfVialsAllergy,
        numberOfTreatmentsAllergy: validatedData.numberOfTreatmentsAllergy,
        daysSupplyAllergy: validatedData.daysSupplyAllergy,
        vialContainsAllergy: validatedData.vialContainsAllergy,
        administeredByAllergy: validatedData.administeredByAllergy,
        directionsAllergy: validatedData.directionsAllergy,
        ingredientsAllergy: validatedData.ingredientsAllergy,
        chargePerTreatmentAllergy: validatedData.chargePerTreatmentAllergy,
        chargeForPreparationAllergy: validatedData.chargeForPreparationAllergy,
        totalChargeAllergy: validatedData.totalChargeAllergy,
      };
      handleAllergyCallback([...receivedAllergieList, newAllergy]);
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
                    submitButtonText="Add Allergy"
                    isLoading={isLoading}
                    submitButtonIcon={<IconPlus size={16} />}>
                    <Grid>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Date of Purchase" required>
                          <PageDateInput
                            placeholder="Select date"
                            {...form.getInputProps("dateOfAllergy")}
                            size="sm"
                            leftSection={<IconCalendar size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Number of Vials" required>
                          <PageNumberInput
                            placeholder="Number of Vials"
                            {...form.getInputProps("numberOfVialsAllergy")}
                            size="sm"
                            leftSection={<IconPin size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Number of Treatments" required>
                          <PageNumberInput
                            placeholder="Number of Treatments"
                            {...form.getInputProps("numberOfTreatmentsAllergy")}
                            size="sm"
                            leftSection={<IconPin size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Days Supply" required>
                          <PageTextInput
                            placeholder="Days Supply"
                            {...form.getInputProps("daysSupplyAllergy")}
                            size="sm"
                            leftSection={<IconPin size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Vial Contains" required>
                          <PageSelect
                            placeholder="Vial Contains"
                            data={['Multi Antigen', 'Single Antigen']}
                            {...form.getInputProps("vialContainsAllergy")}
                            size="sm"
                            leftSection={<IconPin size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Administered By" required>
                          <PageSelect
                            placeholder="Administered By"
                            data={['Self', 'Nurse', 'Physician']}
                            {...form.getInputProps("administeredByAllergy")}
                            size="sm"
                            leftSection={<IconPin size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Directions" required>
                          <PageTextInput
                            placeholder="Directions"
                            {...form.getInputProps("directionsAllergy")}
                            size="sm"
                            leftSection={<IconPin size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Ingredients" required>
                          <PageTextInput
                            placeholder="Ingredients"
                            {...form.getInputProps("ingredientsAllergy")}
                            size="sm"
                            leftSection={<IconPin size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Charge per treatment for professional immunotherapy in your office. (Cost)" required>
                          <PageNumberInput
                            placeholder="Charge per treatment"
                            {...form.getInputProps("chargePerTreatmentAllergy")}
                            size="sm"
                            leftSection={<IconPin size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Charge for preparation of allergenic extract in location other than your office. (Cost)" required>
                          <PageNumberInput
                            placeholder="Charge for preparation"
                            {...form.getInputProps("chargeForPreparationAllergy")}
                            size="sm"
                            leftSection={<IconPin size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                        <FormField label="Total charge for allergenic extract only. (Cost)" required>
                          <PageNumberInput
                            placeholder="Total Charge"
                            {...form.getInputProps("totalChargeAllergy")}
                            size="sm"
                            leftSection={<IconPin size={16} />}
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
