import { useState, useEffect } from "react";
import { Box, Card, Grid, Group, Text, Radio, ActionIcon, Badge, Paper } from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { IconAddressBook, IconBrandMantine, IconCalendar, IconMail, IconPhone, IconPin, IconPlus, IconWriting, IconTrash } from "@tabler/icons-react";
import { Breadcrumb } from "../../../../../includes/BreadCrumbs";
import { PageTopBarAndFilter } from "../../../../../common/PageTopBarAndFilter";
import { FormField, FormWrapper } from "../../../../../common/PageFromWrapper";
import { useFormHelper } from "../../../../../../services/helperService";
import { notifications } from "@mantine/notifications";
import { useLocation } from "react-router";
import { useStaffMemberCreate } from "../../../../../../hooks/query_hooks/staffMemberHooks";
import { staffMemberAddEditSchema, type StaffMemberAddEditFormType } from "../../../../../../services/zod_schema/manage_staff/staff_member/zodStaffMemberAddEditSchema";
import { PageFileUpload, PageTextarea, PageTextInput } from "../../../../../common/PageInput";

type EducationEntry = {
  institutionName: string;
  boardCertifications: string;
  degree: string;
  courseDuration: [Date, Date];
};

type ExperienceEntry = {
  organizationName: string;
  departmentName: string;
  position: string;
  workExperienceDuration: [Date, Date];
};


