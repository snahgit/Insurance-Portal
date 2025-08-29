import { useState, Fragment, useRef } from "react";
import { Box, Card, Grid, Group, Text, Button, ActionIcon, Badge, Divider, Paper, Image, List } from "@mantine/core";
import { IconAddressBook, IconCalendar, IconClipboardList, IconFilePlus, IconFileReport, IconMedicalCross, IconPlus, IconSearch, IconTrash, IconWriting } from "@tabler/icons-react";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { useFormHelper } from "../../../../../../services/helperService";
import { notifications } from "@mantine/notifications";
import { PageDateInput, PageMultiSelect, PageNumberInput, PageSelect, PageTextarea, PageTextInput } from "../../../../../common/PageInput";
import { PageModal } from "../../../../../common/PageModal";
import { PharmacyClaimAllergyForm } from "./PharmacyClaimAllergyForm";
import { pharmacyClaimAddEditSchema, type PharmacyClaimAddEditFormType } from "../../../../../../services/zod_schema/manage_claim/pharmacy_claim/zodPharmacyClaimAddEditSchema";

type AppointmentDetailType = {
  appointment: {
    snahId: string;
    date: string;
    time: string;
    department: string;
    consultancyPurpose: string;
    medicalIssue: string;
    description: string;
  };
  physician: {
    name: string;
    snahId: string;
    email: string;
    providerNumber: string;
    specialty: string;
    npiNumber: string;
    licenseNo: string;
  };
  patient: {
    name: string;
    snahId: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    dob: string;
    gender: string;
    insurance: string;
    healthMemberId: string;
    groupNumber: string;
    plan: string;
    relationshipToInsured: string;
  };
} | null;

type AllergyType = {
  dateOfAllergy: string;
  numberOfVialsAllergy: string;
  numberOfTreatmentsAllergy: string;
  daysSupplyAllergy: string;
  vialContainsAllergy: string;
  administeredByAllergy: string;
  directionsAllergy: number;
  ingredientsAllergy: number;
  chargePerTreatmentAllergy: string;
  chargeForPreparationAllergy: string;
  totalChargeAllergy: string;
};

type MemberInfoType = {
  name: string;
  dateOfBirth: Date | null;
  phoneNumber: string;
  relationship: string;
};

type NDCInfoType = {
  ndcNumber: string;
  pharmClass: string;
  route: string;
  dosageForm: string;
  nonProprietaryName: string;
  name: string;
  medicineType: string;
  frequency: string;
  foodRequirementType: string;
  durationType: string;
  durationNumber: number;
  startDate: string;
  dosage: string;
  alarmTimes: string[];
  instructions: string;
  notes: string;
  price: number;
  quantity: number;
  tax: number;
  total: number;
};

