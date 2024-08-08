"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import { Box, Button, Hidden, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  const userInfo = useUserInfo();
  // console.log(userInfo);

  const handleLogOut = () => {
    logoutUser(router);
  };

  const handleNavigate = (link: string) => {
    router.push(`/${link}`);
  };

  return (
    <Box>
      <Typography
        component={Button}
        sx={{
          boxShadow: "none",
          fontSize: "15px",
          fontWeight: 500,
          px: "14px",
          color: "secondary.main",
          ":hover": {
            backgroundColor: "secondary.main",
            color: "primary.main",
          },
        }}
        onClick={() => handleNavigate("donate")}
      >
        ডোনেট
      </Typography>

      <Hidden smDown>
        {userInfo?.userId ? (
          <Typography
            component={Button}
            sx={{
              backgroundColor: "",
              color: "secondary.main",
              boxShadow: "none",
              fontSize: "15px",
              fontWeight: 500,
              px: "10px",
              ":hover": {
                backgroundColor: "secondary.main",
                color: "primary.main",
              },
            }}
            onClick={() => handleNavigate("dashboard")}
          >
            ড্যাশবোর্ড
          </Typography>
        ) : null}

        {userInfo?.userId ? (
          <Typography
            component={Button}
            sx={{
              backgroundColor: "red",
              boxShadow: "none",
              color: "white",
              fontSize: "15px",
              fontWeight: 500,
              px: "12px",
              ":hover": {
                backgroundColor: "secondary.main",
                color: "primary.main",
              },
            }}
            onClick={() => handleLogOut()}
          >
            লগআউট
          </Typography>
        ) : (
          <Typography
            component={Button}
            sx={{
              boxShadow: "none",
              fontSize: "15px",
              fontWeight: 500,
              px: "14px",
              color: "secondary.main",
              ":hover": {
                backgroundColor: "secondary.main",
                color: "primary.main",
              },
            }}
            onClick={() => handleNavigate("login")}
          >
            লগইন
          </Typography>
        )}
      </Hidden>
    </Box>
  );
};

export default LoginButton;
