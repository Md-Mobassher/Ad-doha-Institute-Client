export const genders = ["Male", "Female", "Other"];
export const genderOptions = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const BloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const BloodGroupOptions = BloodGroup.map((item) => ({
  value: item,
  label: item,
}));

export const Languages = ["Bangla", "Arabic", "English", "Urdu"];
export const LanguageOptions = Languages.map((item) => ({
  value: item,
  label: item,
}));

export const Formats = ["Paperback", "Hardcover", "Ebook"];
export const FormatOptions = Formats.map((item) => ({
  value: item,
  label: item,
}));
