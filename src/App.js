import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  const [stickyNumbers, setStickyNumbers] = useState({
    number1: "",
    number2: "",
    number3: "",
    number4: "",
    number5: "",
    number6: "",
    number7: "",
    number8: "",
    number9: "",
    number10: "",
    number11: "",
    number12: "",
  });

  const validate = (number) => {
    if (number > 39) {
      return 39;
    } else if (number < 0) {
      return 0;
    }
    return number;
  };

  return (
    <>
      <Typography variant="h1">
        Master Lock Combination Cracking Tool
      </Typography>
      <Typography>
        A tool for generating possible combinations for Master lock combination
        locks.
      </Typography>
      <Typography>Enter the 12 sticky numbers, one per line.</Typography>{" "}
      <Button variant="outlined">How to Get Sticky Numbers</Button>
      <Typography>Sticky Numbers must be between 0 and 39</Typography>
      <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
        {Array(12)
          .fill(0)
          .map((i, v) => (
            <Grid item xs={4} sm={3} md={2}>
              <TextField
                id={`number${v + 1}`}
                name={`number${v + 1}`}
                label={`Number ${v + 1}`}
                variant="outlined"
                type="number"
                value={stickyNumbers[`number${v + 1}`]}
                min={0}
                max={39}
                inputProps={{ min: 0, max: 39 }}
                fullWidth
                onBlur={(event) => console.log(event.target.value)}
                onChange={(event) => {
                  let tempStickyNumbers = { ...stickyNumbers };
                  tempStickyNumbers[`number${v + 1}`] = validate(
                    event.target.value
                  );
                  setStickyNumbers(tempStickyNumbers);
                  console.log(event.target.value);
                }}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default App;
