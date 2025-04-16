"use client";
import footerlogo from "@/assets/logo/footer_logo.png";
import Title from "@/components/ui/Title";
import { Call, Email } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import NearMeIcon from "@mui/icons-material/NearMe";
import { FaArrowRight, FaFacebook, FaYoutube } from "react-icons/fa";
import SubTitle from "@/components/ui/SubTitle";
import { useTranslations } from "next-intl";
import { useCreateSubscribeMutation } from "@/redux/features/admin/subscribeManagementApi";
import { toast } from "sonner";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const t = useTranslations("Footer");

  const [createSubscribe, { isLoading }] = useCreateSubscribeMutation();

  const handleSubscribe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const data = {
      email: email,
    };

    try {
      const result = await createSubscribe(data).unwrap();
      if (result?.success) {
        toast.success(result?.message || "Successfully subscribed!");
        setEmail("");
      } else {
        setEmail("");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!");
      setEmail("");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "info.main",
      }}
    >
      {/* footer 1 */}
      <Container
        sx={{
          pb: "5px",
          pt: "30px",
          mx: "auto",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          mb={4}
        >
          <Title title={t("title")} />
          <SubTitle title={t("subTitle")} />

          <Box
            mt={2}
            display="flex"
            justifyContent="space-between "
            alignItems="center"
            gap={2}
            className="lg:w-[500px] md:w-[400px] w-full  rounded-full border border-green-800 p-2 bg-white"
          >
            <input
              type="email"
              className=" px-6 border-0 focus:outline-none w-[80%]"
              name="email"
              value={email}
              placeholder={t("inputPlaceholder")}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-between gap-6">
              {isLoading ? (
                <Button
                  onClick={handleSubscribe}
                  disabled
                  sx={{
                    borderRadius: "50px",
                    backgroundColor: "primary.main",
                    color: "secondary.main",
                    border: "2px solid #0F473C",
                    px: "16px",
                    py: "5px",
                    textSizeAdjust: "auto",
                    ":hover": {
                      backgroundColor: "primary.main",
                      color: "secondary.main",
                    },
                    fontSize: {
                      lg: "16px",
                      md: "16px",
                      sm: "16px",
                      xs: "15px",
                    },
                    fontWeight: 600,
                  }}
                >
                  {t("btnTitle")} <CircularProgress />;
                </Button>
              ) : (
                <Button
                  onClick={handleSubscribe}
                  sx={{
                    borderRadius: "50px",
                    backgroundColor: "primary.main",
                    color: "secondary.main",
                    border: "2px solid #0F473C",
                    px: "16px",
                    py: "5px",
                    textSizeAdjust: "auto",
                    ":hover": {
                      backgroundColor: "primary.main",
                      color: "secondary.main",
                    },
                    fontSize: {
                      lg: "16px",
                      md: "16px",
                      sm: "16px",
                      xs: "15px",
                    },
                    fontWeight: 600,
                  }}
                >
                  {t("btnTitle")}
                  <FaArrowRight className=" ml-2" />
                </Button>
              )}
            </div>
          </Box>
        </Stack>
      </Container>
      <Divider />

      {/* footer 2 */}
      <Box sx={{ pt: "30px" }}>
        <Container>
          <Box
            display={"grid"}
            gridTemplateColumns={{
              lg: "1fr 1fr 1fr 1fr",
              md: "1fr 1fr 1fr ",
              sm: "1fr 1fr",
              xs: "1fr",
            }}
            mb={2}
            gap={2}
            px={{
              xl: "0px",
              lg: "40px",
              md: "20px",
              sm: "14px",
              xs: "0px",
            }}
          >
            {/* logo */}
            <Box sx={{ width: "100%", height: "100%" }}>
              <Link href="/">
                <Image src={footerlogo} width={250} height={50} alt="logo" />
              </Link>
              {/* <Typography
                component="p"
                sx={{
                  fontSize: {
                    lg: "16px",
                    md: "16px",
                    sm: "16px",
                    xs: "15px",
                  },
                  textAlign: "center",
                  pt: "10px",
                  fontWeight: "500",
                  color: "primary.main",
                }}
              >
                একটি দাওয়াহ শিক্ষা ও সেবামুলক প্রতিষ্ঠান
              </Typography> */}
            </Box>

            {/* contact */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderLeft: {
                  xl: "1px solid green",
                  lg: "1px solid green",
                  md: "1px solid green",
                  sm: "0px solid green",
                  xs: "0px solid green",
                },
                pl: "15px",
              }}
            >
              <Typography
                component="h3"
                variant="h3"
                sx={{
                  borderLeft: "3px solid green",
                  pl: "15px",
                  fontSize: {
                    lg: "24px",
                    md: "23px",
                    sm: "22px",
                    xs: "20px",
                  },
                  textAlign: "start",
                  fontWeight: "600",
                  color: "primary.main",
                }}
              >
                {t("contact.title")}
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                sx={{
                  fontSize: {
                    lg: "16px",
                    md: "16px",
                    sm: "16px",
                    xs: "15px",
                  },
                  display: "flex",
                  pt: { lg: "16px", md: "16px", sm: "10", xs: "8px" },
                  fontWeight: "500",
                  color: "primary.main",
                }}
              >
                <Email sx={{ mr: "8px" }} /> {t("contact.email")}
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                sx={{
                  fontSize: {
                    lg: "16px",
                    md: "16px",
                    sm: "16px",
                    xs: "15px",
                  },
                  display: "flex",
                  pt: { lg: "16px", md: "16px", sm: "10", xs: "8px" },
                  fontWeight: "500",
                  color: "primary.main",
                }}
              >
                <Call sx={{ mr: "8px" }} /> {t("contact.phone")}
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontSize: {
                    lg: "16px",
                    md: "16px",
                    sm: "16px",
                    xs: "15px",
                  },
                  display: "flex",
                  pt: { lg: "16px", md: "16px", sm: "10", xs: "8px" },
                  fontWeight: "500",
                  color: "primary.main",
                }}
              >
                <NearMeIcon sx={{ mr: "8px" }} /> {t("contact.address")}
              </Typography>
            </Box>

            {/* link */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderLeft: {
                  xl: "1px solid green",
                  lg: "1px solid green",
                  md: "1px solid green",
                  sm: "0px solid green",
                  xs: "0px solid green",
                },
                pl: "15px",
              }}
            >
              <Typography
                component="h3"
                variant="h3"
                sx={{
                  borderLeft: "3px solid green",
                  pl: "15px",
                  fontSize: {
                    lg: "24px",
                    md: "23px",
                    sm: "22px",
                    xs: "20px",
                  },
                  textAlign: "start",
                  fontWeight: "600",
                  color: "primary.main",
                }}
              >
                {t("link.title")}
              </Typography>
              <Typography
                component="a"
                href="/"
                sx={{
                  fontSize: {
                    lg: "16px",
                    md: "16px",
                    sm: "16px",
                    xs: "15px",
                  },
                  display: "flex",
                  pt: { lg: "16px", md: "16px", sm: "10", xs: "8px" },
                  color: "primary.main",
                }}
              >
                {t("link.link1")}
              </Typography>
              <Typography
                component="a"
                href="/"
                sx={{
                  fontSize: {
                    lg: "16px",
                    md: "16px",
                    sm: "16px",
                    xs: "15px",
                  },
                  display: "flex",
                  pt: { lg: "16px", md: "16px", sm: "10", xs: "8px" },
                  color: "primary.main",
                }}
              >
                {t("link.link2")}
              </Typography>
            </Box>

            {/* social */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderLeft: {
                  xl: "1px solid green",
                  lg: "1px solid green",
                  md: "1px solid green",
                  sm: "0px solid green",
                  xs: "0px solid green",
                },
                pl: "15px",
              }}
            >
              <Typography
                component="h3"
                variant="h3"
                sx={{
                  borderLeft: "3px solid green",
                  pl: "15px",
                  fontSize: {
                    lg: "24px",
                    md: "23px",
                    sm: "22px",
                    xs: "20px",
                  },
                  textAlign: "start",

                  fontWeight: "600",
                  color: "primary.main",
                }}
              >
                {t("social.title")}
              </Typography>
              <Stack direction="row" gap="16px">
                <Typography
                  component="a"
                  target="_blank"
                  href="https://www.facebook.com/addoha.org"
                  sx={{
                    fontSize: {
                      lg: "16px",
                      md: "16px",
                      sm: "16px",
                      xs: "15px",
                    },
                    display: "flex",
                    pt: { lg: "16px", md: "16px", sm: "10", xs: "8px" },
                    fontWeight: "500",
                    color: "primary.main",
                  }}
                >
                  <FaFacebook className="size-9 hover:scale-125 transition-all duration-300" />
                </Typography>
                <Typography
                  component="a"
                  target="_blank"
                  href="https://www.youtube.com/channel/UC6m__rWQY4zybxI3r14mPVg"
                  sx={{
                    fontSize: {
                      lg: "16px",
                      md: "16px",
                      sm: "16px",
                      xs: "15px",
                    },
                    display: "flex",
                    pt: { lg: "16px", md: "16px", sm: "10", xs: "8px" },
                    fontWeight: "500",
                    color: "primary.main",
                  }}
                >
                  <FaYoutube className="size-9 hover:scale-125 transition-all duration-300" />
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* footer - 3  */}
      <Box sx={{ backgroundColor: "primary.main", color: "#FFF ", py: "5px" }}>
        <Container>
          <Stack
            direction={{
              xl: "row",
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            }}
            justifyContent="center"
            alignItems="center"
            gap={{
              lg: 2,
              md: 2,
              sm: "0px",
              xs: "0px",
            }}
          >
            {" "}
            <Typography
              component="p"
              fontSize="16px"
              fontWeight={500}
              textAlign="center"
              color="secondary.main"
            >
              {t("copyright.title")} &copy; {new Date().getFullYear()}{" "}
              {t("copyright.title2")}
            </Typography>
            <p>---</p>{" "}
            <Typography
              component="p"
              fontSize="16px"
              fontWeight={500}
              textAlign="center"
              color="secondary.main"
            >
              {t("copyright.assistance")}{" "}
              <Link
                href="https://mobassher.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-[#FAE4BF]"
              >
                {" "}
                {t("copyright.name")}
              </Link>
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
