if (this.profileData.addressinfo.city == null) {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "city",
    massage:
      'Inside "basic information" tab in the "address information" section the "city" is need to fill',
    isAllSet: false,
  };
} else if (this.profileData.addressinfo.address == null) {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "address",
    massage:
      'Inside "basic information" tab in the "address information" section the "street" is need to fill',
    isAllSet: false,
  };
} else if (this.profileData.addressinfo.state == null) {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "state",
    massage:
      'Inside "basic information" tab in the "address information" section the "state" is need to fill',
    isAllSet: false,
  };
} else if (this.profileData.addressinfo.country == null) {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "country",
    massage:
      'Inside "basic information" tab in the "address information" section the "country" is need to fill',
    isAllSet: false,
  };
} else if (this.profileData.addressinfo.postalCode == null) {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "postalCode",
    massage:
      'Inside "basic information" tab in the "address information" section the "postal code" is need to fill',
    isAllSet: false,
  };
} else if (
  this.profileData.NAICScode == undefined ||
  this.profileData.NAICScode.length <= 0
) {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "NAICScode",
    massage:
      'Inside "basic information" tab in the "basic information" section the "NAICS code" is need to fill',
    isAllSet: false,
  };
} else if (
  this.profileData.taxonomyCode == undefined ||
  this.profileData.taxonomyCode.length <= 0
) {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "taxonomyCode",
    massage:
      'Inside "basic information" tab in the "basic information" section the "taxonomy code" is need to fill',
    isAllSet: false,
  };
} else if (this.profileData.telePhone === "") {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "telePhone",
    massage:
      'Inside "basic information" tab in the "basic information" section the "tele phone" is need to fill',
    isAllSet: false,
  };
} else if (
  this.profileData.administratorTitle == undefined ||
  this.profileData.administratorTitle === ""
) {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "administratorTitle",
    massage:
      'Inside "basic information" tab in the "basic information" section the "administrator title" is need to fill',
    isAllSet: false,
  };
} else if (
  this.profileData.administratorName == undefined ||
  this.profileData.administratorName === ""
) {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "administratorName",
    massage:
      'Inside "basic information" tab in the "basic information" section the "administrator name" is need to fill',
    isAllSet: false,
  };
} else if (this.profileData.EIN == undefined || this.profileData.EIN === "") {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "EIN",
    massage:
      'Inside "basic information" tab in the "basic information" section the "EIN" is need to fill',
    isAllSet: false,
  };
} else if (this.profileData.NPI == undefined || this.profileData.NPI === "") {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "NPI",
    massage:
      'Inside "basic information" tab in the "basic information" section the "NPI" is need to fill',
    isAllSet: false,
  };
} else if (
  this.profileData.faxNumber == undefined ||
  this.profileData.faxNumber === ""
) {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "faxNumber",
    massage:
      'Inside "basic information" tab in the "basic information" section the "fax number" is need to fill',
    isAllSet: false,
  };
} else if (
  this.profileData.establishedDate == undefined ||
  this.profileData.establishedDate === ""
) {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "establishedDate",
    massage:
      'Inside "basic information" tab in the "basic information" section the "established date" is need to fill',
    isAllSet: false,
  };
} else if (this.profileData.tc == undefined || this.profileData.tc === "") {
  profileUpdateNeed = {
    for: "Basic Information",
    field: "tc",
    massage:
      'Inside "basic information" tab in the "acceptance information" section the "tc" is need to fill',
    isAllSet: false,
  };
} else if (this.accountLinkedData.length <= 0) {
  profileUpdateNeed = {
    for: "Account Linked",
    field: "accountLinkedData",
    massage:
      'Inside "account linked" tab you need to add atlist one "account info" and make it as "default"',
    isAllSet: false,
  };
} else if (this.certificationData.documents == undefined) {
  profileUpdateNeed = {
    for: "Certification",
    field: "certificationData",
    massage:
      'Inside "certification" tab you need to add atlist one "certification info"',
    isAllSet: false,
  };
} else if (this.insuranceCoveredData.length <= 0) {
  profileUpdateNeed = {
    for: "Insurance Covered",
    field: "insuranceCoveredData",
    massage:
      'Inside "insurance covered" tab you need to add atlist one "insurance info"',
    isAllSet: false,
  };
} else if (
  this.kycDocumentData.documents == undefined ||
  this.kycDocumentData.status == "rejected"
) {
  profileUpdateNeed = {
    for: "Uploaded Kyc",
    field: "kycDocumentData",
    massage:
      'Inside "uploaded kyc" tab you need to add "kyc info" for verification',
    isAllSet: false,
  };
}

if (profileUpdateNeed.isAllSet == false) {
  sessionStorage.setItem("isProfileDone", JSON.stringify(profileUpdateNeed));
  this.router.navigate(["/profile/edit-profile"]);
} else {
  sessionStorage.setItem("isProfileDone", JSON.stringify(profileUpdateNeed));
  let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
  Swal.fire({
    position: "top",
    icon: "success",
    title: "Successfully signed in",
    showConfirmButton: false,
    timer: 1500,
  });
  this.router.navigate([returnUrl || "/dashboard"]);
  this.inputUser = this.signinform.value;
}
