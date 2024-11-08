import { useEffect, useState } from "react";
import {
  convertNumberToWords,
  formattedAmount,
} from "../Convert Number to letters/index";
import { motion } from "framer-motion";

const Home = () => {
  const [amount, setAmount] = useState<number | null>(0);
  const [amountLitters, setAmountLitters] =
    useState<string>("صفر دينار جزائري");
  const [copySuccess, setCopySuccess] = useState<string>("");
  const [formattedAmountValue, setFormattedAmountValue] =
    useState<string>("0.00");

  useEffect(() => {
    if (amount !== null && amount !== 0) {
      setAmountLitters(String(convertNumberToWords(amount)));
      setFormattedAmountValue(formattedAmount(amount));
    } else {
      setAmountLitters("صفر دينار جزائري");
      setFormattedAmountValue("0.00");
    }
  }, [amount]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(amountLitters)
      .then(() => {
        setCopySuccess("تم النسخ بنجاح!");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch(() => {
        setCopySuccess("فشل النسخ");
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= 12) {
      setAmount(value === "" ? null : parseInt(value));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className={`rounded-md w-[300px] lg:w-[500px] xl:w-[600px]`}>
        <motion.div
          key={amountLitters}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`flex justify-center items-center h-40 text-center text-xl`}
        >
          {amountLitters}
        </motion.div>
      </div>
      <div className="h-24 flex flex-col">
        <button
          onClick={handleCopy}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 shadow-lg hover:bg-blue-600"
        >
          نسخ النص
        </button>
        {copySuccess && (
          <span className="text-green-500 font-bold mt-2 h-12">
            {copySuccess}
          </span>
        )}
      </div>
      <div className="h-14 text-3xl">{formattedAmountValue}</div>

      <div className="flex items-center gap-3" style={{ direction: "ltr" }}>
        <input
          style={{ direction: "rtl" }}
          placeholder="أدخل المبلغ.."
          type="number"
          className="shadow-lg rounded-lg border-2 border-gray-600 w-[300px] h-12 text-xl px-2"
          value={amount ?? ""}
          onChange={handleInputChange}
        />
        <span className="font-bold text-xl mx-2">DZ</span>
      </div>
    </div>
  );
};

export default Home;
