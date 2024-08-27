export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/icons/check.svg",
  pending: "/icons/pending.svg",
  cancelled: "/icons/cancelled.svg",
};
