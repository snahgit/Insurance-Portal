import React, { Fragment } from "react";

interface SelectBoxprops {
  label: string;
}

const SelectBox: React.FC<SelectBoxprops> = ({ label }) => {
  return (
    <Fragment>
      <label className="form-label" htmlFor="exampleFormControlSelect7">
        {label}
      </label>
      <select
        className="form-select btn-pill digits"
        id="exampleFormControlSelect7"
      >
        <option>Select {label}</option>
        <option>test value</option>
        <option>test value</option>
      </select>
    </Fragment>
  );
};

export default React.memo(SelectBox);
