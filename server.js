const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const inputData = req.body.data;
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialChars = [];
    let sum = 0;
    let lettersOnly = [];

    inputData.forEach(item => {
      const value = item.toString();

      if (/^\d+$/.test(value)) {
        const num = parseInt(value);
        sum += num;
        if (num % 2 === 0) {
          evenNumbers.push(value);
        } else {
          oddNumbers.push(value);
        }
      } else if (/^[a-zA-Z]+$/.test(value)) {
        alphabets.push(value.toUpperCase());
        lettersOnly.push(value);
      } else {
        specialChars.push(value);
      }
    });

    const reversedConcat = lettersOnly
      .join("")
      .split("")
      .reverse()
      .map((char, idx) => idx % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
      .join("");

    const response = {
      is_success: true,
      user_id: "aryan_jearth_07032004",
      email: "aryan1375.be22@chitkara.edu.in",
      roll_number: "2210991375",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: reversedConcat
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({
      is_success: false,
      message: "Invalid input data",
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
