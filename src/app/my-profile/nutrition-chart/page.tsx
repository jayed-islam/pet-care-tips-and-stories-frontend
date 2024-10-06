"use client";

import React, { useState } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  Button,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

// Define a type for the nutrition data items
interface NutritionItem {
  label: string;
  value: string;
}

// Nutrition Calculator Component
const NutritionCalculator: React.FC = () => {
  const [age, setAge] = useState<number | string>("");
  const [weight, setWeight] = useState<number | string>("");
  const [petSize, setPetSize] = useState<string>("small"); // Added state for pet size
  const [nutritionData, setNutritionData] = useState<NutritionItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleCalculateNutrition = () => {
    if (typeof age === "string" || typeof weight === "string") {
      // Ensure that age and weight are numbers
      const ageNum = parseFloat(age as string);
      const weightNum = parseFloat(weight as string);
      if (!isNaN(ageNum) && !isNaN(weightNum)) {
        const calculatedData = calculateNutritionNeeds(
          ageNum,
          weightNum,
          petSize
        );
        setNutritionData(calculatedData);
        setOpen(true); // Open the modal to show nutrition data
      }
    }
  };

  const calculateNutritionNeeds = (
    age: number,
    weight: number,
    size: string
  ): NutritionItem[] => {
    let calorieFactor: number;
    let proteinFactor: number;
    let fatFactor: number;
    let fiberFactor: number;

    // Calculate factors based on pet size
    switch (size) {
      case "small":
        calorieFactor = weight * 40; // Example factor for small pets
        proteinFactor = weight * 2.5; // Example factor for small pets
        fatFactor = weight * 2; // Example factor for small pets
        fiberFactor = weight * 0.5; // Example factor for small pets
        break;
      case "medium":
        calorieFactor = weight * 30; // Example factor for medium pets
        proteinFactor = weight * 2; // Example factor for medium pets
        fatFactor = weight * 1.5; // Example factor for medium pets
        fiberFactor = weight * 0.5; // Example factor for medium pets
        break;
      case "large":
        calorieFactor = weight * 20; // Example factor for large pets
        proteinFactor = weight * 1.5; // Example factor for large pets
        fatFactor = weight * 1; // Example factor for large pets
        fiberFactor = weight * 0.3; // Example factor for large pets
        break;
      default:
        calorieFactor = 0;
        proteinFactor = 0;
        fatFactor = 0;
        fiberFactor = 0;
    }

    return [
      { label: "Calories", value: `${calorieFactor.toFixed(2)} kcal` },
      { label: "Protein", value: `${proteinFactor.toFixed(2)} g` },
      { label: "Fat", value: `${fatFactor.toFixed(2)} g` },
      { label: "Fiber", value: `${fiberFactor.toFixed(2)} g` },
    ];
  };

  const NutritionDocument = () => (
    <Document>
      <Page size="A4" style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>
          Nutrition Needs for Your Pet
        </Text>
        <Text>Age: {age} years</Text>
        <Text>Weight: {weight} kg</Text>
        <Text>
          Pet Size: {petSize.charAt(0).toUpperCase() + petSize.slice(1)}
        </Text>
        <Text style={{ marginTop: 20 }}>
          Recommended Daily Nutritional Values:
        </Text>
        {nutritionData.map((item, index) => (
          <Text key={index}>{`${item.label}: ${item.value}`}</Text>
        ))}
        <Text style={{ marginTop: 20, fontStyle: "italic" }}>
          Note: These values are based on general guidelines and may vary based
          on individual pet needs.
        </Text>
      </Page>
    </Document>
  );

  return (
    <div>
      <h2>Nutrition Calculator</h2>
      <label>
        Age (in years):
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <label>
        Weight (in kg):
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </label>

      {/* Pet Size Selection */}
      <FormControl variant="outlined" style={{ marginTop: 16, width: 200 }}>
        <InputLabel id="pet-size-label">Pet Size</InputLabel>
        <Select
          labelId="pet-size-label"
          value={petSize}
          onChange={(e) => setPetSize(e.target.value)}
          label="Pet Size"
        >
          <MenuItem value="small">Small</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="large">Large</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleCalculateNutrition}
        style={{ marginTop: 16 }}
      >
        Calculate Nutrition
      </Button>

      {/* Modal for displaying nutrition data */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="nutrition-data-title"
        aria-describedby="nutrition-data-description"
      >
        <div
          style={{
            padding: 20,
            backgroundColor: "white",
            margin: "100px auto",
            width: "400px",
            borderRadius: "8px",
          }}
        >
          <h3 id="nutrition-data-title">Nutrition Data</h3>
          <p id="nutrition-data-description">
            Review the nutrition needs for your pet:
          </p>

          {/* Displaying Nutrition Data */}
          <div>
            <strong>Age:</strong> {age} years
            <br />
            <strong>Weight:</strong> {weight} kg
            <br />
            <strong>Pet Size:</strong>{" "}
            {petSize.charAt(0).toUpperCase() + petSize.slice(1)}
            <br />
            <h4>Recommended Daily Nutritional Values:</h4>
            {nutritionData.map((item, index) => (
              <p key={index}>{`${item.label}: ${item.value}`}</p>
            ))}
          </div>

          {/* PDF Download Link */}
          <PDFDownloadLink
            document={<NutritionDocument />}
            fileName="pet-nutrition-needs.pdf"
            style={{ textDecoration: "none", marginTop: 20 }}
          >
            {({ loading }) => (
              <Button variant="contained" disabled={loading}>
                {loading ? "Generating PDF..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>

          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            style={{ marginTop: 16 }}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NutritionCalculator;
