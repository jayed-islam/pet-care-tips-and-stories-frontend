/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import {
  Button,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Typography,
} from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider, { RHFTextField } from "@/components/react-hook-form";

interface NutritionItem {
  label: string;
  value: string;
}

export const nutritionSchema = z.object({
  age: z.string({ required_error: "Age is required" }),
  weight: z.string({ required_error: "Weight is required" }),
});

// Nutrition Calculator Component
const NutritionCalculator: React.FC = () => {
  const [age, setAge] = useState<number | string>("");
  const [weight, setWeight] = useState<number | string>("");
  const [petSize, setPetSize] = useState<string>("small");
  const [nutritionData, setNutritionData] = useState<NutritionItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const methods = useForm({
    resolver: zodResolver(nutritionSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  console.log("ee", errors);

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
        calorieFactor = weight * 40;
        proteinFactor = weight * 2.5;
        fatFactor = weight * 2;
        fiberFactor = weight * 0.5;
        break;
      case "medium":
        calorieFactor = weight * 30;
        proteinFactor = weight * 2;
        fatFactor = weight * 1.5;
        fiberFactor = weight * 0.5;
        break;
      case "large":
        calorieFactor = weight * 20;
        proteinFactor = weight * 1.5;
        fatFactor = weight * 1;
        fiberFactor = weight * 0.3;
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

  const onSubmit = handleSubmit(async (data) => {
    console.log("data", data);
    try {
      const ageNum = parseFloat(data.age);
      const weightNum = parseFloat(data.weight);

      if (!isNaN(ageNum) && !isNaN(weightNum)) {
        // Set state for age and weight first
        setAge(data.age);
        setWeight(data.weight);

        // Now calculate nutrition data
        const calculatedData = calculateNutritionNeeds(
          ageNum,
          weightNum,
          petSize
        );

        // Set nutrition data and then open the modal
        setNutritionData(calculatedData);
        setOpen(true);
      }
    } catch (error: any) {
      console.error("Error during form submission", error);
    }
  });

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
    <div className="bg-white w-full p-5">
      <div>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <div className="w-full md:w-[20rem] mx-auto flex flex-col gap-3">
            <Typography variant="h4" align="center" gutterBottom>
              Nutrition Calculator
            </Typography>
            <RHFTextField name="age" label="Age (in years)" />
            <RHFTextField name="weight" label="Weight (in kg)" />

            <FormControl fullWidth variant="outlined">
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
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 2, textTransform: "capitalize" }}
            >
              Calculate Nutrition
            </Button>
          </div>
        </FormProvider>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: 4,
              width: { xs: "90%", sm: 400 },
              borderRadius: "8px",
            }}
          >
            <Typography variant="h5" id="nutrition-data-title" gutterBottom>
              Nutrition Data
            </Typography>
            <Typography variant="body1" id="nutrition-data-description">
              Review the nutrition needs for your pet:
            </Typography>
            <Typography>
              <strong>Age:</strong> {age} years
            </Typography>
            <Typography>
              <strong>Weight:</strong> {weight} kg
            </Typography>
            <Typography>
              <strong>Pet Size:</strong>{" "}
              {petSize.charAt(0).toUpperCase() + petSize.slice(1)}
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Recommended Daily Nutritional Values:
            </Typography>
            {nutritionData.length ? (
              nutritionData.map((item, index) => (
                <Typography key={index}>
                  {`${item.label}: ${item.value}`}
                </Typography>
              ))
            ) : (
              <Typography>No data available</Typography>
            )}

            {/* PDF Download Link */}
            <PDFDownloadLink
              document={<NutritionDocument />}
              fileName="pet-nutrition-needs.pdf"
              style={{ textDecoration: "none", marginTop: 20 }}
            >
              <Button variant="contained" fullWidth sx={{ marginTop: 2 }}>
                Download PDF
              </Button>
            </PDFDownloadLink>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => setOpen(false)}
              sx={{ marginTop: 2 }}
            >
              Close
            </Button>
          </Paper>
        </Modal>
      </div>
    </div>
  );
};

export default NutritionCalculator;
