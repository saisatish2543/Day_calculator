const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");

app.use(cors());
app.use(bodyparser.json());
app.get("/hareesh", (req, res) => {
  res.send("hello");
});

const jan = 0;
const feb = 3;
const mar = 3;
const apr = 6;
const may = 1;
const jun = 4;
const jul = 6;
const aug = 2;
const sep = 5;
const oct = 0;
const nov = 3;
const dec = 5;

function getMonth(mon) {
  switch (mon) {
    case 1:
      return jan;
    case 2:
      return feb;
    case 3:
      return mar;
    case 4:
      return apr;
    case 5:
      return may;
    case 6:
      return jun;
    case 7:
      return jul;
    case 8:
      return aug;
    case 9:
      return sep;
    case 10:
      return oct;
    case 11:
      return nov;
    case 12:
      return dec;
  }
}

function getLeap(l) {
  return l % 4 === 0 && (l % 400 === 0 || l % 100 !== 0);
}

function numberOfLeapYears(lp) {
  if (lp % 4 === 0 && lp % 100 === 0 && lp % 400 === 0) {
    return 25;
  } else if (lp % 4 === 0 && lp % 100 === 0 && lp % 400 !== 0) {
    return 24;
  } else {
    lp = lp % 100;
    return lp <= 3 ? 0 : Math.floor(lp / 4);
  }
}

function printDay(r) {
  switch (r) {
    case 0:
      return "SUNDAY";
      break;
    case 1:
      return "MONDAY";
      break;
    case 2:
      return "TUESDAY";
      break;
    case 3:
      return "WEDNESDAY";
      break;
    case 4:
      return "THURSDAY";
      break;
    case 5:
      return "FRIDAY";
      break;
    case 6:
      return "SATURDAY";
      break;
  }
}

app.post("/findday", (req, res) => {
    const { day: d, month: m, year: y, century } = req.body;
  
    console.log("Received values:", { d, m, y, century });
    
    if (d === undefined || m === undefined || y === undefined || century === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    const day = parseInt(d, 10);
    const month = parseInt(m, 10);
    const year = parseInt(y, 10);

    const leap = getLeap(year);
    if (day === 31 && (month === 4 || month === 6 || month === 9 || month === 11)) {
      return res.status(400).json({ error: "Invalid date!" });
    }
    if (day > 29 && month === 2) {
      return res.status(400).json({ error: "Invalid date!" });
    }
    if (day === 29 && month === 2 && !leap) {
      return res.status(400).json({ error: "Invalid date!" });
    }
    const mc = getMonth(month);
    const leapYears = numberOfLeapYears(year);
    let yRemainder = year % 100;
    if (yRemainder === 0) yRemainder = 100;
    const centuryOffsets = {
      21: 6,
      25: 6,
      18: 4,
      22: 4,
      19: 2,
      23: 2,
      20: 0,
      24: 0,
    };
  
    const offset = centuryOffsets[century];
    if (offset === undefined) {
      return res.status(400).json({ error: "Invalid century!" });
    }
    let days;
    if (leap) {
      days = day + mc + yRemainder + offset + leapYears - (month > 2 ? 0 : 1);
    } else {
      days = day + mc + yRemainder + offset + leapYears;
    }
  
    let ans = days % 7;
    const result = printDay(ans);
  
    if (!result) {
      return res.status(500).json({ error: "Error calculating day of the week" });
    }
  
    console.log("Calculated day of the week:", result);
    res.status(200).json({ data: result });
  });
  

const port = 8000;
app.listen(port, () => {
  console.log(`server started on the port ${port}`);
});
