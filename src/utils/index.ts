export function convertNumberToWords(num: number): string | null {
  if (String(num).length > 12) return null;

  const numbersBelowHundred: string[] = [
    "صفر",
    "واحد",
    "اثنان",
    "ثلاثة",
    "أربعة",
    "خمسة",
    "ستة",
    "سبعة",
    "ثمانية",
    "تسعة",
    "عشرة",
    "أحد عشر",
    "اثنا عشر",
    "ثلاثة عشر",
    "أربعة عشر",
    "خمسة عشر",
    "ستة عشر",
    "سبعة عشر",
    "ثمانية عشر",
    "تسعة عشر",
    "عشرون",
    "واحد وعشرون",
    "اثنان وعشرون",
    "ثلاثة وعشرون",
    "أربعة وعشرون",
    "خمسة وعشرون",
    "ستة وعشرون",
    "سبعة وعشرون",
    "ثمانية وعشرون",
    "تسعة وعشرون",
    "ثلاثون",
    "واحد وثلاثون",
    "اثنان وثلاثون",
    "ثلاثة وثلاثون",
    "أربعة وثلاثون",
    "خمسة وثلاثون",
    "ستة وثلاثون",
    "سبعة وثلاثون",
    "ثمانية وثلاثون",
    "تسعة وثلاثون",
    "أربعون",
    "واحد وأربعون",
    "اثنان وأربعون",
    "ثلاثة وأربعون",
    "أربعة وأربعون",
    "خمسة وأربعون",
    "ستة وأربعون",
    "سبعة وأربعون",
    "ثمانية وأربعون",
    "تسعة وأربعون",
    "خمسون",
    "واحد وخمسون",
    "اثنان وخمسون",
    "ثلاثة وخمسون",
    "أربعة وخمسون",
    "خمسة وخمسون",
    "ستة وخمسون",
    "سبعة وخمسون",
    "ثمانية وخمسون",
    "تسعة وخمسون",
    "ستون",
    "واحد وستون",
    "اثنان وستون",
    "ثلاثة وستون",
    "أربعة وستون",
    "خمسة وستون",
    "ستة وستون",
    "سبعة وستون",
    "ثمانية وستون",
    "تسعة وستون",
    "سبعون",
    "واحد وسبعون",
    "اثنان وسبعون",
    "ثلاثة وسبعون",
    "أربعة وسبعون",
    "خمسة وسبعون",
    "ستة وسبعون",
    "سبعة وسبعون",
    "ثمانية وسبعون",
    "تسعة وسبعون",
    "ثمانون",
    "واحد وثمانون",
    "اثنان وثمانون",
    "ثلاثة وثمانون",
    "أربعة وثمانون",
    "خمسة وثمانون",
    "ستة وثمانون",
    "سبعة وثمانون",
    "ثمانية وثمانون",
    "تسعة وثمانون",
    "تسعون",
    "واحد وتسعون",
    "اثنان وتسعون",
    "ثلاثة وتسعون",
    "أربعة وتسعون",
    "خمسة وتسعون",
    "ستة وتسعون",
    "سبعة وتسعون",
    "ثمانية وتسعون",
    "تسعة وتسعون",
  ];

  const hundreds: string[] = [
    "",
    "مائة",
    "مئتان",
    "ثلاثمائة",
    "أربعمائة",
    "خمسمائة",
    "ستمائة",
    "سبعمائة",
    "ثمانمائة",
    "تسعمائة",
  ];

  const units: string[] = ["", "ألف", "مليون", "مليار"];

  function splitIntoGroups(num: number): number[] {
    const numStr = num.toString();
    const groups: number[] = [];

    for (let i = numStr.length; i > 0; i -= 3) {
      const start = Math.max(0, i - 3);
      groups.unshift(parseInt(numStr.slice(start, i), 10));
    }

    return groups;
  }

  const groups = splitIntoGroups(num);
  const result: string[] = [];

  for (let i = 0; i < groups.length; i++) {
    const groupValue = groups[i];
    if (groupValue === 0) continue;

    const groupWords: string[] = [];

    const hundredsPart = Math.floor(groupValue / 100);
    const belowHundredPart = groupValue % 100;

    if (hundredsPart > 0) {
      groupWords.push(hundreds[hundredsPart]);
      if (belowHundredPart > 0) {
        groupWords.push("و");
      }
    }

    if (belowHundredPart > 0) {
      groupWords.push(numbersBelowHundred[belowHundredPart]);
    }

    const unitIndex = groups.length - i - 1;
    if (unitIndex > 0) {
      groupWords.push(units[unitIndex]);
    }

    result.push(groupWords.join(" "));
  }

  return result.length > 0 && num ? result.join(" و ") + " دينار جزائري" : "  ";
}

export function formattedAmount(amount: number): string {
  if (!amount || amount === 0) return "0.00";
  return amount.toLocaleString("ar-DZ") + ".00";
}
