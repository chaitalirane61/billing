import React from "react";
import { DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat); // ✅ Extend dayjs with customParseFormat plugin

const { RangePicker } = DatePicker;

interface NonFormikRangeDatepickerProps
  extends Omit<RangePickerProps, "value" | "onChange"> {
  label: string;
  id?: string;
  value?: [string | Dayjs | null, string | Dayjs | null];
  onChange?: (
    dates: [Dayjs | null, Dayjs | null],
    dateStrings: [string, string]
  ) => void;
  className?: string;
  labelClass?: string;
  labelStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  formGroup?: string;
  format?: string;
  showError?: boolean;
  errorMessage?: string;
}

export const RangeDatePicker: React.FC<NonFormikRangeDatepickerProps> = ({
  label,
  id,
  value,
  onChange,
  showError = true,
  errorMessage = "",
  className = "",
  labelClass = "",
  labelStyle = {},
  inputStyle = {
    display: "flex",
    width: "100%",
  },
  formGroup = "",
  format = "DD-MM-YYYY", // ✅ Default to DD-MM-YYYY
  ...rangePickerProps
}) => {
  const inputId = id || label.replace(/\s+/g, "-").toLowerCase();

  // ✅ Correct parsing with format when value is a string
  const parsedValue: [Dayjs | null, Dayjs | null] | null =
    value?.[0] && value?.[1]
      ? [
        typeof value[0] === "string" ? dayjs(value[0], format) : value[0],
        typeof value[1] === "string" ? dayjs(value[1], format) : value[1],
      ]
      : null;

  return (
    <div className={`form-group item ${formGroup} position-relative`}>

      <label
        htmlFor={inputId}
        className={`form-label-trans form-label text-gray-500 ${labelClass}`}
        style={labelStyle}
      >
        {label}
      </label>

      <RangePicker
        id={inputId}
        className={`form-input-trans form-control ${className} ${showError && errorMessage ? "is-invalid-error" : ""
          }`}
        value={parsedValue}
        onChange={(dates, dateStrings) => {
          if (onChange) {
            onChange(
              dates as [Dayjs | null, Dayjs | null],
              dateStrings as [string, string]
            );
          }
        }}
        style={{
          ...inputStyle,
          backgroundColor: "var(--bs-body-bg, #fff)",
          borderColor: "var(--bs-border-color, #dee2e6)",
          color: "var(--bs-body-color, #212529)",
        }}
        format={format} // ✅ Apply format for input and output
        placeholder={["Start date", "End date"]}
        classNames={{
  popup: {
    root: "custom-date-picker-popup"
  }
}}
        {...rangePickerProps}
      />
      {/* <label
        htmlFor={inputId}
        className={`form-label-trans form-label ${labelClass}`}
        style={labelStyle}
      >
        {label}
      </label> */}
      {showError && errorMessage && (
        <div className="invalid-feedback-message d-block">{errorMessage}</div>
      )}
    </div>
  );
};
