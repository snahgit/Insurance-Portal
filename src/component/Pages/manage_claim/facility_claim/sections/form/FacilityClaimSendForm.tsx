import { Alert, Badge, Box, Card, Grid, Group, Stack, ThemeIcon } from "@mantine/core";
import { IconDevicesPc, IconInfoCircle, IconMail } from "@tabler/icons-react";
import moment from "moment";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { PageTextarea, PageTextInput } from "../../../../../common/PageInput";
import { useFormHelper } from "../../../../../../services/helperService";
import { facilityClaimSendSchema, type FacilityClaimSendFormType } from "../../../../../../services/zod_schema/manage_claim/facility_claim/zodFacilityClaimSendSchema";

export const FacilityClaimSendForm = (props: { dataPass: any }) => {
  const claim = props.dataPass?.claim ?? null;

  const facilityClaimSendObject = facilityClaimSendSchema();

  const form = useFormHelper<FacilityClaimSendFormType>({
    initialValues: {
      subject: '',
      content: '',
    },
    validationSchema: facilityClaimSendObject,
    mode: 'controlled',
  });

  // const { mutate: updateSecurityPin, status } = useUpdateSecurityPin(() => {
  //   notifications.show({
  //     title: 'Success!',
  //     message: 'Security PIN updated successfully',
  //     color: 'green',
  //   });
  //   form.reset();
  // });

  const isLoading = status === "pending";

  const onSubmitCall = (__formData: FacilityClaimSendFormType) => {
    // const validatedData = facilityClaimSendObject.parse(formData);
    // updateSecurityPin({ id: id, body: validatedData });
  };

  return (
    <Box>
      <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
        <Card.Section>
          <Grid>
            <Grid.Col span={{ base: 12 }}>
              <Card withBorder radius="md" className="border-blue-200">
                <Card.Section className="p-4">
                  {claim && (
                    <Alert
                      variant="light"
                      color={claim.status === "Accepted" ? "green" : "yellow"}
                      icon={<ThemeIcon variant="light" radius="xl"><IconInfoCircle size={16} /></ThemeIcon>}
                      title="Claim summary">
                      <Stack gap={6}>
                        <Group gap="xs" wrap="wrap">
                          <Badge variant="light" color="blue">
                            {claim.billSnahId}
                          </Badge>
                          <Badge variant="light" color="blue">
                            {claim.snahId}
                          </Badge>
                          <Badge
                            variant="light"
                            color={claim.status === "Accepted" ? "green" : "yellow"}
                          >
                            {claim.status}
                          </Badge>
                          <Badge variant="light" color="teal">
                            {moment(claim.claimDate).format("MMM DD, YYYY")}
                          </Badge>
                          <Badge variant="light" color="indigo">
                            ${claim.totalFee}
                          </Badge>
                        </Group>
                      </Stack>
                    </Alert>
                  )}
                </Card.Section>
                <Card.Section className="p-4">
                  <FormWrapper
                    form={form}
                    onSubmit={onSubmitCall}
                    submitButtonText="Send"
                    submitButtonIcon={<IconMail size={16} />}
                    isLoading={isLoading}>
                    <Grid>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Subject" required>
                          <PageTextInput
                            placeholder="Enter email subject"
                            size="sm"
                            {...form.getInputProps('subject')}
                            leftSection={<IconDevicesPc size={16} />}
                          />
                        </FormField>
                      </Grid.Col>
                      <Grid.Col span={{ base: 12 }}>
                        <FormField label="Message" required >
                          <PageTextarea
                            placeholder="Enter email message"
                            size="sm"
                            rows={5}
                            resize="vertical"
                            {...form.getInputProps('content')}
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