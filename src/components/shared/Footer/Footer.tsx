import assets from "@/assets";
import DohaForm from "@/components/form/DohaForm";
import DohaInput from "@/components/form/DohaInput";
import DohaContainer from "@/components/ui/DohaContainer";
import Title from "@/components/ui/Title";
import { Call, Email, LocationCity, Map } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import NearMeIcon from "@mui/icons-material/NearMe";
import { FaArrowRight, FaFacebook, FaYoutube } from "react-icons/fa";
import SubTitle from "@/components/ui/SubTitle";
import CardSubTitle from "@/components/ui/CardSubTitle";

const Footer = () => {
  const handleSubscribe = async (value: FieldValues) => {
    console.log(value);
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
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          mb={4}
        >
          <Title title="সাবস্ক্রাইব করুন" />
          <SubTitle title="সর্বশেষ খবর বা আপডেট পেতে এখনই সাবস্ক্রাইব করুন" />
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between "
            alignItems="center"
            gap={2}
            className="lg:w-[500px] w-full  rounded-full border border-green-800 p-2 bg-white"
          >
            <input
              type="email"
              className=" px-6 border-0 focus:outline-none w-[80%]"
              name="email"
              placeholder="Your Email Address"
            />
            <Button
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
              সাবস্ক্রাইব
              <FaArrowRight className=" ml-2" />
            </Button>
          </Box>
        </Stack>
      </Container>
      <Divider />

      {/* footer 2 */}
      <Box sx={{ pt: "35px" }}>
        <Container>
          <Stack
            direction={{
              xl: "row",
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            }}
            justifyContent="space-between"
            alignItems="stretch"
            mb={4}
            gap={2}
          >
            {/* logo */}
            <Box sx={{ width: "100%", height: "100%" }}>
              <Link href="/">
                <Image
                  src={assets.logo.footerlogo}
                  width={250}
                  height={50}
                  alt="logo"
                />
              </Link>
              <Typography
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
              </Typography>
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
                যোগাযোগ
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
                <Email sx={{ mr: "8px" }} /> addohainstitution@gmail.com
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
                <Call sx={{ mr: "8px" }} /> +88 01916-016099
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
                <NearMeIcon sx={{ mr: "8px" }} /> ভিশন ভিলেজ, হাজি আউয়াল
                মার্কেট, ভাকুর্তা, সাভার, ঢাকা
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
                সরাসরি লিঙ্ক
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
                শর্তাবলী
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
                গোপনীয়তা নীতি
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
                সোশ্যাল মিডিয়া
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
          </Stack>
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
              স্বত্ব &copy; {new Date().getFullYear()} | আদ-দোহা ইনস্টিটিউট,
              সর্ব স্বত্ব সংরক্ষিত
            </Typography>
            <p>---</p>{" "}
            <Typography
              component="p"
              fontSize="16px"
              fontWeight={500}
              textAlign="center"
              color="secondary.main"
            >
              কারিগরি সহায়তায়{" "}
              <Link
                href="https://mobassher.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-[#FAE4BF]"
              >
                মোঃ মোবাশ্বের হোসেন
              </Link>
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
