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
import { FaFacebook, FaYoutube } from "react-icons/fa";

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
          <Typography
            component="h3"
            sx={{
              fontSize: {
                lg: "18px",
                md: "17px",
                sm: "16px",
                xs: "15px",
              },
              textAlign: "center",
              pt: "10px",
              fontWeight: "600",
              color: "warning.main",
            }}
          >
            সর্বশেষ খবর বা আপডেট পেতে এখনই সাবস্ক্রাইব করুন
          </Typography>
          {/* <DohaForm onSubmit={handleSubscribe}>
            <DohaInput type="email" name="subscribe" required />
          </DohaForm> */}
          <Box mt={2}>
            <input
              type="email"
              className="border border-green-800 rounded-full p-3 lg:w-[500px] w-full"
              name="email"
              placeholder="Your Email Address"
            />
            <Button className="rounded-full">সাবস্ক্রাইব</Button>
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
                  src={assets.logo.headerlogo}
                  width={250}
                  height={50}
                  alt="logo"
                />
              </Link>
              <Typography
                component="h4"
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
                sx={{
                  borderLeft: {
                    xl: "3px solid green",
                    lg: "3px solid green",
                    md: "3px solid green",
                    sm: "0px solid green",
                    xs: "0px solid green",
                  },
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
                <Email sx={{ mr: "8px" }} /> addohainstitution@gmail.com
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
                sx={{
                  borderLeft: {
                    xl: "3px solid green",
                    lg: "3px solid green",
                    md: "3px solid green",
                    sm: "0px solid green",
                    xs: "0px solid green",
                  },
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
                  fontWeight: "500",
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
                  fontWeight: "500",
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
                sx={{
                  borderLeft: {
                    xl: "3px solid green",
                    lg: "3px solid green",
                    md: "3px solid green",
                    sm: "0px solid green",
                    xs: "0px solid green",
                  },
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
                    fontWeight: "500",
                    color: "primary.main",
                  }}
                >
                  <FaFacebook className="size-10" />
                  {/* <Image
                    src={assets.icons.call}
                    alt="facebook"
                    width={60}
                    height={60}
                  /> */}
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
                    fontWeight: "500",
                    color: "primary.main",
                  }}
                >
                  <FaYoutube className="size-10" />
                  {/* <Image
                    src={assets.icons.call}
                    alt="facebook"
                    width={60}
                    height={60}
                  /> */}
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
            alignItems="stretch"
            gap={2}
          >
            <p className="text-center">
              স্বত্ব &copy; {new Date().getFullYear()} | আদ-দোহা ইনস্টিটিউট,
              সর্ব স্বত্ব সংরক্ষিত
            </p>
            <p>---</p>
            <p className="text-center">
              কারিগরি সহায়তায়{" "}
              <Link
                href="https://dev-mobassher.web.app"
                target="_blank"
                rel="noreferrer"
                className="text-green-500"
              >
                মোঃ মোবাশ্বের হোসেন
              </Link>
            </p>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
