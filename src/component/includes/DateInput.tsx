import React from "react";
import ErrorIndicator from "./ErrorIndicator";
import type { DateInputProps } from "../../types/UserInterface";

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, name, errorPara, value, handleOnchange }, ref) => {
    return (
      <div className="dateInputDiv">
        <label className="form-label">{label}</label>
        <span style={{ color: "#f05136" }}> *</span>
        <input
          className="form-control digits"
          name={name}
          ref={ref}
          style={{ border: errorPara && "1px solid #f05136" }}
          type="date"
          onChange={handleOnchange}
          value={value}
        />
        {errorPara && <ErrorIndicator error={errorPara} />}
      </div>
    );
  }
);

export default React.memo(DateInput);
