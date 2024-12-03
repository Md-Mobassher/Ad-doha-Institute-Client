"use server";

import { FieldValues } from "react-hook-form";

export const registerStudent = async (values: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/create-student`,

    {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const studentInfo = await res.json();
  return studentInfo;
};
