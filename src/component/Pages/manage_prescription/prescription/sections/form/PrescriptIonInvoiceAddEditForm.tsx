import { useState, useRef } from "react";
import { Box, Card, Grid, Group, Text, ActionIcon, Divider, Image, Button, Badge, Paper, Tooltip } from "@mantine/core";
import { IconCalendar, IconClipboardList, IconEdit, IconFileReport, IconMedicalCross, IconPlus, IconTrash } from "@tabler/icons-react";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { useFormHelper } from "../../../../../../services/helperService";
import { notifications } from "@mantine/notifications";
import { PageDateInput, PageFileUpload, PageNumberInput, PageSelect, PageTextarea, PageTextInput, PageTimePicker } from "../../../../../common/PageInput";
import { PageModal } from "../../../../../common/PageModal";
import { useLocation } from "react-router";
import { prescriptIonInvoiceAddEditSchema, type PrescriptIonInvoiceAddEditFormType } from "../../../../../../services/zod_schema/manage_prescription/prescription/zodPrescriptIonInvoiceAddEditSchema";
import { PrescriptionNdcAddForm } from "./PrescriptionNdcAddForm";

// NDC Info Type
export type NDCInfoType = {
  consultancyPurpose: string;
  department: string;
  ndcNumber: string;
  prescriptionReason: string;
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
  startDate: Date | null;
  dosage: string;
  isRefill: string;
  medicationAlarmTimes: string[];
  instructions: string;
  notes: string;
  price: number;
  quantity: number;
  tax: number;
  total: number;
};

