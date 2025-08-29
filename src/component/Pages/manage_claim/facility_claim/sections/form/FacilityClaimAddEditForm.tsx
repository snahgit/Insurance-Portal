import { useState, Fragment, useRef } from "react";
import { Box, Card, Grid, Group, Text, Button, ActionIcon, Badge, Divider, Paper } from "@mantine/core";
import { IconAddressBook, IconBrandMantine, IconCalendar, IconClipboardList, IconFilePlus, IconInfoCircle, IconMathFunction, IconMedicalCross, IconPaperclip, IconPlus, IconSearch, IconTrash, IconUpload, IconWriting } from "@tabler/icons-react";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { useFormHelper } from "../../../../../../services/helperService";
import { notifications } from "@mantine/notifications";
import { PageDateInput, PageDateRangePicker, PageMultiSelect, PageNumberInput, PageSelect, PageTextarea, PageTextInput } from "../../../../../common/PageInput";
import { PageModal } from "../../../../../common/PageModal";
import { facilityClaimAddEditSchema, type FacilityClaimAddEditFormType } from "../../../../../../services/zod_schema/manage_claim/facility_claim/zodFacilityClaimAddEditSchema";
import { FacilityClaimServiceForm } from "./FacilityClaimServiceForm";
import { FacilityClaimDocumentForm } from "./FacilityClaimDocumentForm";

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

type DocumentType = {
  typeOfFile: string;
  document: string;
};

type ServiceType = {
  dateOfService: [Date | null, Date | null];
  placeOfService: string;
  emg: string;
  cptNumber: string;
  cptHcpcs: string;
  modifier: string;
  diagnosisPointer: string;
  charges: number;
  daysOrUnits: number;
  epsdtFamilyPlan: string;
  idQual: string;
  referringProviderId: string;
};

