"use client";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaTextArea from "@/components/form/DohaTextArea";
import { useCreateContactMutation } from "@/redux/features/admin/contactManagementApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
  name: z.string().nonempty("Please enter a Name!"),
  email: z.string().email("Please enter a valid email address!"),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  subject: z.string().min(6, "Please enter a Subject"),
  message: z.string().min(6, "Please enter a Message"),
});
const defaultValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const t = useTranslations("ContactPage");
  const [createContact, { isLoading }] = useCreateContactMutation();

  const handleContact = async (values: FieldValues) => {
    console.log(values);
    try {
      const result = await createContact(values).unwrap();
      //   console.log(result);
      if (result?.success) {
        toast.success(result?.message || "Your message has been submitted!!!");
      }
    } catch (err: any) {
      // console.error("login error", err);
      toast.error(err?.message);
    }
  };

  return (
    <DohaForm
      onSubmit={handleContact}
      resolver={zodResolver(validationSchema)}
      defaultValues={defaultValues}
    >
      <Grid container spacing={3}>
        <Grid item md={6} sm={12} xs={12}>
          <DohaInput
            name="name"
            label={t("contactForm.name")}
            type="text"
            fullWidth={true}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <DohaInput
            name="email"
            label={t("contactForm.email")}
            type="email"
            fullWidth={true}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <DohaInput
            name="phone"
            label={t("contactForm.phone")}
            type="text"
            fullWidth={true}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <DohaInput
            name="subject"
            label={t("contactForm.subject")}
            type="text"
            fullWidth={true}
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <DohaTextArea
            name="message"
            label={t("contactForm.message")}
            fullWidth={true}
          />
        </Grid>
      </Grid>

      <div className="flex justify-between gap-6 mt-5">
        {isLoading ? (
          <Button
            fullWidth
            disabled
            sx={{
              margin: "10px 0px",
            }}
          >
            <CircularProgress />;
          </Button>
        ) : (
          <Button
            fullWidth
            sx={{
              margin: "10px 0px",
            }}
            type="submit"
          >
            {t("contactForm.button")}
          </Button>
        )}
      </div>
    </DohaForm>
  );
};

export default ContactForm;