export const PharmacyClaimAddEditForm = () => {
  const modalApiRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const pharmacyClaimAddEditObject = pharmacyClaimAddEditSchema();
  const mode = "create";
  const [allergies, setAllergies] = useState<AllergyType[]>([]);
  const [isLoading, __setIsLoading] = useState(false);

  const [appointmentDetail, setAppointmentDetail] = useState<AppointmentDetailType>(null);
  const [allAppointmentList, setAllAppointmentList] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [memberInfoData, setMemberInfoData] = useState<MemberInfoType[]>([]);
  const [memberInfoErrors, setMemberInfoErrors] = useState<Record<number, Record<string, string>>>({});
  const ndcInfoData: NDCInfoType[] = [
    {
      ndcNumber: "0002-1407",
      pharmClass: "Antiarrhythmic [EPC] Cytochrome P450 2D6 Inhibitor [EPC] Cytochrome P450 2D6 Inhibitors [MoA]",
      route: "INTRAVENOUS",
      dosageForm: "SOLUTION",
      nonProprietaryName: "Quinidine Gluconate",
      name: "Quinidine Gluconate",
      medicineType: "tablet",
      frequency: "twice a day",
      foodRequirementType: "not_specified",
      durationType: "days",
      durationNumber: 30,
      startDate: "08/05/2025",
      dosage: "7MG",
      alarmTimes: ["11:00 AM", "10:00 AM"],
      instructions: "Please follow doctor's",
      notes: "See notes",
      price: 2.30,
      quantity: 60,
      tax: 7,
      total: 147.66
    },
    {
      ndcNumber: "0003-2408",
      pharmClass: "Analgesic [EPC] Pain Relief Medication [MoA]",
      route: "ORAL",
      dosageForm: "TABLET",
      nonProprietaryName: "Acetaminophen",
      name: "Acetaminophen",
      medicineType: "tablet",
      frequency: "three times a day",
      foodRequirementType: "after_meal",
      durationType: "days",
      durationNumber: 14,
      startDate: "08/10/2025",
      dosage: "500MG",
      alarmTimes: ["8:00 AM", "2:00 PM", "8:00 PM"],
      instructions: "Take with plenty of water",
      notes: "Do not exceed daily dose",
      price: 1.50,
      quantity: 42,
      tax: 5,
      total: 68.00
    }
  ];

  const topBarAndFilter = {
    type: "claim",
    heading:
      mode === "create"
        ? "Create Health Insurance Claim"
        : "Edit Health Insurance Claim",
    viewMode: "grid",
    whatNeeded: { isBackNeeded: true },
  };

  const form = useFormHelper<PharmacyClaimAddEditFormType>({
    initialValues: {
      appointmentDate: null,
      appointmentId: "",
      patientInsurance: "",
      additionalComments: "",
      onSitePharmacy: "",
      pharmacistSignature: "",
      filingReason: "",
      otherProvideReason: "",
      medicationOutsideUS: "",
      purchasedOutsideCountry: "",
      purchasedOutsideCurrency: "",
      anyMedicinesTaken: "",
      medicineCoveredByOtherInsurance: "",
      otherCoverage: "",
      nameOfInsuranceCompany: "",
      insuranceId: "",
      memberSignature: "",
      signatureDate: null,
      numberOfPrescriptions: 0,
      prescribingPhysicianNpiNumber: "",
      prescribingPhysicianPhoneNumber: "",
      prescribingPhysicianName: "",
      prescribingPhysicianAddress: "",
      prescribingPhysicianCityStateZip: "",
      prescribingPhysicianAdditionalComments: "",
      invoiceDate: null,
      grandTotal: 0,
      otherInformation: "",
    },
    validationSchema: pharmacyClaimAddEditObject,
    mode: "controlled",
  });

  const handleSearchAppointment = () => {
    setAllAppointmentList(true)
  };
  const handleAppointmentSelect = () => {
    console.log('asas');

    setAppointmentDetail({
      appointment: {
        snahId: "SNAH-001",
        date: "2025-08-14",
        time: "09:30 AM",
        department: "Cardiology",
        consultancyPurpose: "Follow-up",
        medicalIssue: "Chest discomfort",
        description: "Routine follow-up with ECG review",
      },
      physician: {
        name: "Dr. Alice Rivera",
        snahId: "PHY-1001",
        email: "alice.rivera@example.com",
        providerNumber: "PR-77701",
        specialty: "Cardiology",
        npiNumber: "1234567890",
        licenseNo: "LIC-CA-99231",
      },
      patient: {
        name: "John Carter",
        snahId: "PAT-5001",
        address: "123 Main St",
        city: "San Jose",
        state: "CA",
        zipCode: "95112",
        country: "USA",
        phone: "+1 408 555 0101",
        dob: "1985-03-22",
        gender: "Male",
        insurance: "Medicare",
        healthMemberId: "HM-20331",
        groupNumber: "GRP-5582",
        plan: "Standard",
        relationshipToInsured: "Self",
      },
    })
  };

  const handleMemberSelectionChange = (values: string[]) => {
    setSelectedMembers(values);
    const newMemberInfoData = values.map((member) => ({
      name: "",
      dateOfBirth: null,
      phoneNumber: "",
      relationship: member,
    }));
    setMemberInfoData(newMemberInfoData);
    const newErrors: Record<number, Record<string, string>> = {};
    values.forEach((_, index) => {
      newErrors[index] = {};
    });
    setMemberInfoErrors(newErrors);
  };
  // Commented out unused function - can be removed if not needed
  // const handleMemberInfoChange = (index: number, field: string, value: any) => {
  //   setMemberInfoData((prev) =>
  //     prev.map((item, i) =>
  //       i === index ? { ...item, [field]: value } : item
  //     )
  //   );
  //   setMemberInfoErrors(prev => ({
  //     ...prev,
  //     [index]: {
  //       ...prev[index],
  //       [field]: ''
  //     }
  //   }));
  // };
  const handleDeleteMemberInfo = (index: number) => {
    if (memberInfoData.length <= 1) {
      notifications.show({
        title: "Error",
        color: "red",
        message: "You cannot delete the last member",
      });
      return;
    }

    const newSelectedMembers = selectedMembers.filter((_, i) => i !== index);
    setSelectedMembers(newSelectedMembers);
    setMemberInfoData((prev) => prev.filter((_, i) => i !== index));
    setMemberInfoErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  };

  const addAllergy = () => {
    setTimeout(() => modalApiRef.current?.open?.(), 0);
  };
  const handleAllergyCallback = (allergyData: AllergyType[]) => {
    setAllergies(allergyData);
    form.setFieldValue("allergies", allergyData);
    setTimeout(() => modalApiRef.current?.close?.(), 0);
  };
  const handleDeleteAllergy = (index: number) => {
    const next = allergies.filter((_, i) => i !== index);
    setAllergies(next);
    form.setFieldValue("allergies", next);
  };

  const onSubmitCall = (data: PharmacyClaimAddEditFormType) => {
    pharmacyClaimAddEditObject.parse(data);
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   notifications.show({
    //     title: "Success!",
    //     message: "Claim saved successfully.",
    //     color: "green",
    //   });
    //   form.reset();
    //   setAllergies([]);
    // }, 600);
  };

  return (
    <Box>
      <PageModal
        onOpenReady={(api) => {
          modalApiRef.current = api;
        }}
        dataPass={{
          modalConfig: {
            size: "xl",
            radius: "md",
            padding: "xl",
            className: "overflow-y-auto",
            centered: true,
          },
          component: <PharmacyClaimAllergyForm dataPass={{
            handleAllergyCallback,
            receivedAllergieList: allergies,
          }} />,
          title: "Add Allergy",
        }}
      />

      <Box>
        <Box>
          <Breadcrumb
            dataPass={{
              pageTitle: mode === "create" ? "Create Pharmacy Claim" : "Edit Pharmacy Claim",
              items: [
                { title: "Manage Claims", href: "#" },
                { title: "Pharmacy Claim List", href: "/manage-claim/pharmacy-claim" },
                { title: mode === "create" ? "Create Pharmacy Claim" : "Edit Pharmacy Claim", href: "#", isActive: true },
              ],
            }}
          />
        </Box>
        <Card withBorder shadow="sm" className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl" >
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Box className="p-3">
            <FormWrapper
              form={form}
              onSubmit={onSubmitCall}
              submitButtonIcon={<IconPlus size={16} />}
              submitButtonText={
                mode === "create" ? "Create claim" : "Update claim"
              }
              isLoading={isLoading}
            >
              <Grid>
                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className="border-sky-200 mb-4">
                    <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconClipboardList size={16} color="teal" />
                        <Text fw={600} size="md" className="text-sky-800">Select any appointment first (then fill other information)</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3">
                      <Grid>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                          <FormField label="Appointment Date" required>
                            <PageDateInput
                              placeholder="mm/dd/yyyy"
                              size="sm"
                              {...form.getInputProps("appointmentDate")}
                              leftSection={<IconCalendar size={16} />}
                              rightSection={
                                <ActionIcon
                                  variant="subtle"
                                  aria-label="Search appointment"
                                  onClick={handleSearchAppointment}
                                >
                                  <IconSearch size={16} />
                                </ActionIcon>
                              }
                            />
                          </FormField>
                        </Grid.Col>
                        {allAppointmentList && (
                          <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                            <FormField label="Select Appointment" required>
                              <PageSelect
                                placeholder="Select Appointment Id"
                                size="sm"
                                data={['SNAH1234', 'SNAH1235', 'SNAH1236']}
                                nothingFoundMessage="No appointments"
                                {...form.getInputProps("appointmentId")}
                                onChange={(value) => {
                                  form.setFieldValue("appointmentId", value);
                                  handleAppointmentSelect();
                                }}
                                leftSection={<IconAddressBook size={16} />}
                              />
                            </FormField>
                          </Grid.Col>
                        )}
                      </Grid>
                    </Card.Section>
                  </Card>
                </Grid.Col>
                {appointmentDetail && (
                  <Fragment>
                    <Grid.Col span={{ base: 12 }}>
                      <Card withBorder radius="md" className="border-sky-200 mb-4">
                        <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                          <Group justify="start">
                            <IconFileReport size={16} color="teal" />
                            <Text fw={600} size="md" className="text-sky-800">
                              Uploaded Prescription Documents
                            </Text>
                          </Group>
                        </Card.Section>
                        <Card.Section className="px-4 py-4">
                          <Grid gutter="md" className="mb-6">
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Card withBorder radius="sm" className="border-gray-300 bg-white shadow-sm">
                                <Card.Section className="p-4">
                                  <Text fw={600} size="md" className="text-gray-800 mb-3">Prescription Document #1</Text>
                                  <Image src="https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480" alt="Prescription Document" />
                                </Card.Section>
                              </Card>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Card withBorder radius="sm" className="border-gray-300 bg-white shadow-sm">
                                <Card.Section className="p-4">
                                  <Text fw={600} size="md" className="text-gray-800 mb-3">Prescription Document #1</Text>
                                  <Image src="https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480" alt="Prescription Document" />
                                </Card.Section>
                              </Card>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Card withBorder radius="sm" className="border-gray-300 bg-white shadow-sm">
                                <Card.Section className="p-4">
                                  <Text fw={600} size="md" className="text-gray-800 mb-3">Prescription Document #1</Text>
                                  <Image src="https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480" alt="Prescription Document" />
                                </Card.Section>
                              </Card>
                            </Grid.Col>
                          </Grid>
                          <Divider my="xl" size="xs" variant="dashed" color="blue" label="Bellow you found the patient information" labelPosition="center" className="w-full" />
                          <Grid gutter="md">
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Box>
                                <Text fw={600} size="sm">Booking SNAH ID</Text>
                                <Text size="sm">SNMF595536</Text>
                              </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Box>
                                <Text fw={600} size="sm">Prescription SNAH ID</Text>
                                <Text size="sm">MFPRE334542</Text>
                              </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Box>
                                <Text fw={600} size="sm">Physician DEA</Text>
                                <Text size="sm">AAWW</Text>
                              </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Box>
                                <Text fw={600} size="sm">Medical Issue</Text>
                                <Text size="sm">Rash</Text>
                              </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                              <Box>
                                <Text fw={600} size="sm">Prescription Notes</Text>
                                <Text size="sm">Patient is required to take medication</Text>
                              </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                              <Box>
                                <Text fw={600} size="sm">Description</Text>
                                <Text size="sm">Do not take more than prescribed</Text>
                              </Box>
                            </Grid.Col>
                          </Grid>
                        </Card.Section>
                      </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                      <Card withBorder radius="md" className="border-sky-200 mb-4">
                        <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                          <Group justify="start">
                            <IconFileReport size={16} color="teal" />
                            <Text fw={600} size="md" className="text-sky-800">Patient Info</Text>
                          </Group>
                        </Card.Section>
                        <Card.Section className="px-4 py-4">
                          <Grid gutter="md">
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">Name</Text>
                              <Text size="sm">John Doe</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">Address</Text>
                              <Text size="sm">123 Main St, Anytown, USA</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Select insurance" required>
                                <PageSelect size="sm"
                                  placeholder="Select insurance"
                                  data={['Insurance A', 'Insurance B', 'Insurance C']}
                                  searchable
                                  {...form.getInputProps("patientInsurance")}
                                  leftSection={<IconAddressBook size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Select member" required>
                                <PageMultiSelect size="sm"
                                  placeholder="Select member"
                                  data={['Self', 'Son', 'Daughter', 'Mother', 'Father', 'Wife']}
                                  searchable
                                  value={selectedMembers}
                                  onChange={handleMemberSelectionChange}
                                  leftSection={<IconAddressBook size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12 }}>
                              {memberInfoData.length > 0 && (
                                <Box className="mb-6">
                                  <Divider my="xl" size="xs" variant="dashed" color="blue" label="Fill the bellow member information" labelPosition="center" className="w-full" />
                                  {memberInfoData.map((memberInfo, index) => (
                                    <Paper key={index} className="bg-gradient-to-br from-green-50 to-green-50 dark:from-green-900/20 dark:to-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300 mb-4" withBorder>
                                      <Group justify="space-between" align="center" className="mb-3">
                                        <Badge color="green" variant="light" size="sm" className="font-semibold">
                                          FILL THE INFORMATION OF "{memberInfo.relationship.toUpperCase()}"
                                        </Badge>
                                        {memberInfoData.length > 1 && (
                                          <ActionIcon
                                            variant="light"
                                            color="red"
                                            size="sm"
                                            className="hover:bg-red-100 transition-all duration-300"
                                            onClick={() => handleDeleteMemberInfo(index)}
                                          >
                                            <IconTrash size={12} />
                                          </ActionIcon>
                                        )}
                                      </Group>
                                      <Grid>
                                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                          <FormField label="Name" required error={memberInfoErrors[index]?.name}>
                                            <PageTextInput
                                              placeholder="Enter name"
                                              size="sm"
                                              leftSection={<IconWriting size={16} />}
                                              {...form.getInputProps("memberName")}
                                            />
                                          </FormField>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                          <FormField label="Date Of Birth" required error={memberInfoErrors[index]?.dateOfBirth}>
                                            <PageDateInput
                                              placeholder="dd-mm-yyyy"
                                              size="sm"
                                              leftSection={<IconCalendar size={16} />}
                                              {...form.getInputProps("memberDateOfBirth")}
                                            />
                                          </FormField>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                          <FormField label="Phone Number" required error={memberInfoErrors[index]?.phoneNumber}>
                                            <PageTextInput
                                              placeholder="Enter phone number"
                                              size="sm"
                                              leftSection={<IconWriting size={16} />}
                                              {...form.getInputProps("memberPhoneNumber")}
                                            />
                                          </FormField>
                                        </Grid.Col>
                                      </Grid>
                                    </Paper>
                                  ))}
                                </Box>
                              )}
                            </Grid.Col>
                          </Grid>
                        </Card.Section>
                      </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                      <Card withBorder radius="md" className="border-sky-200 mb-4">
                        <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                          <Group justify="start">
                            <IconFileReport size={16} color="teal" />
                            <Text fw={600} size="md" className="text-sky-800">Physician Info</Text>
                          </Group>
                        </Card.Section>
                        <Card.Section className="px-4 py-3">
                          <Grid gutter="md">
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">Name</Text>
                              <Text size="sm">Dr John Doe</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">NPI Number</Text>
                              <Text size="sm">NPI56985</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">Phone</Text>
                              <Text size="sm">635245987</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">Email</Text>
                              <Text size="sm">johm.doe@gmail.com</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                              <Text fw={600} size="sm">Address</Text>
                              <Text size="sm">123 Main St, Anytown, USA</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12 }}>
                              <FormField label="Additional comments" required>
                                <PageTextInput
                                  placeholder="Additional comments"
                                  size="sm"
                                  {...form.getInputProps("additionalComments")}
                                  leftSection={<IconAddressBook size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                          </Grid>
                        </Card.Section>
                      </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                      <Card withBorder radius="md" className="border-sky-200 mb-4">
                        <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                          <Group justify="start">
                            <IconFileReport size={16} color="teal" />
                            <Text fw={600} size="md" className="text-sky-800">Pharmacy Info</Text>
                          </Group>
                        </Card.Section>
                        <Card.Section className="px-4 py-3">
                          <Grid gutter="md">
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">Name</Text>
                              <Text size="sm">Global Pharmacy</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">Email</Text>
                              <Text size="sm">testemail@gmail.com</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">Phone</Text>
                              <Text size="sm">9198511299</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">NCPDP</Text>
                              <Text size="sm">NCPDP12345</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">NPI</Text>
                              <Text size="sm">NPI3698</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">Taxonomy</Text>
                              <Text size="sm">1259500X</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <Text fw={600} size="sm">NAICS</Text>
                              <Text size="sm">NAICS12345</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                              <Text fw={600} size="sm">Address</Text>
                              <Text size="sm">123 Main St, Anytown, USA</Text>
                            </Grid.Col>
                            <Grid.Col span={12}>
                              <Grid>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                  <FormField label="Is this an on-site nursing home pharmacy?" required>
                                    <PageSelect
                                      placeholder="Select an option"
                                      data={['Yes', 'No']}
                                      size="sm"
                                      {...form.getInputProps("onSitePharmacy")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                  <FormField label="Signature of Pharmacist or Representative" required>
                                    <PageTextInput
                                      placeholder="Signature"
                                      size="sm"
                                      {...form.getInputProps("pharmacistSignature")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                              </Grid>
                            </Grid.Col>
                          </Grid>
                        </Card.Section>
                      </Card>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                      <Card withBorder radius="md" className="border-sky-200 mb-4">
                        <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                          <Group justify="start">
                            <IconMedicalCross size={16} color="teal" />
                            <Text fw={600} size="md" className="text-sky-800">Information related to claim</Text>
                          </Group>
                        </Card.Section>
                        <Card.Section className="px-3 py-3">
                          <Grid>
                            <Grid.Col span={12}>
                              <Grid>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                  <FormField label="Reason I am filing this form is" required>
                                    <PageSelect
                                      placeholder="Select Reason"
                                      size="sm"
                                      data={["Allergy/Allergen Clinic", "Pharmacy does not accept insurance", "Compound", "No insurance coverage at the time", "Other-provided reason bellow"]}
                                      {...form.getInputProps("filingReason")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                {form.values.filingReason === "Other-provided reason bellow" && (
                                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                    <FormField label="Other Provide Reason" required>
                                      <PageTextInput
                                        placeholder="Other Provide Reason"
                                        size="sm"
                                        {...form.getInputProps("otherProvideReason")}
                                        leftSection={<IconAddressBook size={16} />}
                                      />
                                    </FormField>
                                  </Grid.Col>
                                )}
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                                  <FormField label="Medication purchased outside of the United States" required>
                                    <PageSelect
                                      placeholder="Select Medication purchased outside"
                                      size="sm"
                                      data={["Yes", "No"]}
                                      {...form.getInputProps("medicationOutsideUS")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                {form.values.medicationOutsideUS === "Yes" && (
                                  <Fragment>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                                      <FormField label="Country" required>
                                        <PageTextInput
                                          placeholder="Country"
                                          size="sm"
                                          {...form.getInputProps("purchasedOutsideCountry")}
                                          leftSection={<IconAddressBook size={16} />}
                                        />
                                      </FormField>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                                      <FormField label="Currency" required>
                                        <PageTextInput
                                          placeholder="Currency"
                                          size="sm"
                                          {...form.getInputProps("purchasedOutsideCurrency")}
                                          leftSection={<IconAddressBook size={16} />}
                                        />
                                      </FormField>
                                    </Grid.Col>
                                  </Fragment>
                                )}
                              </Grid>
                            </Grid.Col>
                            {form.values.filingReason === "Allergy/Allergen Clinic" && (
                              <Grid.Col span={12}>
                                <Divider my="xl" size="sm" variant="dashed" color="blue" label="Fill out your allergy information" labelPosition="center" className="w-full" />
                                <Card withBorder radius="md" className="border-sky-200 mb-4">
                                  <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                                    <Group justify="space-between">
                                      <Box className="flex items-center gap-4">
                                        <IconFilePlus size={16} color="teal" />
                                        <Text fw={600} size="md" className="text-sky-800">Add multiple allergies</Text>
                                      </Box>
                                      <Box>
                                        <Button onClick={addAllergy} leftSection={<IconPlus size={16} />}>Add Allergy</Button>
                                      </Box>
                                    </Group>
                                  </Card.Section>
                                  <Card.Section className="px-3 py-3">
                                    {allergies.length > 0 ? (
                                      <Grid gutter="md">
                                        {allergies.map((allergy: AllergyType, index: number) => (
                                          <Grid.Col key={`allergy-${index}`} span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                                            <Paper className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-700 hover:shadow-lg transition-all duration-300 h-full" withBorder >
                                              <Group justify="space-between" align="center" className="mb-3">
                                                <Badge color="orange" variant="light" size="sm" className="font-semibold" >Allergy #{index + 1}</Badge>
                                                <ActionIcon
                                                  variant="light"
                                                  color="red"
                                                  size="sm"
                                                  className="hover:bg-red-100 transition-all duration-300"
                                                  onClick={() => handleDeleteAllergy(index)}
                                                >
                                                  <IconTrash size={12} />
                                                </ActionIcon>
                                              </Group>
                                              <div className="space-y-3">
                                                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                                  <Group gap="xs" className="mb-2">
                                                    <IconFilePlus size={16} className="text-orange-600" />
                                                    <Text fw={600} size="sm" className="text-gray-800 dark:text-gray-200">Allergy Details</Text>
                                                  </Group>
                                                  <div className="space-y-2">
                                                    <div className="grid grid-cols-2 gap-2">
                                                      <div>
                                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Date of Purchase:</Text>
                                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">
                                                          {allergy.dateOfAllergy}
                                                        </Text>
                                                      </div>
                                                      <div>
                                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Number of Vials:</Text>
                                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">{allergy.numberOfVialsAllergy}</Text>
                                                      </div>
                                                      <div>
                                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Number of Treatments:</Text>
                                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">{allergy.numberOfTreatmentsAllergy}</Text>
                                                      </div>
                                                      <div>
                                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Days Supply:</Text>
                                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">{allergy.daysSupplyAllergy}</Text>
                                                      </div>
                                                      <div>
                                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Vial Contains:</Text>
                                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">{allergy.vialContainsAllergy}</Text>
                                                      </div>
                                                      <div>
                                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Administered By:</Text>
                                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">{allergy.administeredByAllergy}</Text>
                                                      </div>
                                                      <div>
                                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Directions:</Text>
                                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">{allergy.directionsAllergy}</Text>
                                                      </div>
                                                      <div>
                                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Ingredients:</Text>
                                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">{allergy.ingredientsAllergy}</Text>
                                                      </div>
                                                      <div>
                                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Charge Per Treatment:</Text>
                                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">${allergy.chargePerTreatmentAllergy}</Text>
                                                      </div>
                                                      <div>
                                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Charge for Preparation:</Text>
                                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">${allergy.chargeForPreparationAllergy}</Text>
                                                      </div>
                                                      <div className="col-span-2">
                                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Total Charge:</Text>
                                                        <Text size="xs" className="text-gray-700 dark:text-gray-300 font-semibold">${allergy.totalChargeAllergy}</Text>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </Paper>
                                          </Grid.Col>
                                        ))}
                                      </Grid>
                                    ) : (
                                      <Paper className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
                                        <IconFilePlus size={48} className="text-gray-400 mx-auto mb-4" />
                                        <Text size="lg" fw={500} className="text-gray-600 dark:text-gray-400 mb-2">No Allergies Added Yet</Text>
                                        <Text size="sm" className="text-gray-500 dark:text-gray-500 mb-4">Click "Add Allergy" button to start adding allergies to your claim.</Text>
                                        <Button size="sm" onClick={addAllergy} leftSection={<IconPlus size={16} />}>
                                          Add Allergy
                                        </Button>
                                      </Paper>
                                    )}
                                  </Card.Section>
                                </Card>
                              </Grid.Col>
                            )}
                            <Grid.Col span={12}>
                              <Divider my="xl" size="sm" variant="dashed" color="blue" label="Other Insurance Info" labelPosition="center" className="w-full" />
                              <Grid>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                                  <FormField label="Any medicines taken for an on-the-job injury?" required>
                                    <PageSelect
                                      placeholder="Select Any medicines taken"
                                      size="sm"
                                      data={["Yes", "No"]}
                                      {...form.getInputProps("anyMedicinesTaken")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                  <FormField label="Is medicine covered by other insurance?" required>
                                    <PageSelect
                                      placeholder="Select Is medicine covered by other insurance?"
                                      size="sm"
                                      data={["Yes", "No"]}
                                      {...form.getInputProps("medicineCoveredByOtherInsurance")}
                                      onChange={(value) => {
                                        form.setFieldValue("medicineCoveredByOtherInsurance", value);
                                        form.setFieldValue("otherCoverage", "");
                                      }}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                {form.values.medicineCoveredByOtherInsurance === "Yes" && (
                                  <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                    <FormField label="Other coverage" required>
                                      <PageSelect
                                        placeholder="Select Other coverage"
                                        size="sm"
                                        data={["Primary", "Secondary", "Medicare"]}
                                        {...form.getInputProps("otherCoverage")}
                                        leftSection={<IconAddressBook size={16} />}
                                      />
                                    </FormField>
                                  </Grid.Col>
                                )}
                                {form.values.otherCoverage === "Primary" && (
                                  <Fragment>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                      <FormField label="Name of Insurance Company" required>
                                        <PageTextInput
                                          placeholder="Enter Name of Insurance Company"
                                          size="sm"
                                          {...form.getInputProps("nameOfInsuranceCompany")}
                                          leftSection={<IconAddressBook size={16} />}
                                        />
                                      </FormField>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                      <FormField label="Insurance ID" required>
                                        <PageTextInput
                                          placeholder="Enter Insurance ID"
                                          size="sm"
                                          {...form.getInputProps("insuranceId")}
                                          leftSection={<IconAddressBook size={16} />}
                                        />
                                      </FormField>
                                    </Grid.Col>
                                  </Fragment>
                                )}
                              </Grid>
                            </Grid.Col>
                            <Grid.Col span={12}>
                              <Divider my="xl" size="sm" variant="dashed" color="blue" label="Important! A signature is required" labelPosition="center" className="w-full" />
                              <Grid>
                                <Grid.Col span={12}>
                                  <Text fw={600} size="sm">Notice</Text>
                                  <Text size="sm">Any person who knowingly and with intent to defraud, injure, or deceive any insurance company, submits a claim or application containing any materially false, deceptive, incomplete or misleading information pertaining to such claim may be committing a fraudulent insurance act which is a crime and may subject such person to criminal or civil penalties, including fines, denial of benefits and/or imprisonment. (New York Members Only) Any person who knowingly and with intent to defraud, injure, or deceive any insurance company, or other person files an application for insurance or statement of claim containing any materially false information, or conceals for the purpose of misleading, information concerning any fact material thereto, commits a fraudulent insurance act, which is a crime, and shall also be subject to a civil penalty not to exceed five thousand dollars and the stated value of the claim for each such violation. (California Members Only) For your protection California law requires the following to appear on this form: Any person who knowingly presents false or fraudulent information to obtain or amend insurance coverage or to make a claim for the payment of a loss is guilty of a crime and may be subject to fines and confinement in state prison. I certify that I (or my eligible dependent) have received the medicine described herein. I certify that I have read and understood this form, and that all the information entered on this form is true and correct</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                  <FormField label="Signature of Member" required>
                                    <PageTextInput
                                      placeholder="Enter Signature of Member"
                                      size="sm"
                                      {...form.getInputProps("memberSignature")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                  <FormField label="Date" required>
                                    <PageDateInput
                                      placeholder="Enter Date"
                                      size="sm"
                                      {...form.getInputProps("signatureDate")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                              </Grid>
                            </Grid.Col>
                            <Grid.Col span={12}>
                              <Divider my="xl" size="sm" variant="dashed" color="blue" label="Submission Requirements" labelPosition="center" className="w-full" />
                              <Grid>
                                <Grid.Col span={12}>
                                  <Box>
                                    <Text fw={600} size="sm">Claim Receipts- Proof of purchase must be included along with the following information either on the claim form or receipt. (Proof of purchase can be pharmacy receipt or cash register receipt)</Text>
                                    <List size="sm" listStyleType="disc" type="ordered" className="mt-2">
                                      <List.Item>Member Name</List.Item>
                                      <List.Item>Prescription Number</List.Item>
                                      <List.Item>Medicine NDC Number</List.Item>
                                      <List.Item>Date of Fill</List.Item>
                                      <List.Item>Metric Quantity</List.Item>
                                      <List.Item>Total Charge</List.Item>
                                      <List.Item>Days Supply for your prescription (you need to ask your pharmacist for this “Day Supply” information)</List.Item>
                                      <List.Item>Pharmacy Name and Address or Pharmacy NCPDP Number</List.Item>
                                    </List>
                                  </Box>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                  <FormField label="Number of prescriptions you are submitting for reimbursement" required>
                                    <PageTextInput
                                      placeholder="Enter Number of Prescriptions"
                                      size="sm"
                                      {...form.getInputProps("numberOfPrescriptions")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                  <FormField label="Prescribing physician’s national provider identification (NPI) number" required>
                                    <PageTextInput
                                      placeholder="Enter Prescribing physician NPI Number"
                                      size="sm"
                                      {...form.getInputProps("prescribingPhysicianNpiNumber")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={12}>
                                  <Divider my="xl" size="sm" variant="dashed" color="blue" label="Prescribing physician’s information (all fields required)" labelPosition="center" className="w-full" />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                  <FormField label="Phone" required>
                                    <PageTextInput
                                      placeholder="Enter Phone Number"
                                      size="sm"
                                      {...form.getInputProps("prescribingPhysicianPhoneNumber")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                  <FormField label="Name" required>
                                    <PageTextInput
                                      placeholder="Enter Name of Member"
                                      size="sm"
                                      {...form.getInputProps("prescribingPhysicianName")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                  <FormField label="Address" required>
                                    <PageTextInput
                                      placeholder="Enter Address of Member"
                                      size="sm"
                                      {...form.getInputProps("prescribingPhysicianAddress")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                  <FormField label="City, State, Zip/Postal Code" required>
                                    <PageTextInput
                                      placeholder="Enter City, State, Zip/Postal Code"
                                      size="sm"
                                      {...form.getInputProps("prescribingPhysicianCityStateZip")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                  <FormField label="Additional comments" required>
                                    <PageTextInput
                                      placeholder="Enter Additional comments"
                                      size="sm"
                                      {...form.getInputProps("prescribingPhysicianAdditionalComments")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                              </Grid>
                            </Grid.Col>
                            <Grid.Col span={12}>
                              <Divider my="xl" size="sm" variant="dashed" color="blue" label="Mail completed forms with receipts to" labelPosition="center" className="w-full" />
                              <Grid>
                                <Grid.Col span={12}>
                                  <Box>
                                    <Text fw={600} size="sm">IMPORTANT REMINDER–To avoid having to submit a paper claim form</Text>
                                    <List size="sm" listStyleType="disc" type="ordered" className="mt-2">
                                      <List.Item>Always have your ID card available at time of purchase.</List.Item>
                                      <List.Item>Always use pharmacies within your network.</List.Item>
                                      <List.Item>Use medication from your formulary list.</List.Item>
                                      <List.Item>If problems are encountered at the pharmacy, call the number on the back of your ID card.</List.Item>
                                    </List>
                                  </Box>
                                </Grid.Col>
                              </Grid>
                            </Grid.Col>
                            <Grid.Col span={12}>
                              <Divider my="xl" size="sm" variant="dashed" color="blue" label="NDC Info" labelPosition="center" className="w-full" />
                              <Box className="space-y-4">
                                {ndcInfoData.map((ndcInfo, index) => (
                                  <Card key={index} withBorder radius="md" className="border-blue-200 bg-blue-50/50">
                                    <Card.Section className="bg-blue-100 px-4 py-3 rounded-t-md">
                                      <Group justify="space-between" align="center">
                                        <Group align="center">
                                          <Box className="w-3 h-3 bg-blue-500 rounded-full"></Box>
                                          <Text fw={700} size="md" className="text-blue-800">
                                            NDC Number: {ndcInfo.ndcNumber}
                                          </Text>
                                        </Group>
                                      </Group>
                                    </Card.Section>
                                    <Card.Section className="px-4 py-4">
                                      <Grid gutter="md">
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Pharm Class</Text>
                                            <Text size="sm">{ndcInfo.pharmClass}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Route</Text>
                                            <Text size="sm">{ndcInfo.route}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Dosage Form</Text>
                                            <Text size="sm">{ndcInfo.dosageForm}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Non Proprietary Name</Text>
                                            <Text size="sm">{ndcInfo.nonProprietaryName}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Name</Text>
                                            <Text size="sm">{ndcInfo.name}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Medicine Type</Text>
                                            <Text size="sm">{ndcInfo.medicineType}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Frequency</Text>
                                            <Text size="sm">{ndcInfo.frequency}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Food Requirement Type</Text>
                                            <Text size="sm">{ndcInfo.foodRequirementType}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Duration Type</Text>
                                            <Text size="sm">{ndcInfo.durationType}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Duration Number</Text>
                                            <Text size="sm">{ndcInfo.durationNumber}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Start Date</Text>
                                            <Text size="sm">{ndcInfo.startDate}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Dosage</Text>
                                            <Text size="sm">{ndcInfo.dosage}</Text>
                                          </Box>
                                        </Grid.Col>
                                      </Grid>

                                      <Divider my="md" />

                                      <Box className="mb-4">
                                        <Text fw={600} size="sm" className="text-gray-700 mb-2">Set medication alarm time</Text>
                                        <Group gap="xs">
                                          {ndcInfo.alarmTimes.map((time, timeIndex) => (
                                            <Badge key={timeIndex} color="blue">{time}</Badge>
                                          ))}
                                        </Group>
                                      </Box>

                                      <Grid gutter="md">
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Instructions</Text>
                                            <Text size="sm">{ndcInfo.instructions}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Notes</Text>
                                            <Text size="sm">{ndcInfo.notes}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Price</Text>
                                            <Text size="sm">${ndcInfo.price.toFixed(2)}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Quantity</Text>
                                            <Text size="sm">{ndcInfo.quantity}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Tax</Text>
                                            <Text size="sm">{ndcInfo.tax}</Text>
                                          </Box>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                          <Box>
                                            <Text fw={600} size="sm">Total</Text>
                                            <Text size="sm">${ndcInfo.total.toFixed(2)}</Text>
                                          </Box>
                                        </Grid.Col>
                                      </Grid>
                                    </Card.Section>
                                  </Card>
                                ))}
                              </Box>
                            </Grid.Col>
                            <Grid.Col span={12}>
                              <Divider my="xl" size="sm" variant="dashed" color="blue" label="Fill The Bellow Info" labelPosition="center" className="w-full" />
                              <Grid>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                  <FormField label="Invoice date" required>
                                    <PageDateInput
                                      placeholder="Enter Invoice date"
                                      size="sm"
                                      {...form.getInputProps("invoiceDate")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                                  <FormField label="Grand Total" required>
                                    <PageNumberInput
                                      placeholder="Enter Grand Total"
                                      size="sm"
                                      {...form.getInputProps("grandTotal")}
                                      leftSection={<IconAddressBook size={16} />}
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={12}>
                                  <FormField label="Other Information" required>
                                    <PageTextarea
                                      placeholder="Enter Other Information"
                                      size="sm"
                                      resize="vertical"
                                      rows={5}
                                      {...form.getInputProps("otherInformation")}
                                    />
                                  </FormField>
                                </Grid.Col>
                              </Grid>
                            </Grid.Col>
                          </Grid>
                        </Card.Section>
                      </Card>
                    </Grid.Col>
                  </Fragment>
                )}
              </Grid>
            </FormWrapper>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