export const PrescriptIonInvoiceAddEditForm = () => {
  const { state: { id } } = useLocation()

  const modalApiRef = useRef<{ open: () => void; close: () => void } | null>(null);

  const mode = "create";
  const [ndcList, setNdcList] = useState<NDCInfoType[]>([]);
  const [currentNDCForm, setCurrentNDCForm] = useState<Partial<NDCInfoType> | null>(null);
  const [editingNDCIndex, setEditingNDCIndex] = useState<number | null>(null);
  const [currentAlarmTime, setCurrentAlarmTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentModalType, setCurrentModalType] = useState<'ndc' | null>(null);

  const prescriptIonInvoiceAddEditObject = prescriptIonInvoiceAddEditSchema();

  const [uploadedFiles, setUploadedFiles] = useState<{
    prescriptions: File[];
    receipts: File[];
    costSharing: File[];
  }>({
    prescriptions: [],
    receipts: [],
    costSharing: []
  });

  const topBarAndFilter = {
    type: "claim",
    heading:
      mode === "create"
        ? "Create PrescriptIon Invoice"
        : "Edit PrescriptIon Invoice",
    viewMode: "grid",
    whatNeeded: { isBackNeeded: true },
  };

  const form = useFormHelper<PrescriptIonInvoiceAddEditFormType>({
    initialValues: {
      claimType: '',
      appointmentId: '',
      patientInsurance: '',
      grandTotal: 0,
      coPay: 0,
      patientPay: 0,
      insurancePay: 0,
      appointmentDate: null,
      invoiceDate: null,
      medicationStartDate: null,
      otherInformation: '',
      medicineType: '',
      frequency: '',
      foodRequirementType: '',
      durationType: '',
      durationNumber: 0,
      startDate: null,
      dosage: '',
      isRefill: '',
      instructions: '',
      notes: '',
      price: 0,
      quantity: 0,
      tax: 0,
      total: 0,
    },
    validationSchema: prescriptIonInvoiceAddEditObject,
    mode: "controlled",
  });


  const handleFileUpload = (files: File[], fileType: 'prescriptions' | 'receipts' | 'costSharing', isMultiple = false) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: isMultiple ? [...prev[fileType], ...files] : files
    }));
    form.setFieldValue(`${fileType}Files`, isMultiple ? [...uploadedFiles[fileType], ...files] : files);
  };
  const handleFileReject = (rejectedFiles: any[]) => {
    notifications.show({
      title: "File Upload Error",
      message: `${rejectedFiles.length} file(s) were rejected. Please check file size and format.`,
      color: "red",
    });
  };
  const handleRemoveFile = (fileType: 'prescriptions' | 'receipts' | 'costSharing', index: number) => {
    setUploadedFiles(prev => {
      const newFiles = prev[fileType].filter((_, i) => i !== index);
      return {
        ...prev,
        [fileType]: newFiles
      };
    });
    const newFiles = uploadedFiles[fileType].filter((_, i) => i !== index);
    form.setFieldValue(`${fileType}Files`, newFiles);
  };

  const handleNDCSelection = (selectedNDC: any) => {
    setCurrentNDCForm({
      ndcNumber: selectedNDC.ndcNumber,
      name: selectedNDC.name,
      dosageForm: selectedNDC.dosageForm,
      route: selectedNDC.route,
      nonProprietaryName: selectedNDC.nonProprietaryName,
      consultancyPurpose: selectedNDC.consultancyPurpose,
      department: selectedNDC.department,
      pharmClass: selectedNDC.pharmClass,
      prescriptionReason: '',
      medicineType: '',
      frequency: '',
      foodRequirementType: '',
      durationType: '',
      durationNumber: 0,
      startDate: null,
      dosage: '',
      isRefill: '',
      medicationAlarmTimes: [],
      instructions: '',
      notes: '',
      price: 0,
      quantity: 0,
      tax: 0,
      total: 0,
    });
    setTimeout(() => modalApiRef.current?.close?.(), 0);
  };

  const handleDeleteNDC = (index: number) => {
    const updatedNdcList = ndcList.filter((_, i) => i !== index);
    setNdcList(updatedNdcList);
    form.setFieldValue("ndcList", updatedNdcList);
  };

  const handleEditNDC = (index: number) => {
    const ndcToEdit = ndcList[index];
    setCurrentNDCForm(ndcToEdit);
    setEditingNDCIndex(index);
  };

  const updateNDCInList = () => {
    if (currentNDCForm && editingNDCIndex !== null) {
      // Check if NDC number already exists in other items (excluding current item)
      const existingNDC = ndcList.find((ndc, index) =>
        ndc.ndcNumber === currentNDCForm.ndcNumber && index !== editingNDCIndex
      );
      if (existingNDC) {
        notifications.show({
          title: "Duplicate NDC",
          message: "This NDC number already exists in another item.",
          color: "red",
        });
        return;
      }

      const updatedList = [...ndcList];
      updatedList[editingNDCIndex] = currentNDCForm as NDCInfoType;
      setNdcList(updatedList);
      form.setFieldValue("ndcList", updatedList);
      setCurrentNDCForm(null);
      setEditingNDCIndex(null);

      notifications.show({
        title: "Success!",
        message: "NDC information updated successfully.",
        color: "green",
      });
    }
  };

  const addNDC = () => {
    setCurrentModalType('ndc');
    setTimeout(() => modalApiRef.current?.open?.(), 0);
  };

  const cancelNDCForm = () => {
    setCurrentNDCForm(null);
    setEditingNDCIndex(null);
  };

  const saveNDCForm = () => {
    if (currentNDCForm && currentNDCForm.ndcNumber) {
      // If editing existing NDC
      if (editingNDCIndex !== null) {
        updateNDCInList();
        return;
      }

      // Add new NDC (duplicate checking is now handled in the modal)
      const newNDC = currentNDCForm as NDCInfoType;
      const updatedList = [...ndcList, newNDC];
      setNdcList(updatedList);
      form.setFieldValue("ndcList", updatedList);
      setCurrentNDCForm(null);
      notifications.show({
        title: "Success!",
        message: "NDC information added successfully.",
        color: "green",
      });
    }
  };

  const updateNDCFormField = (field: keyof NDCInfoType, value: any) => {
    if (currentNDCForm) {
      const updated = { ...currentNDCForm, [field]: value };

      // Clear alarm times when frequency changes
      if (field === 'frequency') {
        updated.medicationAlarmTimes = [];
        setCurrentAlarmTime(null); // Reset current alarm time input
      }

      // Auto-calculate total when price, quantity, or tax changes
      if (field === 'price' || field === 'quantity' || field === 'tax') {
        const price = field === 'price' ? value : (updated.price || 0);
        const quantity = field === 'quantity' ? value : (updated.quantity || 0);
        const tax = field === 'tax' ? value : (updated.tax || 0);
        const subtotal = price * quantity;
        const taxAmount = (subtotal * tax) / 100;
        updated.total = parseFloat((subtotal + taxAmount).toFixed(2));
      }

      setCurrentNDCForm(updated);
    }
  };

  // Helper function to get max allowed alarm times based on frequency
  const getMaxAlarmTimes = (frequency: string) => {
    switch (frequency) {
      case 'Once a day': return 1;
      case 'Twice a day': return 2;
      case 'Three times a day': return 3;
      case 'Every 4 hours': return 6; // 24/4 = 6 times per day
      case 'Every 6 hours': return 4; // 24/6 = 4 times per day
      case 'As needed': return 0; // Hide alarm section
      default: return 0;
    }
  };

  // Helper function to format time to 12-hour format for display
  const formatTimeTo12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    const hour24 = parseInt(hours, 10);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Helper function to convert 12-hour format to 24-hour format for storage
  const convertTo24Hour = (time12: string) => {
    try {
      const timeStr = time12.trim();
      const [time, ampm] = timeStr.split(' ');
      const [hours, minutes] = time.split(':');
      let hour24 = parseInt(hours, 10);

      if (ampm && ampm.toUpperCase() === 'PM' && hour24 !== 12) {
        hour24 += 12;
      } else if (ampm && ampm.toUpperCase() === 'AM' && hour24 === 12) {
        hour24 = 0;
      }

      return `${hour24.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    } catch (error) {
      console.error('Error converting time format:', error, 'Input:', time12);
      return time12; // Return original if conversion fails
    }
  };

  const handleAddAlarmTime = () => {
    if (currentAlarmTime && currentNDCForm) {
      const maxAllowed = getMaxAlarmTimes(currentNDCForm.frequency || '');
      const currentCount = currentNDCForm.medicationAlarmTimes?.length || 0;

      // Check if maximum limit reached
      if (currentCount >= maxAllowed) {
        notifications.show({
          title: "Maximum Limit Reached",
          message: `You can only add ${maxAllowed} alarm time(s) for "${currentNDCForm.frequency}" frequency.`,
          color: "red",
        });
        return;
      }

      // Convert Date object to 24-hour time string format for storage
      let timeString: string = '';
      if (currentAlarmTime instanceof Date) {
        // Always store in 24-hour format internally for consistency
        timeString = currentAlarmTime.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        });
      } else if (typeof currentAlarmTime === 'string') {
        // Handle string input from time picker (could be 12-hour format)
        const timeStr = currentAlarmTime as string;
        // Check if it contains AM/PM to determine if it's 12-hour format
        if (timeStr.includes('AM') || timeStr.includes('PM')) {
          timeString = convertTo24Hour(timeStr);
        } else {
          // Assume it's already in 24-hour format
          timeString = timeStr;
        }
      } else {
        console.error('Unexpected alarm time type:', typeof currentAlarmTime, currentAlarmTime);
        notifications.show({
          title: 'Error',
          message: 'Invalid time format. Please select a valid time.',
          color: 'red',
        });
        return;
      }

      // Check if the same time already exists
      if (currentNDCForm.medicationAlarmTimes?.includes(timeString)) {
        notifications.show({
          title: "Duplicate Time",
          message: "This alarm time has already been added.",
          color: "red",
        });
        return;
      }

      const updated = {
        ...currentNDCForm,
        medicationAlarmTimes: [...(currentNDCForm.medicationAlarmTimes || []), timeString]
      };
      setCurrentNDCForm(updated);
      setCurrentAlarmTime(null);

      // Show success notification with 12-hour format
      notifications.show({
        title: "Alarm Time Added",
        message: `Alarm time ${formatTimeTo12Hour(timeString)} has been added successfully.`,
        color: "green",
      });
    }
  }; const handleRemoveAlarmTime = (index: number) => {
    if (currentNDCForm && currentNDCForm.medicationAlarmTimes) {
      const updated = {
        ...currentNDCForm,
        medicationAlarmTimes: currentNDCForm.medicationAlarmTimes.filter((_, i) => i !== index)
      };
      setCurrentNDCForm(updated);
    }
  };

  const onSubmitCall = (data: PrescriptIonInvoiceAddEditFormType) => {
    try {
      const result = prescriptIonInvoiceAddEditObject.safeParse(data);
      if (!result.success) {
        notifications.show({
          title: "Validation Error",
          message: "Please check all required fields",
          color: "red",
        });
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        notifications.show({
          title: "Success!",
          message: "Prescription Invoice saved successfully.",
          color: "green",
        });
        form.reset();
        setNdcList([]);
        setCurrentNDCForm(null);
        setUploadedFiles({
          prescriptions: [],
          receipts: [],
          costSharing: []
        });
      }, 600);
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "An error occurred",
        color: "red",
      });
    }
  };

  return (
    <Box>
      <PageModal
        onOpenReady={(api) => {
          modalApiRef.current = api;
        }}
        dataPass={{
          modalConfig: {
            size: currentModalType === 'ndc' ? "xl" : "md",
            radius: "md",
            padding: "xl",
            className: "overflow-y-auto",
            centered: true,
          },
          component: currentModalType === 'ndc' ? (
            <PrescriptionNdcAddForm dataPass={{
              handleNDCSelection,
              existingNDCList: ndcList
            }} />
          ) : null,
          title: currentModalType === 'ndc' ? "Search NDC Information" : "",
        }}
      />
      <Box>
        <Box>
          <Breadcrumb
            dataPass={{
              pageTitle: mode === "create" ? "Create PrescriptIon Invoice" : "Edit PrescriptIon Invoice",
              items: [
                { title: "Manage PrescriptIon", href: "#" },
                { title: "PrescriptIon List", href: "/manage-prescriptIon/prescription" },
                { title: mode === "create" ? "Create PrescriptIon Invoice" : "Edit PrescriptIon Invoice", href: "#", isActive: true },
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
                mode === "create" ? "Create Prescription Invoice" : "Update Prescription Invoice"
              }
              isLoading={isLoading}
            >
              <Grid>
                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className="border-sky-200 mb-4">
                    <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconFileReport size={16} color="teal" />
                        <Text fw={600} size="md" className="text-sky-800">Prescription Info</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-4 py-4">
                      <Grid gutter="md" className="mb-6">
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                          <Card withBorder radius="sm" className="border-gray-300 bg-white shadow-sm">
                            <Card.Section className="p-4">
                              <Text fw={600} size="md" className="text-gray-800 mb-3">Prescription #1</Text>
                              <Image src="https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480" alt="Prescription" />
                            </Card.Section>
                          </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                          <Card withBorder radius="sm" className="border-gray-300 bg-white shadow-sm">
                            <Card.Section className="p-4">
                              <Text fw={600} size="md" className="text-gray-800 mb-3">Prescription #1</Text>
                              <Image src="https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480" alt="Prescription" />
                            </Card.Section>
                          </Card>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                          <Card withBorder radius="sm" className="border-gray-300 bg-white shadow-sm">
                            <Card.Section className="p-4">
                              <Text fw={600} size="md" className="text-gray-800 mb-3">Prescription #1</Text>
                              <Image src="https://img.freepik.com/free-photo/marble-hand-paint-watercolor-texture_1409-2608.jpg?t=st=1755867237~exp=1755870837~hmac=2efe98143c937100d9654f3fb284f56e02761f4dd860db21d431dcc2710245e7&w=1480" alt="Prescription" />
                            </Card.Section>
                          </Card>
                        </Grid.Col>
                      </Grid>
                      <Divider my="xl" size="xs" variant="dashed" color="blue" label="Bellow you found the appointment information" labelPosition="center" className="w-full" />
                      <Grid gutter="md">
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                          <Box>
                            <Text fw={600} size="sm">Booking SNAH ID</Text>
                            <Text size="sm">SNAH456985</Text>
                          </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                          <Box>
                            <Text fw={600} size="sm">Prescription SNAH ID</Text>
                            <Text size="sm">{id.snahId}</Text>
                          </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                          <Box>
                            <Text fw={600} size="sm">Medical Issue</Text>
                            <Text size="sm">Test medical issue</Text>
                          </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                          <Box>
                            <Text fw={600} size="sm">Patient Name</Text>
                            <Text size="sm">Will Smith</Text>
                          </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                          <Box>
                            <Text fw={600} size="sm">Physician Name</Text>
                            <Text size="sm">John William</Text>
                          </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                          <Box>
                            <Text fw={600} size="sm">NPI Number</Text>
                            <Text size="sm">NPI552365</Text>
                          </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                          <Box>
                            <Text fw={600} size="sm">Physician DEA</Text>
                            <Text size="sm">DEA12365</Text>
                          </Box>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                          <Box>
                            <Text fw={600} size="sm">Prescription Notes</Text>
                            <Text size="sm">Test prescription note</Text>
                          </Box>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                          <FormField label="Select Insurance" required>
                            <PageSelect size="sm"
                              placeholder="Select insurance"
                              data={['Insurance A', 'Insurance B', 'Insurance C']}
                              searchable
                              {...form.getInputProps("patientInsurance")} />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={12}>
                          <Box>
                            <Text fw={600} size="sm">Description</Text>
                            <Text size="sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur in nisi repellat incidunt dolore dignissimos sed doloribus. Modi excepturi consequatur dolor nulla alias iusto corrupti, adipisci omnis temporibus earum autem.</Text>
                          </Box>
                        </Grid.Col>
                      </Grid>
                    </Card.Section>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className="border-sky-200 mb-4">
                    <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                      <Group justify="space-between">
                        <Box className="flex items-center gap-4">
                          <IconClipboardList size={16} color="teal" />
                          <Text fw={600} size="md" className="text-sky-800">NDC Information</Text>
                        </Box>
                        <Box>
                          <Button
                            onClick={addNDC}
                            leftSection={<IconPlus size={16} />}
                            disabled={!!currentNDCForm}
                            title={currentNDCForm ? "Please save or cancel the current NDC before adding a new one" : "Add new NDC"}
                          >Add NDC</Button>
                        </Box>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3">
                      {currentNDCForm && (
                        <Card withBorder radius="md" className={editingNDCIndex !== null ? "border-blue-200 mb-4" : "border-pink-200 mb-4"}>
                          <Card.Section className={editingNDCIndex !== null ? "bg-blue-100 px-4 py-3 rounded-t-md" : "bg-pink-100 px-4 py-3 rounded-t-md"}>
                            <Group justify="space-between">
                              <Text fw={600} size="md" className={editingNDCIndex !== null ? "text-blue-800" : "text-pink-800"}>
                                {editingNDCIndex !== null ? `Edit NDC #${editingNDCIndex + 1}` : `NDC #${ndcList.length + 1}`}
                              </Text>
                              <Group>
                                <Button size="sm" onClick={saveNDCForm} color={editingNDCIndex !== null ? "blue" : "pink"}>
                                  {editingNDCIndex !== null ? "Update NDC" : "Save NDC"}
                                </Button>
                                <Button size="sm" variant="light" onClick={cancelNDCForm}>Cancel</Button>
                              </Group>
                            </Group>
                          </Card.Section>
                          <Card.Section className="px-4 py-4">
                            <Box className="bg-cyan-100 dark:bg-cyan-900/20 p-3 rounded-md mb-4">
                              <Grid>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Pharm Class</Text>
                                  <Text size="sm">{currentNDCForm.pharmClass}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Route</Text>
                                  <Text size="sm">{currentNDCForm.route}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Dosage Form</Text>
                                  <Text size="sm">{currentNDCForm.dosageForm}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Department</Text>
                                  <Text size="sm">{currentNDCForm.department}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Consultancy Purpose</Text>
                                  <Text size="sm">{currentNDCForm.consultancyPurpose}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                  <Text fw={600} size="sm">Non Proprietary Name</Text>
                                  <Text size="sm">{currentNDCForm.nonProprietaryName}</Text>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12 }}>
                                  <Text fw={600} size="sm">Name</Text>
                                  <Text size="sm">{currentNDCForm.name}</Text>
                                </Grid.Col>
                              </Grid>
                            </Box>
                            <Grid>
                              <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 3 }}>
                                <FormField label="Medicine Type" required>
                                  <PageSelect
                                    placeholder="Select Medicine Type"
                                    data={['Capsule', 'Syrup', 'Tablet', 'Injection', 'Cream', 'Ointment', 'Powder', 'Gel']}
                                    {...form.getInputProps("medicineType")}
                                    onChange={(value) => updateNDCFormField('medicineType', value)}
                                    size="sm"
                                  />
                                </FormField>
                              </Grid.Col>
                              <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 3 }}>
                                <FormField label="Frequency" required>
                                  <PageSelect
                                    placeholder="Select Frequency"
                                    data={['Once a day', 'Twice a day', 'Three times a day', 'As needed', 'Every 4 hours', 'Every 6 hours']}
                                    {...form.getInputProps("frequency")}
                                    onChange={(value) => updateNDCFormField('frequency', value)}
                                    size="sm"
                                  />
                                </FormField>
                              </Grid.Col>
                              <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 3 }}>
                                <FormField label="Food Requirement Type" required>
                                  <PageSelect
                                    placeholder="Select Food Requirement"
                                    data={['Not Specified', 'Before Food', 'After Food']}
                                    {...form.getInputProps("foodRequirementType")}
                                    onChange={(value) => updateNDCFormField('foodRequirementType', value)}
                                    size="sm"
                                  />
                                </FormField>
                              </Grid.Col>
                              <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 3 }}>
                                <FormField label="Duration Type" required>
                                  <PageSelect
                                    placeholder="Select Duration Type"
                                    data={['Days', 'Weeks', 'Months']}
                                    {...form.getInputProps("durationType")}
                                    onChange={(value) => updateNDCFormField('durationType', value)}
                                    size="sm"
                                  />
                                </FormField>
                              </Grid.Col>
                              <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 3 }}>
                                <FormField label="Duration Number" required>
                                  <PageNumberInput
                                    placeholder="30"
                                    {...form.getInputProps("durationNumber")}
                                    onChange={(value) => updateNDCFormField('durationNumber', value)}
                                    size="sm"
                                  />
                                </FormField>
                              </Grid.Col>
                              <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 3 }}>
                                <FormField label="Start Date" required>
                                  <PageDateInput
                                    placeholder="dd-mm-yyyy"
                                    {...form.getInputProps("startDate")}
                                    onChange={(value) => updateNDCFormField('startDate', value)}
                                    size="sm"
                                    leftSection={<IconCalendar size={16} />}
                                  />
                                </FormField>
                              </Grid.Col>
                              <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 3 }}>
                                <FormField label="Dosage" required>
                                  <PageTextInput
                                    placeholder="7MG"
                                    {...form.getInputProps("dosage")}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateNDCFormField('dosage', e.target.value)}
                                    size="sm"
                                  />
                                </FormField>
                              </Grid.Col>
                              <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 3 }}>
                                <FormField label="Is Refill" required>
                                  <PageSelect
                                    placeholder="Select Refill Status"
                                    data={['Yes', 'No']}
                                    {...form.getInputProps("isRefill")}
                                    onChange={(value) => updateNDCFormField('isRefill', value)}
                                    size="sm"
                                  />
                                </FormField>
                              </Grid.Col>


                              <Grid.Col span={12}>
                                {currentNDCForm.frequency && currentNDCForm.frequency !== 'As needed' && (
                                  <Card withBorder radius="md" className="border-amber-200 bg-amber-50 dark:bg-amber-900/10">
                                    <Card.Section className="bg-amber-100 dark:bg-amber-900/20 px-4 py-3 rounded-t-md">
                                      <Group justify="space-between" align="center">
                                        <Group gap="xs">
                                          <Text fw={600} size="sm" className="text-amber-800 dark:text-amber-200">Set Medication Alarm Times</Text>
                                          <Badge color="amber" size="xs" variant="light">
                                            {currentNDCForm.frequency} - Max {getMaxAlarmTimes(currentNDCForm.frequency)} times
                                          </Badge>
                                        </Group>
                                        <Text size="xs" className="text-amber-700 dark:text-amber-300">
                                          {(currentNDCForm.medicationAlarmTimes?.length || 0)} / {getMaxAlarmTimes(currentNDCForm.frequency)} times added
                                        </Text>
                                      </Group>
                                    </Card.Section>
                                    <Card.Section className="px-4 py-4">
                                      <Box className="space-y-4">
                                        <Group gap="xs" justify="center">
                                          <PageTimePicker
                                            placeholder="Select time"
                                            value={currentAlarmTime}
                                            onChange={(value) => {
                                              setCurrentAlarmTime(value);
                                            }}
                                            size="sm"
                                            withDropdown
                                            format="12h"
                                            className="flex-1 max-w-xs"
                                          />
                                          <Tooltip label={!currentAlarmTime || (currentNDCForm.medicationAlarmTimes?.length || 0) >= getMaxAlarmTimes(currentNDCForm.frequency) ? "Already added" : "Add Alarm Time"}>
                                            <ActionIcon
                                              color="blue"
                                              size="md"
                                              variant="filled"
                                              onClick={handleAddAlarmTime}
                                              disabled={!currentAlarmTime || (currentNDCForm.medicationAlarmTimes?.length || 0) >= getMaxAlarmTimes(currentNDCForm.frequency)}
                                              className="hover:scale-105 transition-transform"
                                              title={currentAlarmTime ? `Add time: ${currentAlarmTime instanceof Date ? formatTimeTo12Hour(currentAlarmTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })) : (typeof currentAlarmTime === 'string' ? ((currentAlarmTime as string).includes('AM') || (currentAlarmTime as string).includes('PM') ? currentAlarmTime : formatTimeTo12Hour(currentAlarmTime as string)) : String(currentAlarmTime))}` : 'Select a time first'}
                                            >
                                              <IconPlus size={16} />
                                            </ActionIcon>
                                          </Tooltip>
                                        </Group>

                                        {/* Display Added Times */}
                                        {currentNDCForm.medicationAlarmTimes && currentNDCForm.medicationAlarmTimes.length > 0 && (
                                          <Box>
                                            <Text size="sm" fw={500} className="text-gray-700 dark:text-gray-300 mb-3 text-center">
                                              Added Alarm Times:
                                            </Text>
                                            <Group justify="center" gap="sm">
                                              {currentNDCForm.medicationAlarmTimes.map((time, index) => (
                                                <Paper
                                                  key={index}
                                                  withBorder
                                                  className="bg-white dark:bg-gray-800 border-amber-200 dark:border-amber-700 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                                >
                                                  <Group gap="xs" justify="space-between" align="center">
                                                    <Text
                                                      size="sm"
                                                      fw={600}
                                                      className="text-amber-800 dark:text-amber-200 font-mono"
                                                    >
                                                      🕐 {formatTimeTo12Hour(time)}
                                                    </Text>
                                                    <ActionIcon
                                                      color="red"
                                                      size="xs"
                                                      variant="light"
                                                      onClick={() => handleRemoveAlarmTime(index)}
                                                      className="hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                                    >
                                                      <IconTrash size={10} />
                                                    </ActionIcon>
                                                  </Group>
                                                </Paper>
                                              ))}
                                            </Group>
                                          </Box>
                                        )}

                                        {/* Empty State Message */}
                                        {(!currentNDCForm.medicationAlarmTimes || currentNDCForm.medicationAlarmTimes.length === 0) && (
                                          <Text size="sm" className="text-gray-500 dark:text-gray-400 text-center italic">
                                            No alarm times set yet. Add times above to schedule medication reminders.
                                          </Text>
                                        )}
                                      </Box>
                                    </Card.Section>
                                  </Card>
                                )}

                                {/* Message when frequency is not selected */}
                                {!currentNDCForm.frequency && (
                                  <Paper className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                                    <Text size="sm" className="text-gray-600 dark:text-gray-400 text-center">
                                      Please select a frequency above to set medication alarm times.
                                    </Text>
                                  </Paper>
                                )}

                                {/* Message when "As needed" is selected */}
                                {currentNDCForm.frequency === 'As needed' && (
                                  <Paper className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                                    <Text size="sm" className="text-blue-700 dark:text-blue-300 text-center">
                                      💡 Alarm times are not required for "As needed" medication frequency.
                                    </Text>
                                  </Paper>
                                )}
                              </Grid.Col>


                              <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <FormField label="Instructions" required>
                                  <PageTextarea
                                    placeholder="Please follow doctor's instructions"
                                    {...form.getInputProps("instructions")}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateNDCFormField('instructions', e.target.value)}
                                    size="sm"
                                    rows={3}
                                  />
                                </FormField>
                              </Grid.Col>
                              <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6 }}>
                                <FormField label="Notes" required>
                                  <PageTextarea
                                    placeholder="See notes"
                                    {...form.getInputProps("notes")}
                                    onChange={(e) => updateNDCFormField('notes', e.target.value)}
                                    size="sm"
                                    rows={3}
                                  />
                                </FormField>
                              </Grid.Col>
                              <Grid.Col span={12}>
                                <Box className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                  <Text fw={600} size="sm" className="mb-3 text-blue-800 dark:text-blue-200">Price & Quantity</Text>
                                  <Grid>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 3 }}>
                                      <FormField label="Price" required>
                                        <PageNumberInput
                                          placeholder="2.30"
                                          {...form.getInputProps("price")}
                                          onChange={(value) => updateNDCFormField('price', value)}
                                          size="sm"
                                        />
                                      </FormField>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 3 }}>
                                      <FormField label="Quantity" required>
                                        <PageNumberInput
                                          placeholder="60"
                                          {...form.getInputProps("quantity")}
                                          onChange={(value) => updateNDCFormField('quantity', value)}
                                          size="sm"
                                        />
                                      </FormField>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 3 }}>
                                      <FormField label="Tax (%)" required>
                                        <PageNumberInput
                                          placeholder="7"
                                          {...form.getInputProps("tax")}
                                          onChange={(value) => updateNDCFormField('tax', value)}
                                          size="sm"
                                        />
                                      </FormField>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 3 }}>
                                      <FormField label="Total" required>
                                        <PageNumberInput
                                          placeholder="147.66"
                                          {...form.getInputProps("total")}
                                          size="sm"
                                          readonly
                                          className="bg-gray-100 dark:bg-gray-800"
                                        />
                                      </FormField>
                                    </Grid.Col>
                                  </Grid>
                                </Box>
                              </Grid.Col>
                            </Grid>
                          </Card.Section>
                        </Card>
                      )}
                      {ndcList.length > 0 ? (
                        <Grid gutter="md">
                          {ndcList.map((ndc: NDCInfoType, index: number) => (
                            <Grid.Col key={`ndc-${index}`} span={{ base: 12, sm: 6, md: 6, lg: 4 }}>
                              <Paper className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300 h-full" withBorder >
                                <Group justify="space-between" align="center" className="mb-3">
                                  <Badge color="blue" variant="light" size="sm" className="font-semibold" >NDC #{index + 1}</Badge>
                                  <Group gap="xs">
                                    <ActionIcon
                                      variant="light"
                                      color="blue"
                                      size="sm"
                                      className="hover:bg-blue-100 transition-all duration-300"
                                      onClick={() => handleEditNDC(index)}
                                    >
                                      <IconEdit size={12} />
                                    </ActionIcon>
                                    <ActionIcon
                                      variant="light"
                                      color="red"
                                      size="sm"
                                      className="hover:bg-red-100 transition-all duration-300"
                                      onClick={() => handleDeleteNDC(index)}
                                    >
                                      <IconTrash size={12} />
                                    </ActionIcon>
                                  </Group>
                                </Group>
                                <div className="space-y-3">
                                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <Group gap="xs" className="mb-2">
                                      <IconMedicalCross size={16} className="text-blue-600" />
                                      <Text fw={600} size="sm" className="text-gray-800 dark:text-gray-200">Drug Information</Text>
                                    </Group>
                                    <div className="space-y-2">
                                      <div className="grid grid-cols-2 gap-2">
                                        <div>
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">NDC Number:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300 font-mono bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                                            {ndc.ndcNumber}
                                          </Text>
                                        </div>
                                        <div>
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Name:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.name}</Text>
                                        </div>
                                        <div className="col-span-2">
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Non-Proprietary Name:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.nonProprietaryName}</Text>
                                        </div>
                                        <div className="col-span-2">
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Prescription Reason:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.prescriptionReason}</Text>
                                        </div>
                                        <div>
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Route:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.route}</Text>
                                        </div>
                                        <div>
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Dosage Form:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.dosageForm}</Text>
                                        </div>
                                        <div>
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Medicine Type:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.medicineType}</Text>
                                        </div>
                                        <div>
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Frequency:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.frequency}</Text>
                                        </div>
                                        <div>
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Duration:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.durationNumber} {ndc.durationType}</Text>
                                        </div>
                                        <div>
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Start Date:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.startDate ? new Date(ndc.startDate).toLocaleDateString() : 'N/A'}</Text>
                                        </div>
                                        <div>
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Dosage:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.dosage}</Text>
                                        </div>
                                        <div>
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Is Refill:</Text>
                                          <Badge color={ndc.isRefill === 'Yes' ? 'green' : 'red'} size="xs" variant="light">
                                            {ndc.isRefill}
                                          </Badge>
                                        </div>
                                        <div className="col-span-2">
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Instructions:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.instructions}</Text>
                                        </div>
                                        <div className="col-span-2">
                                          <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Notes:</Text>
                                          <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.notes}</Text>
                                        </div>
                                        {ndc.medicationAlarmTimes && ndc.medicationAlarmTimes.length > 0 && (
                                          <div className="col-span-2">
                                            <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Medication Alarm Times:</Text>
                                            <div className="flex flex-wrap gap-1">
                                              {ndc.medicationAlarmTimes.map((time, timeIndex) => (
                                                <Badge key={timeIndex} color="yellow" size="xs" variant="light" className="font-mono">
                                                  {formatTimeTo12Hour(time)}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                                    <Text fw={600} size="xs" className="text-blue-800 dark:text-blue-200 mb-2">Financial Information</Text>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Price:</Text>
                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">${ndc.price}</Text>
                                      </div>
                                      <div>
                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Quantity:</Text>
                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.quantity}</Text>
                                      </div>
                                      <div>
                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Tax:</Text>
                                        <Text size="xs" className="text-gray-700 dark:text-gray-300">{ndc.tax}%</Text>
                                      </div>
                                      <div>
                                        <Text size="xs" fw={600} className="text-gray-600 dark:text-gray-400 mb-1">Total:</Text>
                                        <Text size="xs" className="font-semibold text-green-600 dark:text-green-400">${ndc.total}</Text>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Paper>
                            </Grid.Col>
                          ))}
                        </Grid>
                      ) : !currentNDCForm ? (
                        <Paper className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
                          <IconMedicalCross size={48} className="text-gray-400 mx-auto mb-4" />
                          <Text size="lg" fw={500} className="text-gray-600 dark:text-gray-400 mb-2">No NDC Information Added Yet</Text>
                          <Text size="sm" className="text-gray-500 dark:text-gray-500 mb-4">Click "Add NDC" button to start adding drug information to your prescription.</Text>
                          <Button size="sm" onClick={addNDC} leftSection={<IconPlus size={16} />}>Add NDC</Button>
                        </Paper>
                      ) : null}
                    </Card.Section>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className="border-sky-200 mb-4">
                    <Card.Section className="bg-sky-100 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconMedicalCross size={16} color="teal" />
                        <Text fw={600} size="md" className="text-sky-800">Fill The Bellow Info</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3">
                      <Grid>
                        <Grid.Col span={12}>
                          <Grid>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Invoice date" required>
                                <PageDateInput
                                  size="sm"
                                  {...form.getInputProps("invoiceDate")}
                                  leftSection={<IconCalendar size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Medication start date" required>
                                <PageDateInput
                                  placeholder="Medication start date"
                                  size="sm"
                                  {...form.getInputProps("medicationStartDate")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Grand Total" required>
                                <PageNumberInput
                                  placeholder="Grand Total"
                                  size="sm"
                                  {...form.getInputProps("grandTotal")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Co Pay" required>
                                <PageNumberInput
                                  placeholder="Co Pay"
                                  size="sm"
                                  {...form.getInputProps("coPay")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Patient Pay" required>
                                <PageNumberInput
                                  placeholder="Patient Pay"
                                  size="sm"
                                  {...form.getInputProps("patientPay")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                              <FormField label="Insurance Pay" required>
                                <PageNumberInput
                                  placeholder="Insurance Pay"
                                  size="sm"
                                  {...form.getInputProps("insurancePay")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={12}>
                              <FormField label="Other Information" required>
                                <PageTextarea
                                  placeholder="Other Information"
                                  size="sm"
                                  resize="vertical"
                                  rows={5}
                                  {...form.getInputProps("otherInformation")}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={12}>
                              <Divider my="xl" size="xs" variant="dashed" color="blue" label="Bellow you need to upload the medical files" labelPosition="center" className="w-full" />
                              <Grid>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                                  <FormField label="Prescriptions File">
                                    <PageFileUpload
                                      description="Upload prescription documents (Max 5MB each)"
                                      accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'application/pdf']}
                                      multiple={true}
                                      maxSize={5 * 1024 ** 2}
                                      uploadedFiles={uploadedFiles.prescriptions}
                                      onDrop={(files, isMultiple) => handleFileUpload(files, 'prescriptions', isMultiple)}
                                      onReject={handleFileReject}
                                      onRemoveFile={(index) => handleRemoveFile('prescriptions', index)}
                                      height={250}
                                      uploadText="Drop prescription files here"
                                      supportText="PNG, JPG, GIF, PDF up to 5MB"
                                      showPreview={true}
                                      required
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                                  <FormField label="Receipts File">
                                    <PageFileUpload
                                      description="Upload receipt documents (Max 5MB each)"
                                      accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'application/pdf']}
                                      multiple={true}
                                      maxSize={5 * 1024 ** 2}
                                      uploadedFiles={uploadedFiles.receipts}
                                      onDrop={(files, isMultiple) => handleFileUpload(files, 'receipts', isMultiple)}
                                      onReject={handleFileReject}
                                      onRemoveFile={(index) => handleRemoveFile('receipts', index)}
                                      height={250}
                                      uploadText="Drop receipt files here"
                                      supportText="PNG, JPG, GIF, PDF up to 5MB"
                                      showPreview={true}
                                      required
                                    />
                                  </FormField>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
                                  <FormField label="Cost sharing invoice File">
                                    <PageFileUpload
                                      description="Upload cost sharing documents (Max 5MB each)"
                                      accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'application/pdf']}
                                      multiple={true}
                                      maxSize={5 * 1024 ** 2}
                                      uploadedFiles={uploadedFiles.costSharing}
                                      onDrop={(files, isMultiple) => handleFileUpload(files, 'costSharing', isMultiple)}
                                      onReject={handleFileReject}
                                      onRemoveFile={(index) => handleRemoveFile('costSharing', index)}
                                      height={250}
                                      uploadText="Drop cost sharing files here"
                                      supportText="PNG, JPG, GIF, PDF up to 5MB"
                                      showPreview={true}
                                      required
                                    />
                                  </FormField>
                                </Grid.Col>
                              </Grid>
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
