import districts from "@/data/district";
import divisions from "@/data/division";
import subDistricts from "@/data/sub-district";
import { IDistrict, IDivision, ISubDistrict } from "@/types/address";
import { useState, useMemo } from "react";

const useLocationSelect = () => {
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>("");

  const filteredDistricts: IDistrict[] = useMemo(() => {
    return Object.values(districts).filter(
      (district) => district.division_id === selectedDivision
    );
  }, [selectedDivision]);

  const filteredSubDistricts: ISubDistrict[] = useMemo(() => {
    return Object.values(subDistricts).filter(
      (subDistrict) => subDistrict.district_id === selectedDistrict
    );
  }, [selectedDistrict]);

  const selectedDivisionName = useMemo(() => {
    const division = Object.values(divisions).find(
      (div: IDivision) => div.id === selectedDivision
    );
    return division ? division.name : "";
  }, [selectedDivision]);

  const selectedDistrictName = useMemo(() => {
    const district = Object.values(districts).find(
      (dist: IDistrict) => dist.id === selectedDistrict
    );
    return district ? district.name : "";
  }, [selectedDistrict]);

  const selectedSubDistrictName = useMemo(() => {
    const subDistrict = Object.values(subDistricts).find(
      (subDist: ISubDistrict) => subDist.id === selectedSubDistrict
    );
    return subDistrict ? subDistrict.name : "";
  }, [selectedSubDistrict]);

  return {
    selectedDivision,
    setSelectedDivision,
    selectedDistrict,
    setSelectedDistrict,
    selectedSubDistrict,
    setSelectedSubDistrict,
    filteredDistricts,
    filteredSubDistricts,
    selectedDivisionName,
    selectedDistrictName,
    selectedSubDistrictName,
  };
};

export default useLocationSelect;
