import { Box, Divider, Grid } from "@mantine/core"
import { FormField, FormWrapper } from "../../../common/PageFromWrapper"
import { PageCheckboxGroup, PageDateInput, PageFileUpload, PageMultiSelect, PageTextarea, PageTextInput } from "../../../common/PageInput"
import { IconUser, IconId, IconPhone, IconCalendar, IconUserCircle, IconReceiptTax, IconCertificate, IconInfoCircle, IconMapPin, IconHome, IconMap, IconWorld, IconNumbers, IconUserBolt, IconUserEdit, IconFreeRights } from "@tabler/icons-react"
import { useFormHelper } from "../../../../services/helperService"
import { useCreateDepartment } from "../../../../hooks/query_hooks/departmentHooks"
import { notifications } from "@mantine/notifications"
import { useState } from "react"
import { profileSchema, type ProfileFormType } from "../../../../services/zod_schema/profile/zodProfileSchema"

export const ProfileForm = (props: { dataPass: any }) => {
  const { profileData, type } = props.dataPass;
  const profileObject = profileSchema();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const form = useFormHelper<ProfileFormType>({
    initialValues: {
      name: profileData?.name || '',
      registrationId: profileData?.registrationId || '',
      phone: profileData?.phone || '',
      telPhone: profileData?.telPhone || '',
      createUserName: profileData?.createUserName || '',
      adminRepFullName: profileData?.adminRepFullName || '',
      adminRepTitle: profileData?.adminRepTitle || '',
      faxNumber: profileData?.faxNumber || '',
      tax: profileData?.tax || '',
      npi: profileData?.npi || '',
      ein: profileData?.ein || '',
      establishedDate: profileData?.establishedDate || '',
      taxonomy: profileData?.taxonomy || [],
      naicsCode: profileData?.naicsCode || [],
      about: profileData?.about || '',
      address: profileData?.address || '',
      streetAddress: profileData?.streetAddress || '',
      city: profileData?.city || '',
      state: profileData?.state || '',
      zipCode: profileData?.zipCode || '',
      country: profileData?.country || '',
    },
    validationSchema: profileObject,
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
  const handleFileUpload = (files: File[], isMultiple: boolean = false) => {
    if (isMultiple) {
      setUploadedFiles(prev => [...prev, ...files]);
    } else {
      setUploadedFiles(files);
    }
    if (files.length > 0) {
      form.setFieldValue('document', files[0].name);
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
    if (uploadedFiles.length <= 1) {
      form.setFieldValue('document', '');
    }
    notifications.show({
      title: 'File Removed',
      message: 'File has been removed successfully',
      color: 'orange',
    });
  };
  const onSubmitCall = (__formData: ProfileFormType) => {
    try {
      // const validatedData = profileObject.parse(formData);
      // createDepartment(validatedData);
      notifications.show({
        title: 'Success!',
        message: 'Profile form submitted successfully',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Validation Error',
        message: 'Please check your form data and try again',
        color: 'red',
      });
    }
  };

  return (
    <Box>
      {type == 'basic' && (
        <FormWrapper
          form={form}
          onSubmit={onSubmitCall}
          submitButtonText="Update profile"
          submitButtonIcon={<IconFreeRights size={16} />}
          isLoading={isLoading}>
          <Grid>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Name" required >
                <PageTextInput
                  placeholder="Enter name"
                  size="sm"
                  leftSection={<IconUser size={16} />}
                  {...form.getInputProps('name')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Registration Id" required >
                <PageTextInput
                  placeholder="Enter registration id"
                  size="sm"
                  leftSection={<IconId size={16} />}
                  {...form.getInputProps('registrationId')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Phone" required >
                <PageTextInput
                  placeholder="Enter phone number"
                  size="sm"
                  leftSection={<IconPhone size={16} />}
                  {...form.getInputProps('phone')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Tel Phone" required >
                <PageTextInput
                  placeholder="Enter tel phone number"
                  size="sm"
                  leftSection={<IconPhone size={16} />}
                  {...form.getInputProps('telPhone')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Create User Name" required >
                <PageTextInput
                  placeholder="Enter create user name"
                  size="sm"
                  leftSection={<IconUserCircle size={16} />}
                  {...form.getInputProps('createUserName')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Admin / Rep Full Name" required >
                <PageTextInput
                  placeholder="Enter admin / rep full name"
                  size="sm"
                  leftSection={<IconUserBolt size={16} />}
                  {...form.getInputProps('adminRepFullName')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Admin / Rep Title" required >
                <PageTextInput
                  placeholder="Enter admin / rep title"
                  size="sm"
                  leftSection={<IconUserEdit size={16} />}
                  {...form.getInputProps('adminRepTitle')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Fax Number" required >
                <PageTextInput
                  placeholder="Enter fax number"
                  size="sm"
                  leftSection={<IconPhone size={16} />}
                  {...form.getInputProps('faxNumber')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Tax" required >
                <PageTextInput
                  placeholder="Enter tax number"
                  size="sm"
                  leftSection={<IconReceiptTax size={16} />}
                  {...form.getInputProps('tax')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="NPI" required >
                <PageTextInput
                  placeholder="Enter NPI number"
                  size="sm"
                  leftSection={<IconCertificate size={16} />}
                  {...form.getInputProps('npi')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="EIN" required >
                <PageTextInput
                  placeholder="Enter EIN number"
                  size="sm"
                  leftSection={<IconNumbers size={16} />}
                  {...form.getInputProps('ein')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Established Date" required >
                <PageDateInput
                  placeholder="Enter established date"
                  size="sm"
                  leftSection={<IconCalendar size={16} />}
                  {...form.getInputProps('establishedDate')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <FormField label="Taxonomy" required >
                <PageMultiSelect
                  placeholder="Enter taxonomy"
                  size="sm"
                  data={['207KI0005X', '207KA0200X', '207K00000X', '193400000X', '193200000X']}
                  leftSection={<IconInfoCircle size={16} />}
                  {...form.getInputProps('taxonomy')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <FormField label="NAICS Code" required >
                <PageMultiSelect
                  placeholder="Enter NAICS code"
                  size="sm"
                  data={["NAICS 423450", "NAICS 423460", "NAICS 423990", "NAICS 424210"]}
                  searchable
                  leftSection={<IconNumbers size={16} />}
                  {...form.getInputProps('naicsCode')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <Divider my="xs" size="xs" variant="dashed" color="blue" label="Provide you address information" labelPosition="center" className="w-full" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Address" required >
                <PageTextInput
                  placeholder="Enter address"
                  size="sm"
                  leftSection={<IconMapPin size={16} />}
                  {...form.getInputProps('address')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Street address" required >
                <PageTextInput
                  placeholder="Enter street address"
                  size="sm"
                  leftSection={<IconHome size={16} />}
                  {...form.getInputProps('streetAddress')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="City" required >
                <PageTextInput
                  placeholder="Enter city"
                  size="sm"
                  leftSection={<IconMapPin size={16} />}
                  {...form.getInputProps('city')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="State" required >
                <PageTextInput
                  placeholder="Enter state"
                  size="sm"
                  leftSection={<IconMap size={16} />}
                  {...form.getInputProps('state')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Zip Code" required >
                <PageTextInput
                  placeholder="Enter zip code"
                  size="sm"
                  leftSection={<IconNumbers size={16} />}
                  {...form.getInputProps('zipCode')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 12, sm: 6, md: 4 }}>
              <FormField label="Country" required >
                <PageTextInput
                  placeholder="Enter country"
                  size="sm"
                  leftSection={<IconWorld size={16} />}
                  {...form.getInputProps('country')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <Divider my="xs" size="xs" variant="dashed" color="blue" label="Give information about you" labelPosition="center" className="w-full" />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <FormField label="Accept terms & Condition" required >
                <PageCheckboxGroup
                  data={[{ value: "accepted", label: "I accept the terms and conditions" }]}
                  {...form.getInputProps('termsAccepted')} />
              </FormField>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <FormField label="About myself" required >
                <PageTextarea
                  placeholder="Enter about"
                  size="sm"
                  rows={5}
                  resize="vertical"
                  {...form.getInputProps('about')} />
              </FormField>
            </Grid.Col>
          </Grid>
        </FormWrapper>
      )}
      {type == 'pic' && (
        <FormField label="Update your profile picture" required >
          <PageFileUpload
            description="Upload your document (Max 5MB)"
            accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
            multiple={false}
            maxSize={5 * 1024 ** 2}
            uploadedFiles={uploadedFiles}
            onDrop={(files, isMultiple) => handleFileUpload(files, isMultiple)}
            onReject={handleFileReject}
            onRemoveFile={handleRemoveFile}
            height={230}
            uploadText="Drop your photo here"
            supportText="PNG, JPG, GIF up to 5MB"
            showPreview={false}
            required
            {...form.getInputProps('document')}
          />
        </FormField>
      )}
    </Box>
  )
}