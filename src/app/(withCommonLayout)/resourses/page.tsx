import PageTitle from "@/components/ui/PageTitle";
import Link from "next/link";
import { IoBookSharp } from "react-icons/io5";
import { IoMdVideocam } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import { Box, Container, Divider, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const ResourcesPage = () => {
  return (
    <>
      <PageTitle title="রিসোর্স" />

      <Container>
        <Box className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-7 md:gap-6 gap-5 py-10">
          <Box
            sx={{
              borderRadius: "10px",
              border: "1px solid lightgray",
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              boxShadow: "5 2 1",
              ":hover": {
                border: "1px solid #22C55E",
              },
              p: "16px",
            }}
            component={Link}
            href="/resourses/books"
          >
            <Box
              sx={{
                width: "100%",
                height: 300,
                "& img": {
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  objectFit: "cover",
                  borderBottom: "1px solid lightgray",
                  borderTopRadius: "10px",
                  pb: 2,
                },
              }}
            >
              <Image
                src={assets.resourse.book}
                alt="gallery image"
                width={400}
                height={400}
              />
            </Box>

            <Typography
              component="h2"
              sx={{
                mt: "16px",
                fontSize: "24px",
                fontWeight: "700",
                color: "primary.main",
                textAlign: "center",
              }}
            >
              বই
            </Typography>
          </Box>
          <Box
            sx={{
              borderRadius: "10px",
              border: "1px solid lightgray",
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              boxShadow: "5 2 1",
              ":hover": {
                border: "1px solid #22C55E",
              },
              p: "16px",
            }}
            component={Link}
            href="/resourses/videos"
          >
            <Box
              sx={{
                width: "100%",
                height: 300,
                "& img": {
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  objectFit: "cover",
                  borderBottom: "1px solid lightgray",
                  borderTopRadius: "10px",
                  pb: 2,
                },
              }}
            >
              <Image
                src={assets.resourse.video}
                alt="gallery image"
                width={400}
                height={400}
              />
            </Box>

            <Typography
              component="h2"
              sx={{
                mt: "16px",
                fontSize: "24px",
                fontWeight: "700",
                color: "primary.main",
                textAlign: "center",
              }}
            >
              ভিডিও
            </Typography>
          </Box>
          <Box
            sx={{
              borderRadius: "10px",
              border: "1px solid lightgray",
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              boxShadow: "5 2 1",
              ":hover": {
                border: "1px solid #22C55E",
              },
              p: "16px",
            }}
            component={Link}
            href="/resourses/gallery"
          >
            {" "}
            <Box
              sx={{
                width: "100%",
                height: 300,
                "& img": {
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  objectFit: "cover",
                  borderBottom: "1px solid lightgray",
                  borderTopRadius: "10px",
                  pb: 2,
                },
              }}
            >
              <Image
                src={assets.resourse.gallery}
                alt="gallery image"
                width={400}
                height={400}
              />
            </Box>
            <Typography
              component="h2"
              sx={{
                mt: "16px",
                fontSize: "24px",
                fontWeight: "700",
                color: "primary.main",
                textAlign: "center",
              }}
            >
              গ্যালারী
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ResourcesPage;
