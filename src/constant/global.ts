export const genders = ["Male", "Female", "Other"];
export const genderOptions = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const status = ["Pending", "In-Progress", "Blocked"];
export const statusOption = status.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const deleted = ["True", "False"];
export const deletedOption = deleted.map((item) => ({
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

export const courseStatus = ["UPCOMING", "ONGOING", "ENDED"];
export const courseStatusOptions = courseStatus.map((item) => ({
  value: item,
  label: item,
}));

export const enrolStatus = ["TRUE", "FALSE"];
export const enrolStatusOptions = enrolStatus.map((item) => ({
  value: item,
  label: item,
}));

export const paymentMethod = ["BKASH", "NAGAD", "CELLFINE"];
export const paymentMethodOptions = paymentMethod.map((item) => ({
  value: item,
  label: item,
}));

export const paymentStatus = ["PENDING", "COMPLETED", "FAILED"];
export const paymentStatusOptions = paymentStatus.map((item) => ({
  value: item,
  label: item,
}));
