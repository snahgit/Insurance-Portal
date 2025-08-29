import React, { Fragment } from "react";
import ErrorIndicator from "./ErrorIndicator";
import type { InputFieldProps } from "../../types/UserInterface";
import { TextInput } from "@mantine/core";

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, value, errorPara, handleOnchange }, ref) => {
    return (
      <Fragment>
        <label
          className="mb-1 text-sm font-semibold"
          htmlFor="validationTooltip01"
        >
          {label}
        </label>
        <span style={{ color: "#f05136" }}> *</span>
        <TextInput
          className="bg-red"
          type="text"
          ref={ref}
          style={{ border: errorPara && "1px solid #f05136" }}
          placeholder={value || label}
          name={name}
          value={value}
          onChange={handleOnchange}
        />
        {errorPara && <ErrorIndicator error={errorPara} />}
      </Fragment>
    );
  }
);