export const StaffMemberAddEditForm = () => {
  const { state } = useLocation()
  const staffMemberObject = staffMemberAddEditSchema();
  const mode = state ? "edit" : "create";
  const [gender, setGender] = useState("male");
  const [isLoading, setIsLoading] = useState(false);
  const [educationIds, setEducationIds] = useState<number[]>([Math.floor(Math.random() * 100)]);
  const [experienceIds, setExperienceIds] = useState<number[]>([Math.floor(Math.random() * 100)]);
  const [educationErrors, setEducationErrors] = useState<Record<number, Record<string, string>>>({});
  const [experienceErrors, setExperienceErrors] = useState<Record<number, Record<string, string>>>({});

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
  const topBarAndFilter = {
    type: "staffMember",
    heading: mode == 'create' ? "Create Staff Member" : "Edit Staff Member",
    viewMode: "grid",
    whatNeeded: {
      isBackNeeded: true,
    },
  };
  const form = useFormHelper<StaffMemberAddEditFormType>({
    initialValues: {
      firstName: state ? 'John' : '',
      lastName: state ? 'Doe' : '',
      email: state ? 'john.doe@example.com' : '',
      mobile: state ? '1234567890' : '',
      dob: state ? '01/01/1990' : '',
      joiningDate: state ? '01/01/1990' : '',
      pin: state ? '1234' : '',
      gender: gender,
      institutionName: state ? 'Test institution' : '',
      departmentName: state ? 'Test department' : '',
      degree: state ? 'Test degree' : '',
      courseDuration: ['01/01/2010', '01/01/2015'],
      organizationName: state ? 'Test organization' : '',
      position: state ? 'Test position' : '',
      workExperienceDuration: ['01/01/2016', '01/01/2020'],
      country: state ? 'USA' : '',
      city: state ? 'Austin' : '',
      state: state ? 'TX' : '',
      pinCode: state ? '78701' : '',
      about: state ? 'I am a staff member' : '',
      // name: departmentInfo.name || '',
      // description: departmentInfo.description || '',
    },
    validationSchema: staffMemberObject,
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
  const { mutate: createStaffUserMember, status } = useStaffMemberCreate(() => {
    setIsLoading(status === 'pending' ? true : false);
    notifications.show({
      title: 'Success!',
      message: 'Staff member created successfully',
      color: 'green',
    });
    form.reset();
  });

  const onSubmitCall = (formData: StaffMemberAddEditFormType) => {
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
      staffMemberObject.parse(submitData);
      createStaffUserMember(submitData);
      console.log('Form data validated successfully:', submitData);
    } catch (error) {
      notifications.show({
        title: 'Validation Error',
        message: 'Please check all required fields',
        color: 'red',
      });
    }
  };


  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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

  return (
    <Box>
      <Box>
        <Breadcrumb
          dataPass={{
            pageTitle: mode == 'create' ? "Create Staff Member" : "Edit Staff Member",
            items: [
              { title: "Manage Staff", href: "#" },
              { title: "Staff Member List", href: "/medical-providers/staff-member" },
              { title: mode == 'create' ? "Create Staff Member" : "Edit Staff Member", href: "#", isActive: true },
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
                  <Card withBorder radius="md" className=" border-blue-200 mb-4">
                    <Card.Section className="bg-blue-100 px-4 py-3 rounded-t-md">
                      <Group justify="start">
                        <IconAddressBook size={16} color="blue" />
                        <Text fw={600} size="md" className="text-blue-800">Your Personal Details</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3">
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
                                  placeholder="Enter first name"
                                  size="sm"
                                  {...form.getInputProps('firstName')}
                                  leftSection={<IconBrandMantine size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="Last Name" required >
                                <PageTextInput
                                  placeholder="Enter last name"
                                  size="sm"
                                  {...form.getInputProps('lastName')}
                                  leftSection={<IconBrandMantine size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="Email ID" required >
                                <PageTextInput
                                  placeholder="Enter email ID"
                                  size="sm"
                                  {...form.getInputProps('email')}
                                  leftSection={<IconMail size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="Mobile Number" required >
                                <PageTextInput
                                  placeholder="Enter mobile number"
                                  size="sm"
                                  {...form.getInputProps('mobile')}
                                  leftSection={<IconPhone size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="Date Of Birth" required >
                                <DateInput
                                  placeholder="Enter date of birth"
                                  size="sm"
                                  {...form.getInputProps('dob')}
                                  leftSection={<IconCalendar size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="Joining Date" required >
                                <DateInput
                                  placeholder="Enter joining date"
                                  size="sm"
                                  {...form.getInputProps('joiningDate')}
                                  className="border-emerald-200 focus:border-emerald-500 text-colo"
                                  leftSection={<IconCalendar size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                              <FormField label="PIN Number" required >
                                <PageTextInput
                                  placeholder="Enter PIN number"
                                  size="sm"
                                  {...form.getInputProps('pin')}
                                  leftSection={<IconPhone size={16} />}
                                />
                              </FormField>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 3, xl: 4 }}>
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
                      </Grid>
                    </Card.Section>
                  </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className=" border-pink-200 mb-4">
                    <Card.Section className="bg-pink-100 px-4 py-3 rounded-t-md">
                      <Group justify="space-between">
                        <Box className="flex justify-start gap-4 align-middle">
                          <IconBrandMantine size={16} color="purple" className="self-center" />
                          <Text fw={600} size="md" className="text-pink-800">Your Educational Qualifications</Text>
                        </Box>
                        <Box>
                          <ActionIcon
                            variant="light"
                            color="pink"
                            size="lg"
                            className="hover:bg-pink-100 transition-all duration-300"
                            onClick={handleAddEducationSection}
                          >
                            <IconPlus size={16} />
                          </ActionIcon>
                        </Box>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3">
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
                  <Card withBorder radius="md" className=" border-purple-200 mb-4">
                    <Card.Section className="bg-purple-100 px-4 py-3  rounded-t-md">
                      <Group justify="space-between">
                        <Box className="flex justify-start gap-4 align-middle">
                          <IconWriting size={16} color="purple" className="self-center" />
                          <Text fw={600} size="md" className="text-purple-800">Your Work Experiences</Text>
                        </Box>
                        <Box>
                          <ActionIcon
                            variant="light"
                            color="purple"
                            size="lg"
                            className="hover:bg-purple-100 transition-all duration-300"
                            onClick={handleAddExperienceSection}
                          >
                            <IconPlus size={16} />
                          </ActionIcon>
                        </Box>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3">
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
                <Grid.Col span={{ base: 12 }}>
                  <Card withBorder radius="md" className=" border-yellow-200 mb-4">
                    <Card.Section className="bg-yellow-100 px-4 py-3  rounded-t-md">
                      <Group justify="start">
                        <IconPin size={16} color="brown" />
                        <Text fw={600} size="md" className="text-yellow-800">Your Address Information</Text>
                      </Group>
                    </Card.Section>
                    <Card.Section className="px-3 py-3">
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
                          <FormField label="PIN Code" required >
                            <PageTextInput
                              placeholder="Enter PIN code"
                              size="sm"
                              {...form.getInputProps('pinCode')}
                              leftSection={<IconPin size={16} />}
                            />
                          </FormField>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12 }}>
                          <FormField label="About Yourself" required >
                            <PageTextarea
                              rows={5}
                              placeholder="Tell us about yourself"
                              size="sm"
                              {...form.getInputProps('about')}
                            />
                          </FormField>
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
