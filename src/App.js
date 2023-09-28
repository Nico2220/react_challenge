import { useState, useEffect } from "react";
// import QuestionList from "./QuestionList";
// import Quiz from "./Quiz";
// import QuestionListt from "./QuestionListt";
import Test from "./Test";
// import Memory from "./Memory";
// import CryptoPrices from "./CryptoPrices";
// import PhoneInput from "./PhoneInput";
import ConnectFour from "./ConnectFour";
import { useStateWithHistory } from "./useStateWithHistory";

export default function App() {
  const [value, setValue] = useStateWithHistory(10);
  return (
    <>
      <ConnectFour />
    </>
  );
}
