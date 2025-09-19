"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Search } from "lucide-react";
import { genotypeMappings } from "@/utils/genotypeMapping";

type Patient = {
  idCard: string;
  firstName: string;
  lastName: string;
  sex: string;
  dob: string;
  nationality: string;
  phone: string;
  gene: string;
  genotype: string;
};

export default function PatientPage() {
  const [form, setForm] = useState<Patient>({
    idCard: "",
    firstName: "",
    lastName: "",
    sex: "Male",
    dob: "",
    nationality: "Thai",
    phone: "",
    gene: "",
    genotype: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchId, setSearchId] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searchResult, setSearchResult] = useState<Patient | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleNationalityChange = (value: string) => {
    setForm({ ...form, nationality: value === "Thai" ? "Thai" : "" });
    setFormErrors((prev) => ({ ...prev, nationality: "" }));
  };

  const handleSave = () => {
    const errors: Record<string, string> = {};
    if (form.idCard.length !== 13) errors.idCard = "ID Card is required (13 digits)";
    if (!form.firstName) errors.firstName = "First Name is required";
    if (!form.lastName) errors.lastName = "Last Name is required";
    if (!form.dob) errors.dob = "Date of Birth is required";
    if (!form.phone || form.phone.length < 9) errors.phone = "Phone is required";
    if (!form.gene) errors.gene = "Gene is required";
    if (!form.genotype) errors.genotype = "Genotype is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setPatients([...patients, form]);
    setForm({
      idCard: "",
      firstName: "",
      lastName: "",
      sex: "Male",
      dob: "",
      nationality: "Thai",
      phone: "",
      gene: "",
      genotype: "",
    });
    setFormErrors({});
  };

  const handleSearch = () => {
    const found = patients.find((p) => p.idCard === searchId);
    if (found) {
      setSearchResult(found);
      setSearchError("");
    } else {
      setSearchResult(null);
      setSearchError("Patient not found.");
    }
  };

  const calculateAge = (dob: string) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const today = new Date().toISOString().split("T")[0];

  const getPhenotype = (gene: string, genotype: string) => {
    const map = genotypeMappings[gene];
    if (!map) return "-";
    const found = map.find((m) => m.genotype === genotype);
    return found ? found.phenotype : "-";
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Patient Information</h1>
      <p className={styles.subtitle}>
        Fill in the patient’s demographic and genetic data
      </p>

      {/* Search */}
      <div className={styles.searchBox}>
        <Search className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search by ID Card (13 digits)"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value.replace(/\D/g, ""));
            setSearchError(""); // ✅ clear error when typing
          }}
          maxLength={13}
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchError && (
        <p style={{ color: "red", marginTop: "-1rem", marginBottom: "1rem" }}>
          {searchError}
        </p>
      )}

      {/* Form */}
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>ID Card</label>
            <input
              type="text"
              name="idCard"
              value={form.idCard}
              onChange={(e) => {
                setForm({ ...form, idCard: e.target.value.replace(/\D/g, "") });
                setFormErrors((prev) => ({ ...prev, idCard: "" })); // ✅ clear error
              }}
              maxLength={13}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            {formErrors.idCard && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors.idCard}
              </p>
            )}
          </div>
          <div className={styles.field}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
            {formErrors.firstName && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors.firstName}
              </p>
            )}
          </div>
          <div className={styles.field}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
            {formErrors.lastName && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Sex</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  checked={form.sex === "Male"}
                  onChange={() => setForm({ ...form, sex: "Male" })}
                />
                Male
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  checked={form.sex === "Female"}
                  onChange={() => setForm({ ...form, sex: "Female" })}
                />
                Female
              </label>
            </div>
          </div>

          <div className={styles.field}>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              max={today}
              className={styles.dateInput}
            />
            {formErrors.dob && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors.dob}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={(e) => {
                setForm({ ...form, phone: e.target.value.replace(/\D/g, "") });
                setFormErrors((prev) => ({ ...prev, phone: "" }));
              }}
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            {formErrors.phone && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Nationality</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  checked={form.nationality === "Thai"}
                  onChange={() => handleNationalityChange("Thai")}
                />
                Thai
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  checked={form.nationality !== "Thai"}
                  onChange={() => handleNationalityChange("Other")}
                />
                Other
              </label>
              <input
                type="text"
                name="nationality"
                value={form.nationality !== "Thai" ? form.nationality : ""}
                onChange={handleChange}
                placeholder="Please specify"
                className={styles.otherInput}
                style={{
                  visibility: form.nationality !== "Thai" ? "visible" : "hidden",
                }}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Gene</label>
            <select
              name="gene"
              value={form.gene}
              onChange={(e) =>
                setForm({ ...form, gene: e.target.value, genotype: "" })
              }
            >
              <option value="">Select...</option>
              {Object.keys(genotypeMappings).map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {formErrors.gene && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors.gene}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label>Genotype</label>
            <select
              name="genotype"
              value={form.genotype}
              onChange={handleChange}
              disabled={!form.gene}
            >
              <option value="">Select...</option>
              {form.gene &&
                genotypeMappings[form.gene].map((m) => (
                  <option key={m.genotype} value={m.genotype}>
                    {m.genotype}
                  </option>
                ))}
            </select>
            {formErrors.genotype && (
              <p style={{ color: "red", fontSize: "0.8rem" }}>
                {formErrors.genotype}
              </p>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>

      {/* Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID Card</th>
            <th>Name</th>
            <th>Sex</th>
            <th>DOB</th>
            <th>Age</th>
            <th>Nationality</th>
            <th>Phone</th>
            <th>Gene</th>
            <th>Genotype</th>
            <th>Phenotype</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, i) => (
            <tr key={i}>
              <td>{p.idCard}</td>
              <td>
                {p.firstName} {p.lastName}
              </td>
              <td>{p.sex}</td>
              <td>{p.dob}</td>
              <td>{calculateAge(p.dob)}</td>
              <td>{p.nationality}</td>
              <td>{p.phone}</td>
              <td>{p.gene}</td>
              <td>{p.genotype}</td>
              <td>{getPhenotype(p.gene, p.genotype)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