export const FacilityClaimAddEditForm = () => {
  const modalApiRef = useRef<{ open: () => void; close: () => void } | null>(null);
  const formatDate = (date: any): string => {
    if (!date) return '';
    if (date instanceof Date) {
      return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
    }
    if (typeof date === 'string') {
      const parsedDate = new Date(date);
      return isNaN(parsedDate.getTime()) ? 'Invalid Date' : parsedDate.toLocaleDateString();
    }
    return String(date);
  };
  const formatDateRange = (dateRange: [any, any]): string => {
    if (!dateRange || !Array.isArray(dateRange)) return 'Not set';
    const [startDate, endDate] = dateRange;
    
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    } else if (startDate) {
      return formatDate(startDate);
    } else {
      return 'Not set';
    }
  };

  const facilityClaimAddEditObject = facilityClaimAddEditSchema();
  const mode = "create";
  const [services, setServices] = useState<ServiceType[]>([]);
  const [document, setDocument] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<'service' | 'document' | null>(null);

  const CPT_OPTIONS = [
    { value: "99213", label: "99213 - Office Visit" },
    { value: "99214", label: "99214 - Extended Office Visit" },
    { value: "99215", label: "99215 - Comprehensive Office Visit" },
    { value: "J0129", label: "J0129 - Injection, abatacept" },
    { value: "J1100", label: "J1100 - Injection, dexamethasone sodium phosphate" }
  ];

  const [appointmentDetail, setAppointmentDetail] = useState<AppointmentDetailType>(null);
  const [allAppointmentList, setAllAppointmentList] = useState(false);

  const topBarAndFilter = {
    type: "claim",
    heading:
      mode === "create"
        ? "Create Health Insurance Claim"
        : "Edit Health Insurance Claim",
    viewMode: "grid",
    whatNeeded: { isBackNeeded: true },
  };

  const form = useFormHelper<FacilityClaimAddEditFormType>({
    initialValues: {
      claimType: "",
      appointmentDate: null,
      appointmentId: "",
      patientInsurance: "",
      currentIllnessDate: null,
      currentIllnessQual: "",
      otherDate: null,
      otherDateQual: "",
      unableToWork: [null, null],
      hospitalization: [null, null],
      referringProvider: "",
      additionalClaimInfo: "",
      outsideLab: "",
      outsideLabCharges: "",
      diagnosis1: "",
      diagnosis2: "",
      diagnosis3: "",
      icdForCpt: "",
      cpt: "",
      resubmissionCode: "",
      resubmissionOriginalRef: "",
      priorAuthNumber: "",
      services: [],
      document: [],
      taxIdNumber: "",
      taxIdSSN: "",
      taxIdEIN: "",
      patientAccountNo: "",
      acceptAssignment: "Yes",
      totalCharge: "",
      amountPaid: "",
      nuccReserved: "",
    },
    validationSchema: facilityClaimAddEditObject,
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

  const addService = () => {
    setCurrentModalType('service');
    setTimeout(() => modalApiRef.current?.open?.(), 0);
  };

  const handleServiceCallback = (serviceData: ServiceType[]) => {
    setServices(serviceData);
    form.setFieldValue("services", serviceData);
    setTimeout(() => modalApiRef.current?.close?.(), 0);
  };

  const handleDocumentCallback = (data: DocumentType[]) => {
    setDocument(data);
    form.setFieldValue("document", data);
    setTimeout(() => modalApiRef.current?.close?.(), 0);
  };

  const handleAddDocument = () => {
    setCurrentModalType('document');
    setTimeout(() => modalApiRef.current?.open?.(), 0);
  };

  const handleDeleteService = (index: number) => {
    const next = services.filter((_, i) => i !== index);
    setServices(next);
    form.setFieldValue("services", next);
  };

  const handleRemoveDocument = (idx: number) => {
    setDocument((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      form.setFieldValue("document", next);
      return next;
    });
  };

  const onSubmitCall = (data: FacilityClaimAddEditFormType) => {
    facilityClaimAddEditObject.parse(data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      notifications.show({
        title: "Success!",
        message: "Claim saved successfully.",
        color: "green",
      });
      form.reset();
      setServices([]);
      setDocument([]);
    }, 600);
  };

  return (
    <Box>
      <PageModal
        onOpenReady={(api) => {
          modalApiRef.current = api;
        }}
        dataPass={{
          modalConfig: {
            size: currentModalType === 'service' ? "xl" : "md",
            radius: "md",
            padding: "xl",
            className: "overflow-y-auto",
            centered: true,
          },
          component: currentModalType === 'service' ? (
            <FacilityClaimServiceForm dataPass={{
              handleServiceCallback,
              receivedServiceList: services,
              selectedCptCodes: typeof form.values.cpt === "string" ? form.values.cpt.split(",").filter(Boolean) : []
            }} />
          ) : currentModalType === 'document' ? (
            <FacilityClaimDocumentForm dataPass={{
              handleDocumentCallback,
              claimDocument: document
            }} />
          ) : null,
          title: currentModalType === 'service' ? "Add Service Line" : "Add Document",
        }}
      />

      <Box>
        <Box>
          <Breadcrumb
            dataPass={{
              pageTitle: mode === "create" ? "Create Facility Claim" : "Edit Facility Claim",
              items: [
                { title: "Manage Claim", href: "#" },
                { title: "Facility Claim List", href: "/manage-claim/facility-claim" },
                { title: mode === "create" ? "Create Facility Claim" : "Edit Facility Claim", href: "#", isActive: true },
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
                          <FormField label="Claim Type" required>
                            <PageSelect
                              placeholder="Select claim type"
                              size="sm"
                              data={["Medicare", "Medicaid", "Group Health Plan", "Other",]}
                              {...form.getInputProps("claimType")}
                              leftSection={<IconBrandMantine size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
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
                      <Grid>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder radius="md" className="border-sky-200 mb-4" >
                            <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                              <Group justify="start">
                                <IconClipboardList size={16} color="teal" />
                                <Text fw={600} size="md" className="text-sky-800">Appointment Info</Text>
                              </Group>
                            </Card.Section>
                            <Card.Section className="px-3 py-3">
                              <Grid>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">SNAH Id</Text>
                                  <Text size="sm">{appointmentDetail.appointment.snahId}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Date</Text>
                                  <Text size="sm">{appointmentDetail.appointment.date}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Time</Text>
                                  <Text size="sm">{appointmentDetail.appointment.time}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Department</Text>
                                  <Text size="sm">{appointmentDetail.appointment.department}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Consultancy Purpose</Text>
                                  <Text size="sm">{appointmentDetail.appointment.consultancyPurpose}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Medical Issue</Text>
                                  <Text size="sm">{appointmentDetail.appointment.medicalIssue}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12 }}>
                                  <Text fw={600} size="sm">Description</Text>
                                  <Text size="sm">{appointmentDetail.appointment.description}</Text>
                                </Grid.Col>
                              </Grid>
                            </Card.Section>
                          </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                          <Card withBorder radius="md" className="border-sky-200 mb-4" >
                            <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                              <Group justify="start">
                                <IconMedicalCross size={16} color="teal" />
                                <Text fw={600} size="md" className="text-sky-800">PCP Info</Text>
                              </Group>
                            </Card.Section>
                            <Card.Section className="px-3 py-3">
                              <Grid>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Name</Text>
                                  <Text size="sm">{appointmentDetail.physician.name}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">SNAH Id</Text>
                                  <Text size="sm">{appointmentDetail.physician.snahId}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 6 }}>
                                  <Text fw={600} size="sm">Email</Text>
                                  <Text size="sm">{appointmentDetail.physician.email}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Provider Number</Text>
                                  <Text size="sm">{appointmentDetail.physician.providerNumber}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Specialty</Text>
                                  <Text size="sm">{appointmentDetail.physician.specialty}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">NPI Number</Text>
                                  <Text size="sm">{appointmentDetail.physician.npiNumber}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">License No</Text>
                                  <Text size="sm">{appointmentDetail.physician.licenseNo}</Text>
                                </Grid.Col>
                              </Grid>
                            </Card.Section>
                          </Card>
                        </Grid.Col>
                      </Grid>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12 }}>
                      <Card withBorder radius="md" className="border-sky-200 mb-4" >
                        <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                          <Group justify="start">
                            <IconInfoCircle size={16} />
                            <Text fw={600} size="md" className="text-sky-800">
                              Patient Info
                            </Text>
                          </Group>
                        </Card.Section>
                        <Card.Section className="px-3 py-3">
                          <Grid>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">Name</Text>
                              <Text size="sm">{appointmentDetail.patient.name}</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">SNAH Id</Text>
                              <Text size="sm">{appointmentDetail.patient.snahId}</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">Address (No., Street)</Text>
                              <Text size="sm">{appointmentDetail.patient.address}</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">City</Text>
                              <Text size="sm">{appointmentDetail.patient.city}</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">State</Text>
                              <Text size="sm">{appointmentDetail.patient.state}</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">Zip Code</Text>
                              <Text size="sm">{appointmentDetail.patient.zipCode}</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">Country</Text>
                              <Text size="sm">{appointmentDetail.patient.country}</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">Phone</Text>
                              <Text size="sm">{appointmentDetail.patient.phone}</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">Date Of Birth</Text>
                              <Text size="sm">{appointmentDetail.patient.dob}</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">Gender</Text>
                              <Text size="sm">{appointmentDetail.patient.gender}</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">Select Insurance</Text>
                              <PageSelect size="sm"
                                placeholder="Select insurance"
                                data={['Insurance A', 'Insurance B', 'Insurance C']}
                                searchable
                                {...form.getInputProps("patientInsurance")} />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">Health Member Id</Text>
                              <Text size="sm">{appointmentDetail.patient.healthMemberId}</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">Group Number</Text>
                              <Text size="sm">{appointmentDetail.patient.groupNumber}</Text>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 4 }}>
                              <Text fw={600} size="sm">Plan</Text>
                              <Text size="sm">{appointmentDetail.patient.plan}</Text>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 8 }}>
                              <Text fw={600} size="sm">Patient Relationship To Insured</Text>
                              <Text size="sm">{appointmentDetail.patient.relationshipToInsured}</Text>
                            </Grid.Col>
                          </Grid>
                        </Card.Section>
                      </Card>
                    </Grid.Col>
                  </Fragment>
                )}

                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className="border-sky-200 mb-4">
                    <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconMedicalCross size={16} color="teal" />
                        <Text fw={600} size="md" className="text-sky-800">
                          Information related to physician or supplier
                        </Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3">
                      <Grid>
                        <Grid.Col span={12}>
                          <Grid>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Date of current illness, injury, or pregnancy (LMP)" required>
                                <PageDateInput
                                  size="sm"
                                  {...form.getInputProps("currentIllnessDate")}
                                  leftSection={<IconCalendar size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Qual" required>
                                <PageTextInput
                                  placeholder="Qual"
                                  size="sm"
                                  {...form.getInputProps("currentIllnessQual")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Other Date" required>
                                <PageDateInput
                                  size="sm"
                                  {...form.getInputProps("otherDate")}
                                  leftSection={<IconCalendar size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Qual" required>
                                <PageTextInput
                                  placeholder="Qual"
                                  size="sm"
                                  {...form.getInputProps("otherDateQual")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Date patient unable to work in current occupation (From – To)" required>
                                <PageDateRangePicker
                                  placeholder="Select range"
                                  size="sm"
                                  {...form.getInputProps("unableToWork")}
                                  leftSection={<IconCalendar size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Hospitalization dates related to current services (From – To)" required>
                                <PageDateRangePicker
                                  placeholder="Select range"
                                  size="sm"
                                  {...form.getInputProps("hospitalization")}
                                  leftSection={<IconCalendar size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Name of referring provider or other source" required >
                                <PageTextInput
                                  placeholder="Enter name"
                                  size="sm"
                                  {...form.getInputProps("referringProvider")}
                                  leftSection={<IconWriting size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12 }}>
                              <FormField label="Additional claim information (Designated by NUCC)" required>
                                <PageTextarea
                                  rows={3}
                                  placeholder="Optional additional info"
                                  size="sm"
                                  {...form.getInputProps("additionalClaimInfo")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Outside Lab & Changes" required>
                                <PageSelect
                                  placeholder="Select Outside Lab"
                                  size="sm"
                                  data={["Yes", "No"]}
                                  {...form.getInputProps("outsideLab")}
                                  leftSection={<IconAddressBook size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Outside Lab Charges" required>
                                <PageNumberInput
                                  thousandSeparator
                                  hideControls
                                  placeholder="0"
                                  size="sm"
                                  {...form.getInputProps("outsideLabCharges")}
                                  leftSection={<IconMathFunction size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                          </Grid>
                        </Grid.Col>
                        <Grid.Col span={12}>
                          <Divider my="xl" size="sm" variant="dashed" color="red" label="Fill out the patient health information" labelPosition="center" className="w-full" />
                          <Grid>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Diagnosis / Nature of Illness or Injury (ICD)" required>
                                <PageTextInput
                                  placeholder="ICD code A"
                                  size="sm"
                                  {...form.getInputProps("diagnosis1")}
                                  rightSection={<IconSearch size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Diagnosis (optional)">
                                <PageTextInput
                                  placeholder="ICD code B"
                                  size="sm"
                                  {...form.getInputProps("diagnosis2")}
                                  rightSection={<IconSearch size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Diagnosis (optional)">
                                <PageTextInput
                                  placeholder="ICD code C"
                                  size="sm"
                                  {...form.getInputProps("diagnosis3")}
                                  rightSection={<IconSearch size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="ICD used for CPT mapping" required>
                                <PageSelect
                                  searchable
                                  clearable
                                  placeholder="Select ICD"
                                  data={[
                                    {
                                      value: "L89.100",
                                      label:
                                        "L89.100 (Pressure ulcer of unspecified part of back, unstageable)",
                                    },
                                    {
                                      value: "M75.100",
                                      label:
                                        "M75.100 (Unspecified rotator cuff tear or rupture of unspecified shoulder, not specified as traumatic)",
                                    },
                                    {
                                      value: "P05.04",
                                      label:
                                        "P05.04 (Newborn light for gestational age, 1000-1249 grams)",
                                    },
                                    {
                                      value: "P05.14",
                                      label:
                                        "P05.14 (Newborn small for gestational age, 1000-1249 grams)",
                                    },
                                    {
                                      value: "P07.14",
                                      label:
                                        "P07.14 (Other low birth weight newborn, 1000-1249 grams)",
                                    },
                                    {
                                      value: "S12.100A",
                                      label:
                                        "S12.100A (Unspecified displaced fracture of second cervical vertebra, initial encounter for closed fracture)",
                                    },
                                  ]}
                                  size="sm"
                                  {...form.getInputProps("icdForCpt")}
                                  leftSection={<IconSearch size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="CPT / Procedure" required>
                                <PageMultiSelect
                                  searchable
                                  clearable
                                  withCheckIcon
                                  placeholder="Select CPT(s)"
                                  data={CPT_OPTIONS}
                                  size="sm"
                                  className="flex-1"
                                  leftSection={<IconSearch size={16} />}
                                  value={
                                    typeof form.values.cpt === "string"
                                      ? form.values.cpt.split(",").filter(Boolean)
                                      : []
                                  }
                                  onChange={(vals) =>
                                    form.setFieldValue("cpt", vals.join(","))
                                  }
                                />
                              </FormField>
                            </Grid.Col>
                          </Grid>
                        </Grid.Col>



                        <Grid.Col span={12}>
                          <Divider my="xl" size="sm" variant="dashed" color="red" label="Fill out the patient health information" labelPosition="center" className="w-full" />
                          <Card withBorder radius="md" className="border-sky-200 mb-4">
                            <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                              <Group justify="space-between">
                                <Box className="flex items-center gap-4">
                                  <IconFilePlus size={16} color="teal" />
                                  <Text fw={600} size="md" className="text-sky-800">
                                    Add multiple services
                                  </Text>
                                </Box>
                                <Box>
                                  <Button onClick={addService} leftSection={<IconPlus size={16} />}>Add Service</Button>
                                </Box>
                              </Group>
                            </Card.Section>
                            <Card.Section className="px-3 py-3">
                              {services.length > 0 ? (
                                <Grid gutter="md">
                                  {services.map((service: ServiceType, index: number) => (
                                    <Grid.Col key={`service-${index}`} span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                                      <Paper className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-700 hover:shadow-lg transition-all duration-300 h-full" withBorder >
                                        <Group justify="space-between" align="center" className="mb-3">
                                          <Badge color="cyan" variant="light" size="sm" className="font-semibold" >Service #{index + 1}</Badge>
                                          <ActionIcon
                                            variant="light"
                                            color="red"
                                            size="sm"
                                            className="hover:bg-red-100 transition-all duration-300"
                                            onClick={() => handleDeleteService(index)}
                                          >
                                            <IconTrash size={12} />
                                          </ActionIcon>
                                        </Group>
                                        <div className="space-y-3">
                                          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                            <Group gap="xs" className="mb-2">
                                              <IconFilePlus size={16} className="text-blue-600" />
                                              <Text fw={600} size="sm" className="text-gray-800 dark:text-gray-200">Service Details</Text>
                                            </Group>
                                            <div className="space-y-2">
                                              <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                  <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Date of Service:</Text>
                                                  <Text size="xs" className="text-gray-700 dark:text-gray-300">
                                                    {formatDateRange(service.dateOfService)}
                                                  </Text>
                                                </div>
                                                <div>
                                                  <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Place of Service:</Text>
                                                  <Text size="xs" className="text-gray-700 dark:text-gray-300">{service.placeOfService}</Text>
                                                </div>
                                                <div>
                                                  <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">CPT/HCPCS:</Text>
                                                  <Text size="xs" className="text-gray-700 dark:text-gray-300">{service.cptHcpcs}</Text>
                                                </div>
                                                <div>
                                                  <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Charges:</Text>
                                                  <Text size="xs" className="text-gray-700 dark:text-gray-300">${service.charges}</Text>
                                                </div>
                                                <div>
                                                  <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Days/Units:</Text>
                                                  <Text size="xs" className="text-gray-700 dark:text-gray-300">{service.daysOrUnits}</Text>
                                                </div>
                                                <div>
                                                  <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Diagnosis Pointer:</Text>
                                                  <Text size="xs" className="text-gray-700 dark:text-gray-300">{service.diagnosisPointer}</Text>
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
                                  <Text size="lg" fw={500} className="text-gray-600 dark:text-gray-400 mb-2">No Services Added Yet</Text>
                                  <Text size="sm" className="text-gray-500 dark:text-gray-500 mb-4">Click "Add Service" button to start adding services to your claim.</Text>
                                  <Button size="sm" onClick={addService} leftSection={<IconPlus size={16} />}>
                                    Add Service
                                  </Button>
                                </Paper>
                              )}
                            </Card.Section>
                          </Card>
                        </Grid.Col>

                        <Grid.Col span={12}>
                          <Divider my="xl" size="sm" variant="dashed" color="red" label="Fill out the patient health information" labelPosition="center" className="w-full" />
                          <Card withBorder radius="md" className="border-sky-200 mb-4">
                            <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                              <Group justify="space-between">
                                <Box className="flex items-center gap-4">
                                  <IconPaperclip size={16} color="teal" />
                                  <Text fw={600} size="md" className="text-sky-800">
                                    Add multiple document
                                  </Text>
                                </Box>
                                <Box>
                                  <Button onClick={handleAddDocument} leftSection={<IconUpload size={16} />}>Add Document</Button>
                                </Box>
                              </Group>
                            </Card.Section>
                            <Card.Section className="px-3 py-3">
                              {document.length > 0 ? (
                                <Grid gutter="md">
                                  {document.map((doc: DocumentType, index: number) => (
                                    <Grid.Col key={`document-${index}`} span={{ base: 12, sm: 6, md: 4, lg: 4 }}>
                                      <Paper className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300 h-full" withBorder >
                                        <Group justify="space-between" align="center" className="mb-3">
                                          <Badge color="green" variant="light" size="sm" className="font-semibold" >Document #{index + 1}</Badge>
                                          <ActionIcon
                                            variant="light"
                                            color="red"
                                            size="sm"
                                            className="hover:bg-red-100 transition-all duration-300"
                                            onClick={() => handleRemoveDocument(index)}
                                          >
                                            <IconTrash size={12} />
                                          </ActionIcon>
                                        </Group>
                                        <div className="space-y-3">
                                          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                            <Group gap="xs" className="mb-2">
                                              <IconPaperclip size={16} className="text-green-600" />
                                              <Text fw={600} size="sm" className="text-gray-800 dark:text-gray-200">Document Details</Text>
                                            </Group>
                                            <div >
                                              <Box>
                                                <Text size="xs" fw={900} className="text-gray-600 dark:text-gray-400">File Type:</Text>
                                                <Text size="sm" className="text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                                                  {doc.typeOfFile}
                                                </Text>
                                              </Box>
                                              <Box className="mt-2">
                                                <Text size="xs" fw={900} className="text-gray-600 dark:text-gray-400">Document:</Text>
                                                <Text size="sm" className="text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                                                  {doc.document}
                                                </Text>
                                              </Box>
                                            </div>
                                          </div>
                                        </div>
                                      </Paper>
                                    </Grid.Col>
                                  ))}
                                </Grid>
                              ) : (
                                <Paper className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
                                  <IconPaperclip size={48} className="text-gray-400 mx-auto mb-4" />
                                  <Text size="lg" fw={500} className="text-gray-600 dark:text-gray-400 mb-2">No Documents Added Yet</Text>
                                  <Text size="sm" className="text-gray-500 dark:text-gray-500 mb-4">Click "Add Document" button to start adding documents to your claim.</Text>
                                  <Button size="sm" onClick={handleAddDocument} leftSection={<IconUpload size={16} />}>
                                    Add Document
                                  </Button>
                                </Paper>
                              )}
                            </Card.Section>
                          </Card>
                        </Grid.Col>



                        <Grid.Col span={12}>
                          <Divider my="xl" size="sm" variant="dashed" color="red" label="Fill out the patient health information" labelPosition="center" className="w-full" />
                          <Grid>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Federal Tax I.D Number" required>
                                <PageTextInput
                                  placeholder="Number"
                                  size="sm"
                                  {...form.getInputProps("taxIdNumber")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="SSN" required>
                                <PageTextInput
                                  placeholder="SSN"
                                  size="sm"
                                  {...form.getInputProps("taxIdSSN")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="EIN" required>
                                <PageTextInput
                                  placeholder="EIN"
                                  size="sm"
                                  {...form.getInputProps("taxIdEIN")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Patient's Account No" required>
                                <PageTextInput
                                  placeholder="Enter patient's account number"
                                  size="sm"
                                  {...form.getInputProps("patientAccountNo")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Accept Assignment? (For govt. claim, see back)" required >
                                <PageSelect
                                  placeholder="Select Accept Assignment"
                                  data={["Yes", "No"]}
                                  size="sm"
                                  {...form.getInputProps("acceptAssignment")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Total Charge" required>
                                <PageNumberInput
                                  thousandSeparator
                                  hideControls
                                  placeholder="0"
                                  size="sm"
                                  {...form.getInputProps("totalCharge")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Amount Paid" required>
                                <PageNumberInput
                                  thousandSeparator
                                  hideControls
                                  placeholder="0"
                                  size="sm"
                                  {...form.getInputProps("amountPaid")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Rsvd. for NUCC Use" required>
                                <PageSelect
                                  placeholder="Select Rsvd"
                                  data={["Yes", "No"]}
                                  size="sm"
                                  {...form.getInputProps("nuccReserved")}
                                />
                              </FormField>
                            </Grid.Col>
                          </Grid>
                        </Grid.Col>
                      </Grid>
                    </Card.Section>
                  </Card>
                </Grid.Col>
              </Grid>
            </FormWrapper>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
