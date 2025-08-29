import React from "react";

import { MultiSelect } from "@mantine/core";

interface SeachComponentProps {
  title: string;
  nameValue: string;
  errorPara: string;
  handleMultiselect: (value: string[], label: string) => void;
}

const searchBoxOptionData = [
  "163WM1400X-Nurse Massage Therapist (NMT)",
  "179XY200B-Physical Therapist (PT)",
  "184TR560R-Occupational Therapist (OT)",
  "199KM112T-Respiratory Therapist (RT)",
  "211NW982P-Speech Therapist (ST)",
  "221PL774Q-Radiology Technician (RT)",
  "233AB331X-Medical Assistant (MA)",
  "247CD413V-Phlebotomist (Phlebo)",
  "259EF653S-Laboratory Technician (Lab Tech)",
  "271GH890L-X-Ray Technician (XRT)",
  "282JK559M-Dental Hygienist (DH)",
  "293LM678N-Medical Coder (MC)",
  "305NP234O-Pharmacy Technician (Pharm Tech)",
  "317QR890P-Health Information Technician",
  "328ST456Q-Nuclear Medicine Technologist",
  "339UV123R-Clinical Laboratory Scientist",
  "351WX789S-Medical Sonographer",
  "362YZ234T-Veterinary Technician",
  "374AB567U-Cardiovascular Technologist",
  "385CD890V-Respiratory Therapy Technician",
  "397EF345W-Medical Transcriptionist",
  "408GH678X-Paramedic",
  "419JK012Y-Home Health Aide",
  "431LM345Z-Nurse Practitioner",
  "442NO678A-Physician Assistant",
  "453PQ901B-Surgical Technician",
  "465RS234C-Rehabilitation Counselor",
  "476TU567D-Nutritionist",
  "487VW890E-Mental Health Counselor",
  "498XY123F-Genetic Counselor",
  "510ZA456G-Dietitian",
  "521BC789H-Audiologist",
  "532DE012I-Psychologist",
  "544FG345J-Phlebotomy Technician",
  "555HI678K-Certified Nursing Assistant",
  "566JK901L-Emergency Medical Technician",
  "577LM234M-Medical Laboratory Technician",
  "588NO567N-Radiologic Technologist",
  "599PQ890O-Occupational Therapy Assistant",
  "610RS123P-Respiratory Therapist Assistant",
  "621TU456Q-Physical Therapy Assistant",
  "632VW789R-Medical Assistant",
  "644XY012S-Health Educator",
  "655ZA345T-Home Care Aide",
  "666BC678U-Medical Records Technician",
  "677DE901V-Dental Assistant",
  "688FG234W-Pharmacy Aide",
  "699HI567X-Orderly",
  "710JK890Y-Patient Care Technician",
  "721LM123Z-Nuclear Medicine Technician",
  "732NO456A-Clinical Research Coordinator",
];

const MultiSelectSearch = React.forwardRef<
  HTMLInputElement,
  SeachComponentProps
>(({ title, handleMultiselect, nameValue, errorPara }, ref) => {
  return (
    <div className="col-lg-6 col-md-6 col-sm-6 col-12 position-relative">
      <MultiSelect
        label={title}
        placeholder="Pick value"
        className="multiSelectInput"
        name={errorPara}
        ref={ref}
        data={searchBoxOptionData}
        onChange={(value) => {
          handleMultiselect(value, nameValue);
        }}
        comboboxProps={{
          transitionProps: { transition: "pop", duration: 200 },
        }}
        styles={() => ({
          input: {
            borderColor: errorPara ? "red" : "#e9edf1",
            height: "40px",
          },
        })}
        error={errorPara}
        searchable
      />
    </div>
  );
});

export default React.memo(MultiSelectSearch);
