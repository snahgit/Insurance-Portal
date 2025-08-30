import { Box, Text, Avatar, Badge, Grid, Group, Divider, Paper } from "@mantine/core";
import { IconClipboardList, IconMedicalCross, IconUser, IconPhone, IconMail, IconCalendar, IconMapPin, IconListDetails, IconMathFunction, IconClock, IconCurrencyDollar, IconCheck } from "@tabler/icons-react";
import moment from "moment";
import { format } from "@react-input/mask";
import { SettledPharmacyClaimDetail } from "../detail/SettledPharmacyClaimDetail";
import { SettledFacilityClaimDetail } from "../detail/SettledFacilityClaimDetail";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { PageNumberInput } from "../../../../../common/PageInput";
import { useFormHelper } from "../../../../../../services/helperService";
import { useCreateDepartment } from "../../../../../../hooks/query_hooks/departmentHooks";
import { notifications } from "@mantine/notifications";
import { settledClaimVerifySchema, type SettledClaimVerifyFormType } from "../../../../../../services/zod_schema/manage_claim/settled_claim/zodSettledClaimVerifySchema";

export const SettledClaimVerifyForm = (props: { dataPass: any }) => {
  const { id } = props.dataPass;
  const claimData = {
    claimId: id?.claimId || "CLM-2025-00124",
    claimType: id?.claimType || "Medical Facility/Private Practice",
    status: "Settled",
    appointmentDate: "2025-08-01",
    submissionDate: "2025-08-02",
    settlementDate: "2025-08-18",
    totalCharge: 1250.00,
    amountPaid: 1250.00,
    patientAccountNo: "PA-880032",
    priorAuthNumber: "AUTH-99113",
    resubmissionCode: "",
    resubmissionOriginalRef: "",
    patient: {
      name: "John Doe",
      gender: "Male",
      dob: "1986-03-11",
      phone: "(313) 666-2544",
      email: "john.doe@example.com",
      address: "Austin, TX 78701, USA",
    },
    provider: {
      name: id?.claimType === "Pharmacy" ? "Global Pharmacy" : "SNAH Medical Center",
      specialty: id?.claimType === "Pharmacy" ? "Community Pharmacy" : "Internal Medicine",
      phone: "(313) 777-1022",
      email: "provider@snah.org",
      address: "CA, California, 70275, USA",
    },
    acceptAssignment: "Yes"
  };
  const claim = {
    claimId: claimData?.claimId || "CLM-2025-00124",
    claimType: claimData?.claimType || "Medical Facility/Private Practice",
    status: "Settled",
    appointmentDate: claimData?.appointmentDate || "2025-08-01",
    submissionDate: claimData?.submissionDate || "2025-08-02",
    settlementDate: claimData?.settlementDate || "2025-08-18",
    patientAccountNo: claimData?.patientAccountNo || "PA-880032",
    priorAuthNumber: claimData?.priorAuthNumber || "AUTH-99113",
    resubmissionCode: claimData?.resubmissionCode || "",
    resubmissionOriginalRef: claimData?.resubmissionOriginalRef || "",
    totalCharge: claimData?.totalCharge || 1250.00,
    amountPaid: claimData?.amountPaid || 1250.00,
    acceptAssignment: claimData?.acceptAssignment || "Yes",
  };
  const patient = {
    name: claimData?.patient?.name || "John Doe",
    gender: claimData?.patient?.gender || "Male",
    dob: claimData?.patient?.dob || "1986-03-11",
    phone: claimData?.patient?.phone || "(313) 666-2544",
    email: claimData?.patient?.email || "john.doe@example.com",
    address: claimData?.patient?.address || "Austin, TX 78701, USA",
  };
  const provider = {
    name: claimData?.provider?.name || (claimData?.claimType === "Pharmacy" ? "Global Pharmacy" : "SNAH Medical Center"),
    specialty: claimData?.provider?.specialty || (claimData?.claimType === "Pharmacy" ? "Community Pharmacy" : "Internal Medicine"),
    phone: claimData?.provider?.phone || "(313) 777-1022",
    email: claimData?.provider?.email || "provider@snah.org",
    address: claimData?.provider?.address || "CA, California, 70275, USA",
  };
  const currency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
  const phoneMaskOptions = { mask: "(___) ___-__-__", replacement: { _: /\d/ } };
  const isPharmacy = claimData.claimType === "Pharmacy";
  const themeColor = isPharmacy ? "blue" : "green";
  const gradientClass = isPharmacy
    ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
    : "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20";
  const iconColorClass = isPharmacy ? "text-blue-600 dark:text-blue-400" : "text-green-600 dark:text-green-400";

  const settledClaimVerifyObject = settledClaimVerifySchema();
  const form = useFormHelper<SettledClaimVerifyFormType>({
    initialValues: {
      payingAmount: claim.totalCharge,
    },
    validationSchema: settledClaimVerifyObject,
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
  const onSubmitCall = (__formData: SettledClaimVerifyFormType) => {
    // const validatedData = settledClaimPayObject.parse(formData);
    // createDepartment(validatedData);
  };

  const renderClaimSpecificDetails = () => {
    switch (claimData.claimType) {
      case "Pharmacy":
        return <SettledPharmacyClaimDetail dataPass={{ claimData, from: 'verify' }} />;
      case "Private Practice":
        return <SettledFacilityClaimDetail dataPass={{ claimData, from: 'verify' }} />;
      case "Medical Facility":
        return <SettledFacilityClaimDetail dataPass={{ claimData, from: 'verify' }} />;
      default:
        return <SettledFacilityClaimDetail dataPass={{ claimData, from: 'verify' }} />;
    }
  };

  return (
    <Box>
      <div className={`${gradientClass} rounded-lg p-6 mb-6`}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }} className="flex justify-center mb-6">
            <div className="flex flex-col items-center text-center self-center rounded-md">
              <Avatar radius="md" size={120} className="mb-4 shadow-lg mt-5">
                <IconClipboardList size={64} />
              </Avatar>
              <Text size="xl" fw={600} className="text-gray-800 dark:text-gray-200">
                {claim.claimId}
              </Text>
              <Group gap="xs" mt="xs">
                <Badge color={themeColor} variant="light">
                  {claim.claimType}
                </Badge>
              </Group>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Group gap="xs" className="items-start">
                  <IconCalendar size={18} className={`${iconColorClass} mt-1`} />
                  <div>
                    <Text size="sm" className="text-gray-600 dark:text-gray-400">
                      {isPharmacy ? "Prescription Date" : "Appointment Date"}
                    </Text>
                    <Text fw={500} className="text-gray-800 dark:text-gray-200">
                      {moment(claim.appointmentDate).format("DD-MM-YYYY")}
                    </Text>
                  </div>
                </Group>
                <Group gap="xs" className="items-start">
                  <IconCalendar size={18} className={`${iconColorClass} mt-1`} />
                  <div>
                    <Text size="sm" className="text-gray-600 dark:text-gray-400">
                      Submission Date
                    </Text>
                    <Text fw={500} className="text-gray-800 dark:text-gray-200">{moment(claim.submissionDate).format("DD-MM-YYYY")}</Text>
                  </div>
                </Group>
                <Group gap="xs" className="items-start">
                  <IconClock size={18} className="text-green-600 dark:text-green-400 mt-1" />
                  <div>
                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Settlement Date</Text>
                    <Text fw={500} className="text-gray-800 dark:text-gray-200">{moment(claim.settlementDate).format("DD-MM-YYYY")}</Text>
                  </div>
                </Group>
              </div>
              <div className="space-y-3">
                <Group gap="xs" className="items-start">
                  <IconListDetails size={18} className={`${iconColorClass} mt-1`} />
                  <div>
                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Patient Account #</Text>
                    <Text fw={500} className="text-gray-800 dark:text-gray-200">{claim.patientAccountNo}</Text>
                  </div>
                </Group>
                <Group gap="xs" className="items-start">
                  <IconListDetails size={18} className={`${iconColorClass} mt-1`} />
                  <div>
                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Prior Auth #</Text>
                    <Text fw={500} className="text-gray-800 dark:text-gray-200">{claim.priorAuthNumber || "-"}</Text>
                  </div>
                </Group>
                <Group gap="xs" className="items-start">
                  <IconListDetails size={18} className={`${iconColorClass} mt-1`} />
                  <div>
                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Accept Assignment</Text>
                    <Text fw={500} className="text-gray-800 dark:text-gray-200">{claim.acceptAssignment}</Text>
                  </div>
                </Group>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Paper className={`p-3 rounded-md border ${isPharmacy ? 'border-blue-200' : 'border-green-200 dark:border-green-700'} bg-white/60 dark:bg-gray-800/60`}>
                <Group gap="xs" className="items-start">
                  <IconMathFunction size={18} className={`${iconColorClass} mt-1`} />
                  <div>
                    <Text size="sm" className="text-gray-600 dark:text-gray-400">
                      Total Charge
                    </Text>
                    <Text fw={700} className="text-gray-800 dark:text-gray-200">{currency(claim.totalCharge)}</Text>
                  </div>
                </Group>
              </Paper>
              <Paper className="p-3 rounded-md border border-green-200 dark:border-green-700 bg-white/60 dark:bg-gray-800/60">
                <Group gap="xs" className="items-start">
                  <IconMathFunction size={18} className="text-green-600 dark:text-green-400 mt-1" />
                  <div>
                    <Text size="sm" className="text-gray-600 dark:text-gray-400">Amount Will Paid</Text>
                    <Text fw={700} className="text-gray-800 dark:text-gray-200">{currency(form.values.payingAmount)}</Text>
                  </div>
                </Group>
              </Paper>
            </div>
          </Grid.Col>
          <Divider
            my="md"
            size="xs"
            variant="dashed"
            color={themeColor}
            label="Amount you will pay"
            labelPosition="center"
            className="w-full"
          />
          <Grid.Col span={12}>
            <Paper className="p-3 rounded-md border border-pink-200 dark:border-pink-700 bg-white/60 dark:bg-gray-800/60 max-w-md m-auto">
              <FormWrapper
                form={form}
                onSubmit={onSubmitCall}
                submitButtonText="Change claim amount"
                submitButtonIcon={<IconCheck size={16} />}
                actionButtonAlignment="center"
                isLoading={isLoading}>
                <Grid>
                  <Grid.Col span={{ base: 12 }}>
                    <FormField label="Amount to pay finally" required>
                      <PageNumberInput
                        placeholder="Enter the paying amount"
                        size="sm"
                        leftSection={<IconCurrencyDollar size={16} />}
                        {...form.getInputProps("payingAmount")}
                      />
                    </FormField>
                  </Grid.Col>
                </Grid>
              </FormWrapper>
            </Paper>
          </Grid.Col>
          <Divider
            my="md"
            size="xs"
            variant="dashed"
            color={themeColor}
            label="Parties"
            labelPosition="center"
            className="w-full"
          />
          <Grid.Col span={12}>
            <Grid justify="center">
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Paper className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <Group gap="xs" className="mb-3">
                    <IconUser size={18} className="text-emerald-700 dark:text-emerald-400" />
                    <Text fw={600} className="text-gray-800 dark:text-gray-200">Patient</Text>
                  </Group>
                  <Group gap="xs">
                    <Text fw={600} className="text-gray-800 dark:text-gray-200">{patient.name}</Text>
                    <Badge size="sm" variant="light">{patient.gender}</Badge>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconCalendar size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{moment(patient.dob).format("DD-MM-YYYY")}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconPhone size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{format(patient.phone, phoneMaskOptions)}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconMail size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{patient.email}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconMapPin size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{patient.address}</Text>
                  </Group>
                </Paper>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Paper className="bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-sky-200 dark:border-sky-700">
                  <Group gap="xs" className="mb-3">
                    <IconMedicalCross size={18} className="text-sky-700 dark:text-sky-400" />
                    <Text fw={600} className="text-gray-800 dark:text-gray-200">{isPharmacy ? "Pharmacy" : "Provider"}</Text>
                  </Group>
                  <Text fw={600} className="text-gray-800 dark:text-gray-200">{provider.name}</Text>
                  <Text size="sm" c="dimmed" className="text-gray-600 dark:text-gray-400">{provider.specialty}</Text>
                  <Group gap="xs" mt="xs">
                    <IconPhone size={16} className="text-sky-700 dark:text-sky-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{format(provider.phone, phoneMaskOptions)}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconMail size={16} className="text-sky-700 dark:text-sky-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{provider.email}</Text>
                  </Group>
                  <Group gap="xs" mt="xs">
                    <IconMapPin size={16} className="text-sky-700 dark:text-sky-400" />
                    <Text size="sm" className="text-gray-700 dark:text-gray-300">{provider.address}</Text>
                  </Group>
                </Paper>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          {renderClaimSpecificDetails()}
        </Grid>
      </div>
    </Box>
  );
};