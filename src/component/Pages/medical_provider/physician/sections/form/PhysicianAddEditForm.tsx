import { useState, useEffect } from "react";
import { Box, Card, Grid, Group, Text, Radio, NumberInput, ActionIcon, Badge, Paper } from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { IconBrandMantine, IconCalendar, IconMail, IconPlus, IconWriting, IconTrash, IconPin, IconAddressBook, IconPhone } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { PageFileUpload, PageSelect, PageTextarea, PageTextInput } from "../../../../../common/PageInput";
import { useLocation } from "react-router";
import { useFormHelper } from "../../../../../../services/helperService";
import { useStaffMemberCreate } from "../../../../../../hooks/query_hooks/staffMemberHooks";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { physicianAddEditSchema, type PhysicianAddEditFormType, type EducationEntry, type ExperienceEntry } from "../../../../../../services/zod_schema/medical_provider/physician/zodPhysicianAddEditSchema";

export const PhysicianAddEditForm = () => {
  const { state } = useLocation()
  const mode = state ? "edit" : "create";
  const [gender, setGender] = useState("male");
  const [educationIds, setEducationIds] = useState<number[]>([Math.floor(Math.random() * 100)]);
  const [experienceIds, setExperienceIds] = useState<number[]>([Math.floor(Math.random() * 100)]);
  const physicianAddEditObject = physicianAddEditSchema();
  const [isLoading, setIsLoading] = useState(false);
  const [educationErrors, setEducationErrors] = useState<Record<number, Record<string, string>>>({});
  const [experienceErrors, setExperienceErrors] = useState<Record<number, Record<string, string>>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [educationData, setEducationData] = useState<EducationEntry[]>([{
    institutionName: state ? 'Test institution' : '',
    boardCertifications: state ? 'Test board certifications' : '',
    degree: state ? 'Test degree' : '',
    courseDuration: state ? [new Date(), new Date()] : [new Date(), new Date()]
  }]);

  const [experienceData, setExperienceData] = useState<ExperienceEntry[]>([{
    organizationName: state ? 'Test organization' : '',
    departmentName: state ? 'Test department' : '',
    position: state ? 'Test position' : '',
    workExperienceDuration: state ? [new Date(), new Date()] : [new Date(), new Date()]
  }]);

  const form = useFormHelper<PhysicianAddEditFormType>({
    initialValues: {
      firstName: state ? 'John' : '',
      lastName: state ? 'Doe' : '',
      email: state ? 'john.doe@example.com' : '',
      phone: state ? '1234567890' : '',
      licenseNumber: state ? 'LIC123456' : '',
      position: state ? 'Medical' : '',
      npiNumber: state ? 'NPI123456' : '',
      specialty: state ? 'Neurology' : '',
      department: state ? 'Cardiology' : '',
      experience: state ? '2' : '',
      dob: state ? '01/01/1990' : '',
      language: state ? 'English' : '',
      insurance: state ? 'Medicare' : '',
      about: state ? 'This is John Doe, a physician specializing in Neurology.' : '',
      country: state ? 'USA' : '',
      street: state ? '123 Main St' : '',
      city: state ? 'Anytown' : '',
      state: state ? 'CA' : '',
      postalCode: state ? '12345' : '',
      educationDetails: educationData,
      experienceDetails: experienceData,
    },
    validationSchema: physicianAddEditObject,
    mode: 'controlled',
  });

  const handleAddEducationSection = () => {
    const newId = Math.floor(Math.random() * 100);
    setEducationIds((prev) => [...prev, newId]);
    setEducationData((prev) => [...prev, {
      institutionName: "",
      boardCertifications: "",
      degree: "",
      courseDuration: [new Date(), new Date()]
    }]);
    setEducationErrors(prev => ({ ...prev, [newId]: {} }));
  };

  const handleDeleteEducationSection = (index: number) => {
    if (educationIds.length <= 1) {
      notifications.show({
        title: "Error",
        color: "red",
        message: "You cannot delete the last one",
      });
      return;
    }
    setEducationIds((prev) => prev.filter((_, i) => i !== index));
    setEducationData((prev) => prev.filter((_, i) => i !== index));
    setEducationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  };

  const handleAddExperienceSection = () => {
    const newId = Math.floor(Math.random() * 100);
    setExperienceIds((prev) => [...prev, newId]);
    setExperienceData((prev) => [...prev, {
      organizationName: "",
      departmentName: "",
      position: "",
      workExperienceDuration: [new Date(), new Date()]
    }]);
    setExperienceErrors(prev => ({ ...prev, [newId]: {} }));
  };

  const handleDeleteExperienceSection = (index: number) => {
    if (experienceIds.length <= 1) {
      notifications.show({
        title: "Error",
        color: "red",
        message: "You cannot delete the last one",
      });
      return;
    }
    setExperienceIds((prev) => prev.filter((_, i) => i !== index));
    setExperienceData((prev) => prev.filter((_, i) => i !== index));
    setExperienceErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[index];
      return newErrors;
    });
  };

  const handleEducationChange = (index: number, field: string, value: any) => {
    setEducationData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
    setEducationErrors(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: ''
      }
    }));
  };

  const handleExperienceChange = (index: number, field: string, value: any) => {
    setExperienceData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
    setExperienceErrors(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: ''
      }
    }));
  };

  const validateEducationEntry = (entry: EducationEntry, index: number): boolean => {
    const errors: Record<string, string> = {};

    if (!entry.institutionName || entry.institutionName.length < 2) {
      errors.institutionName = "Institution name must be at least 2 characters";
    }
    if (!entry.boardCertifications || entry.boardCertifications.length < 2) {
      errors.boardCertifications = "Board certifications required";
    }
    if (!entry.degree || entry.degree.length < 2) {
      errors.degree = "Degree required";
    }
    if (!entry.courseDuration || !entry.courseDuration[0] || !entry.courseDuration[1]) {
      errors.courseDuration = "Both start and end dates are required";
    } else if (entry.courseDuration[0] >= entry.courseDuration[1]) {
      errors.courseDuration = "End date must be after start date";
    }

    setEducationErrors(prev => ({ ...prev, [index]: errors }));
    return Object.keys(errors).length === 0;
  };

  const validateExperienceEntry = (entry: ExperienceEntry, index: number): boolean => {
    const errors: Record<string, string> = {};

    if (!entry.organizationName || entry.organizationName.length < 2) {
      errors.organizationName = "Organization name must be at least 2 characters";
    }
    if (!entry.departmentName || entry.departmentName.length < 2) {
      errors.departmentName = "Department name required";
    }
    if (!entry.position || entry.position.length < 2) {
      errors.position = "Position required";
    }
    if (!entry.workExperienceDuration || !entry.workExperienceDuration[0] || !entry.workExperienceDuration[1]) {
      errors.workExperienceDuration = "Both start and end dates are required";
    } else if (entry.workExperienceDuration[0] >= entry.workExperienceDuration[1]) {
      errors.workExperienceDuration = "End date must be after start date";
    }

    setExperienceErrors(prev => ({ ...prev, [index]: errors }));
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    form.setFieldValue('educationDetails', educationData);
  }, [educationData])

  useEffect(() => {
    form.setFieldValue('experienceDetails', experienceData);
  }, [experienceData])

  const { mutate: _createStaffUserMember, status } = useStaffMemberCreate(() => {
    setIsLoading(status === 'pending' ? true : false);
    notifications.show({
      title: 'Success!',
      message: 'Staff member created successfully',
      color: 'green',
    });
    form.reset();
  })

  const onSubmitCall = (formData: PhysicianAddEditFormType) => {
    let allEducationValid = true;
    educationData.forEach((entry, index) => {
      const isValid = validateEducationEntry(entry, index);
      if (!isValid) allEducationValid = false;
    });
    let allExperienceValid = true;
    experienceData.forEach((entry, index) => {
      const isValid = validateExperienceEntry(entry, index);
      if (!isValid) allExperienceValid = false;
    });
    if (!allEducationValid || !allExperienceValid) {
      notifications.show({
        title: 'Validation Error',
        message: 'Please fix all validation errors before submitting',
        color: 'red',
      });
      return;
    }
    try {
      const submitData = {
        ...formData,
        educationDetails: educationData,
        experienceDetails: experienceData
      };
      physicianAddEditObject.parse(submitData);
      // createStaffUserMember(validatedData);
      console.log('Form data validated successfully:', submitData);
    } catch (error) {
      notifications.show({
        title: 'Validation Error',
        message: 'Please check all required fields',
        color: 'red',
      });
    }
  }


  const handleFileUpload = (files: File[], isMultiple: boolean = false) => {
    if (isMultiple) {
      setUploadedFiles(prev => [...prev, ...files]);
    } else {
      setUploadedFiles(files);
    }
    notifications.show({
      title: 'Success!',
      message: `${files.length} file(s) uploaded successfully`,
      color: 'green',
    });
  };

  const handleFileReject = () => {
    notifications.show({
      title: 'Upload Failed',
      message: 'Some files were rejected. Please check file size and format.',
      color: 'red',
    });
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    notifications.show({
      title: 'File Removed',
      message: 'File has been removed successfully',
      color: 'orange',
    });
  };

  const topBarAndFilter = {
    type: "physician",
    heading: mode === "edit" ? "Edit Physician" : "Create Physician",
    viewMode: "grid",
    whatNeeded: {
      isBackNeeded: true,
    },
  };

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: mode === "edit" ? "Edit Physician" : "Create Physician",
            items: [
              { title: "Medical Providers", href: "#" },
              { title: "Physician List", href: "/medical-providers/physician" },
              { title: mode === "edit" ? "Edit Physician" : "Create Physician", href: "#", isActive: true },
            ],
          }}
        />
      </Box>
      <Box>
        <Card withBorder shadow="sm" className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/60 rounded-xl">
          <PageTopBarAndFilter dataPass={{ topBarAndFilter }} />
          <Box className="p-3">
            <FormWrapper
              form={form}
              onSubmit={onSubmitCall}
              submitButtonIcon={<IconPlus size={16} />}
              submitButtonText={mode === "create" ? "Create staff member" : "Update staff member"}
              isLoading={isLoading}>
              <Grid>
                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className="border-blue-200 dark:border-blue-600 mb-4 bg-white dark:bg-gray-800">
                    <Card.Section className="bg-blue-100 dark:bg-blue-900/30 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconAddressBook size={16} color="blue" />
                        <Text fw={600} size="md" className="text-blue-800 dark:text-blue-200">Your Personal Details</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3 bg-white dark:bg-gray-800">
                      <Grid>
                        <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
                          <PageFileUpload
                            label="Profile Photo"
                            description="Upload your profile photo (Max 5MB)"
                            accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
                            multiple={false}
                            maxSize={5 * 1024 ** 2}
                            uploadedFiles={uploadedFiles}
                            onDrop={(files, isMultiple) => handleFileUpload(files, isMultiple)}
                            onReject={handleFileReject}
                            onRemoveFile={handleRemoveFile}
                            height={250}
                            uploadText="Drop your photo here"
                            supportText="PNG, JPG, GIF up to 5MB"
                            showPreview={true}
                            required
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 9, lg: 9 }}>
                          <Grid>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="First Name" required >
                                <PageTextInput
                                  placeholder="First Name"
                                  size="sm"
                                  {...form.getInputProps('firstName')}
                                  leftSection={<IconBrandMantine size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="Last Name" required >
                                <PageTextInput
                                  placeholder="Last Name"
                                  size="sm"
                                  {...form.getInputProps('lastName')}
                                  leftSection={<IconBrandMantine size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="Email" required >
                                <PageTextInput
                                  placeholder="Email"
                                  size="sm"
                                  {...form.getInputProps('email')}
                                  leftSection={<IconMail size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="Phone" required >
                                <PageTextInput
                                  placeholder="Phone"
                                  size="sm"
                                  {...form.getInputProps('phone')}
                                  leftSection={<IconPhone size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="Medical Provider’s License No" required >
                                <PageTextInput
                                  placeholder="Medical Provider’s License No"
                                  size="sm"
                                  {...form.getInputProps('licenseNumber')}
                                  leftSection={<IconPin size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="Position" required >
                                <PageTextInput
                                  placeholder="Position"
                                  size="sm"
                                  {...form.getInputProps('position')}
                                  leftSection={<IconWriting size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="NPI Number" required >
                                <PageTextInput
                                  placeholder="NPI Number"
                                  size="sm"
                                  {...form.getInputProps('npiNumber')}
                                  leftSection={<IconPin size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="Select Specialty accepted" required >
                                <PageSelect
                                  placeholder="Select Specialty accepted"
                                  size="sm"
                                  searchable
                                  data={['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Psychiatry', 'Radiology', 'Surgery', 'Urology', 'Other']}
                                  {...form.getInputProps('specialty')}
                                  leftSection={<IconWriting size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="Gender" required error={form.errors.gender as string} >
                                <Radio.Group
                                  withAsterisk
                                  value={gender}
                                  onChange={setGender}
                                  name="gender" >
                                  <Group mt="xs">
                                    <Radio value="male" color="green" label="Male" />
                                    <Radio value="female" color="green" label="Female" />
                                  </Group>
                                </Radio.Group>
                              </FormField>
                            </Grid.Col>
                          </Grid>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12 }}>
                          <Grid>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Select Department" required >
                                <PageSelect
                                  placeholder="Select Department"
                                  size="sm"
                                  searchable
                                  data={['Cardiology', 'Gastroenterology', 'Oncology', 'General']}
                                  {...form.getInputProps('department')}
                                  leftSection={<IconWriting size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Years of Experience" required >
                                <NumberInput
                                  placeholder="Years of Experience"
                                  size="sm"
                                  {...form.getInputProps('experience')}
                                  leftSection={<IconCalendar size={16} />}
                                />
                              </FormField>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Date of Birth" required >
                                <DateInput
                                  placeholder="Date of Birth"
                                  size="sm"
                                  {...form.getInputProps('dob')}
                                  leftSection={<IconCalendar size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Language Spoken" required >
                                <PageSelect
                                  placeholder="Select Language"
                                  size="sm"
                                  data={['English', 'Spanish', 'Mandarin', 'French']}
                                  {...form.getInputProps('language')}
                                  leftSection={<IconBrandMantine size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Insurance accepted" required >
                                <PageSelect
                                  placeholder="Select Insurance"
                                  size="sm"
                                  searchable
                                  data={['Medicare', 'Medicaid', 'Private Insurance']}
                                  {...form.getInputProps('insurance')}
                                  leftSection={<IconPin size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12 }}>
                              <FormField label="About yourself" required >
                                <PageTextarea
                                  placeholder="Tell us about yourself"
                                  size="sm"
                                  rows={4}
                                  {...form.getInputProps('about')}
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
                  <Card withBorder radius="md" className="border-green-200 dark:border-green-600 mb-4 bg-white dark:bg-gray-800">
                    <Card.Section className="bg-green-100 dark:bg-green-900/30 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconPin size={16} color="green" />
                        <Text fw={600} size="md" className="text-green-800 dark:text-green-200">Your Address Details</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3 bg-white dark:bg-gray-800">
                      <Grid>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                          <FormField label="Country" required >
                            <PageTextInput
                              placeholder="Enter country"
                              size="sm"
                              {...form.getInputProps('country')}
                              leftSection={<IconAddressBook size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                          <FormField label="Street Address" required >
                            <PageTextInput
                              placeholder="Enter street address"
                              size="sm"
                              {...form.getInputProps('street')}
                              leftSection={<IconAddressBook size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                          <FormField label="City" required >
                            <PageTextInput
                              placeholder="Enter city"
                              size="sm"
                              {...form.getInputProps('city')}
                              leftSection={<IconAddressBook size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                          <FormField label="State" required >
                            <PageTextInput
                              placeholder="Enter state"
                              size="sm"
                              {...form.getInputProps('state')}
                              leftSection={<IconAddressBook size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                          <FormField label="Postal Code" required >
                            <PageTextInput
                              placeholder="Enter postal code"
                              size="sm"
                              {...form.getInputProps('postalCode')}
                              leftSection={<IconPin size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                      </Grid>
                    </Card.Section>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className="border-pink-200 dark:border-pink-600 mb-4 bg-white dark:bg-gray-800">
                    <Card.Section className="bg-pink-100 dark:bg-pink-900/30 px-4 py-3 rounded-t-md">
                      <Group justify="space-between">
                        <Box className="flex justify-start gap-4 align-middle">
                          <IconBrandMantine size={16} color="purple" className="self-center" />
                          <Text fw={600} size="md" className="text-pink-800 dark:text-pink-200">Your Educational Qualifications</Text>
                        </Box>
                        <Box>
                          <ActionIcon
                            variant="light"
                            color="pink"
                            size="lg"
                            className="hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all duration-300"
                            onClick={handleAddEducationSection}
                          >
                            <IconPlus size={16} />
                          </ActionIcon>
                        </Box>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3 bg-white dark:bg-gray-800">
                      {educationIds && educationIds.length !== 0 && educationIds.map((educationId, index) => (
                        <Paper key={educationId} className="bg-gradient-to-br from-pink-50 to-pink-50 dark:from-pink-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-pink-200 dark:border-pink-700 hover:shadow-lg transition-all duration-300 mb-4" withBorder>
                          <Group justify="space-between" align="center" className="mb-3">
                            <Badge color="pink" variant="light" size="sm" className="font-semibold">Education #{index + 1}</Badge>
                            <ActionIcon
                              variant="light"
                              color="red"
                              size="sm"
                              className="hover:bg-red-100 transition-all duration-300"
                              onClick={() => handleDeleteEducationSection(index)}
                            >
                              <IconTrash size={12} />
                            </ActionIcon>
                          </Group>
                          <Grid>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Institution Name" required error={educationErrors[index]?.institutionName}>
                                <PageTextInput
                                  placeholder="Enter institution name"
                                  size="sm"
                                  value={educationData[index]?.institutionName || ""}
                                  onChange={(e) => handleEducationChange(index, "institutionName", e.target.value)}
                                  leftSection={<IconBrandMantine size={16} />}
                                  error={educationErrors[index]?.institutionName}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Board Certifications" required error={educationErrors[index]?.boardCertifications}>
                                <PageTextInput
                                  placeholder="Enter board certifications"
                                  size="sm"
                                  value={educationData[index]?.boardCertifications || ""}
                                  onChange={(e) => handleEducationChange(index, "boardCertifications", e.target.value)}
                                  leftSection={<IconWriting size={16} />}
                                  error={educationErrors[index]?.boardCertifications}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Degree" required error={educationErrors[index]?.degree}>
                                <PageTextInput
                                  placeholder="Enter degree"
                                  size="sm"
                                  value={educationData[index]?.degree || ""}
                                  onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                                  leftSection={<IconWriting size={16} />}
                                  error={educationErrors[index]?.degree}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Course Duration" required error={educationErrors[index]?.courseDuration}>
                                <DatePickerInput
                                  type="range"
                                  placeholder="Enter course duration"
                                  size="sm"
                                  value={educationData[index]?.courseDuration || [null, null]}
                                  onChange={(value) => handleEducationChange(index, "courseDuration", value)}
                                  leftSection={<IconCalendar size={16} />}
                                  error={educationErrors[index]?.courseDuration}
                                />
                              </FormField>
                            </Grid.Col>
                          </Grid>
                        </Paper>
                      ))}
                    </Card.Section>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className="border-purple-200 dark:border-purple-600 mb-4 bg-white dark:bg-gray-800">
                    <Card.Section className="bg-purple-100 dark:bg-purple-900/30 px-4 py-3  rounded-t-md">
                      <Group justify="space-between">
                        <Box className="flex justify-start gap-4 align-middle">
                          <IconWriting size={16} color="purple" className="self-center" />
                          <Text fw={600} size="md" className="text-purple-800 dark:text-purple-200">Your Work Experiences</Text>
                        </Box>
                        <Box>
                          <ActionIcon
                            variant="light"
                            color="purple"
                            size="lg"
                            className="hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300"
                            onClick={handleAddExperienceSection}
                          >
                            <IconPlus size={16} />
                          </ActionIcon>
                        </Box>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3 bg-white dark:bg-gray-800">
                      {experienceIds && experienceIds.length !== 0 && experienceIds.map((experienceId, index) => (
                        <Paper key={experienceId} className="bg-gradient-to-br from-purple-50 to-purple-50 dark:from-purple-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300 mb-4" withBorder>
                          <Group justify="space-between" align="center" className="mb-3">
                            <Badge color="purple" variant="light" size="sm" className="font-semibold">Experience #{index + 1}</Badge>
                            <ActionIcon
                              variant="light"
                              color="red"
                              size="sm"
                              className="hover:bg-red-100 transition-all duration-300"
                              onClick={() => handleDeleteExperienceSection(index)}
                            >
                              <IconTrash size={12} />
                            </ActionIcon>
                          </Group>
                          <Grid>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Organization Name" required error={experienceErrors[index]?.organizationName}>
                                <PageTextInput
                                  placeholder="Enter organization name"
                                  size="sm"
                                  value={experienceData[index]?.organizationName || ""}
                                  onChange={(e) => handleExperienceChange(index, "organizationName", e.target.value)}
                                  leftSection={<IconWriting size={16} />}
                                  error={experienceErrors[index]?.organizationName}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Department Name" required error={experienceErrors[index]?.departmentName}>
                                <PageTextInput
                                  placeholder="Enter department name"
                                  size="sm"
                                  value={experienceData[index]?.departmentName || ""}
                                  onChange={(e) => handleExperienceChange(index, "departmentName", e.target.value)}
                                  leftSection={<IconWriting size={16} />}
                                  error={experienceErrors[index]?.departmentName}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Position" required error={experienceErrors[index]?.position}>
                                <PageTextInput
                                  placeholder="Enter position"
                                  size="sm"
                                  value={experienceData[index]?.position || ""}
                                  onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                                  leftSection={<IconWriting size={16} />}
                                  error={experienceErrors[index]?.position}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}>
                              <FormField label="Work Experience Duration" required error={experienceErrors[index]?.workExperienceDuration}>
                                <DatePickerInput
                                  type="range"
                                  placeholder="Enter work experience duration"
                                  size="sm"
                                  value={experienceData[index]?.workExperienceDuration || [null, null]}
                                  onChange={(value) => handleExperienceChange(index, "workExperienceDuration", value)}
                                  leftSection={<IconCalendar size={16} />}
                                  error={!!experienceErrors[index]?.workExperienceDuration}
                                />
                              </FormField>
                            </Grid.Col>
                          </Grid>
                        </Paper>
                      ))}
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