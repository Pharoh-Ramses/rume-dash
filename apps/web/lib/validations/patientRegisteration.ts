// validations/patientRegistration.ts
import { z } from "zod";

export enum Sex {
    Male = "Male",
    Female = "Female",
    Other = "Other",
}

// Define the sub-schemas
const treatmentSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
});

const travelDetailsSchema = z.object({
    destination: z.string()
        .min(2, "Destination is required")
        .max(100, "Destination must not exceed 100 characters"),
    departureDate: z.date({
        required_error: "Departure date is required",
        invalid_type_error: "Invalid departure date",
    }),
    arrivalDate: z.date({
        required_error: "Arrival date is required",
        invalid_type_error: "Invalid arrival date",
    }),
    accommodation: z.string().optional(),
});

const consultationDetailsSchema = z.object({
    isRequested: z.boolean(),
    preferredTime: z.string().optional(),
    specialRequirements: z.string().optional(),
});

// Main form schema
export const patientFormSchema = z.object({
    firstName: z.string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must not exceed 50 characters"),

    lastName: z.string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must not exceed 50 characters"),

    email: z.string()
        .email("Invalid email address"),

    phone: z.string()
        .min(10, "Phone number must be at least 10 digits"),

    dob: z.date({
        required_error: "Date of birth is required",
        invalid_type_error: "Invalid date",
    }),

    sex: z.nativeEnum(Sex, {
        required_error: "Please select a sex",
    }),

    travelDetails: travelDetailsSchema,
    selectedTreatments: z.array(treatmentSchema).min(1, "Please select at least one treatment"),
    treatmentSelections: z.record(z.string(), z.boolean()).optional(),
    consultationDetails: consultationDetailsSchema,
});

// Export the inferred type
export type PatientRegistrationForm = z.infer<typeof patientFormSchema>;