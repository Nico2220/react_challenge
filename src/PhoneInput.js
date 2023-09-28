import React, { useState } from "react";

const maxNum = 14;
export default function PhoneInput() {
  // Write your code here.
  const [phoneInput, setPhoneInput] = useState("");

  const handleChange = (e) => {
    setPhoneInput(format(e.target.value));
  };
  return (
    <>
      <input
        name="phoneInput"
        onChange={handleChange}
        value={phoneInput}
        placeholder="(555) 555-555"
      />
      <button
        type="submit"
        onClick={() => setPhoneInput("")}
        disabled={phoneInput.length < maxNum}
      >
        Submit
      </button>
    </>
  );
}

function format(str) {
  const rawString = str.replace(/\D/g, "");
  let output = "";
  if (rawString.length > 0) {
    output += "(";
    output += rawString.substring(0, 3);
  }

  if (rawString.length > 3) {
    output += ") ";
    output += rawString.substring(3, 6);
  }

  if (rawString.length > 6) {
    output += "-";
    output += rawString.substring(6, 10);
  }
  return output;
}
