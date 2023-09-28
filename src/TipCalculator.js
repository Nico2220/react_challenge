import React, { useState } from "react";
import "./tip_calculator.css";

export default function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [percentage, setPercentage] = useState(18);
  const [people, setPeople] = useState(1);

  const totalTip = (bill * percentage) / 100;
  const tipPerperson = totalTip / people;

  console.log(bill);
  return (
    <>
      <label htmlFor="bill">Bill</label>
      <input
        id="bill"
        name="bill"
        type="number"
        min="0"
        value={bill}
        onChange={(e) => setBill(parseInt(e.target.value))}
      />

      <label htmlFor="percentage">Tip Percentage</label>
      <input
        id="percentage"
        name="percentage"
        type="number"
        value={percentage}
        onChange={(e) => setPercentage(parseInt(e.target.value))}
      />

      <label htmlFor="people">Number of People</label>
      <input
        id="people"
        name="people"
        type="number"
        value={people}
        onChange={(e) => setPeople(parseInt(e.target.value))}
      />

      <p>Total Tip: {isNaN(totalTip) ? "-" : `$${totalTip.toFixed(2)}`}</p>
      <p>
        Tip Per Person:
        {isNaN(tipPerperson) ? "-" : `$${tipPerperson.toFixed(2)}`}
      </p>
    </>
  );
}

const result = [
  {
    category: "html",
    id: "dignup",
    name: "signup",
  },

  {
    category: "html",
    id: "hh",
    name: "hh",
  },
];
