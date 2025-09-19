// src/utils/genotypeMapping.ts
export type MappingRow = {
  genotype: string;
  phenotype: string;
};

export type MappingTable = Record<string, MappingRow[]>;

export const genotypeMappings: MappingTable = {
  CYP2D6: [
    { genotype: "*1/*1", phenotype: "Normal Metabolizer (NM)" },
    { genotype: "*1/*4", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*1/*5", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*1/*10", phenotype: "Normal Metabolizer (NM)" },
    { genotype: "*1/*41", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*4/*4", phenotype: "Poor Metabolizer (PM)" },
    { genotype: "*4/*5", phenotype: "Poor Metabolizer (PM)" },
    { genotype: "*4/*10", phenotype: "Poor Metabolizer (PM)" },
    { genotype: "*4/*41", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*5/*5", phenotype: "Poor Metabolizer (PM)" },
    { genotype: "*5/*10", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*5/*41", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*10/*10", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*10/*41", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*41/*41", phenotype: "Intermediate Metabolizer (IM)" },
  ],
  CYP2C9: [
    { genotype: "*1/*1", phenotype: "Normal Metabolizer (NM)" },
    { genotype: "*1/*2", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*1/*3", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*2/*3", phenotype: "Poor Metabolizer (PM)" },
    { genotype: "*2/*2", phenotype: "Poor Metabolizer (PM)" },
    { genotype: "*3/*3", phenotype: "Poor Metabolizer (PM)" },
  ],
  VKORC1: [
    { genotype: "BB", phenotype: "Coumadin insensitivity" },
    { genotype: "AB", phenotype: "Intermediate coumadin sensitivity" },
    { genotype: "AA", phenotype: "Coumadin sensitivity" },
  ],
  TPMT: [
    { genotype: "*1/*1", phenotype: "Normal Metabolizer" },
    { genotype: "*1/*3C", phenotype: "Intermediate Metabolizer" },
    { genotype: "*3C/*3C", phenotype: "Poor Metabolizer" },
  ],
  CYP3A5: [
    { genotype: "*1/*1", phenotype: "Normal metabolizer (expresser)" },
    { genotype: "*1/*3", phenotype: "Intermediate metabolizer (expresser)" },
    { genotype: "*3/*3", phenotype: "Poor metabolizer (nonexpresser)" },
  ],
  CYP2C19: [
    { genotype: "*1/*1", phenotype: "Normal Metabolizer (NM)" },
    { genotype: "*1/*2", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*1/*3", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*1/*17", phenotype: "Ultrarapid Metabolizer (UM)" },
    { genotype: "*2/*2", phenotype: "Poor Metabolizer (PM)" },
    { genotype: "*2/*3", phenotype: "Poor Metabolizer (PM)" },
    { genotype: "*2/*17", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*3/*3", phenotype: "Poor Metabolizer (PM)" },
    { genotype: "*3/*17", phenotype: "Intermediate Metabolizer (IM)" },
    { genotype: "*17/*17", phenotype: "Ultrarapid Metabolizer (UM)" },
  ],
};
