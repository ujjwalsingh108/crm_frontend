import * as React from "react";
import Stack from "@mui/material/Stack";
import AuthStaticContent from "../../molecules/authentication/authStaticContent";
import SignUpCard from "@/components/organisms/authentication/signUpCard";

export default function SignUp() {
  return (
    <Stack
      direction={{ xs: "column-reverse", md: "row" }}
      sx={{
        justifyContent: "center",
        gap: { xs: 6, sm: 12 },
        p: { xs: 2, sm: 4 },
        m: "auto",
      }}
    >
      {/* <AuthStaticContent /> */}
      <SignUpCard />
    </Stack>
  );
}