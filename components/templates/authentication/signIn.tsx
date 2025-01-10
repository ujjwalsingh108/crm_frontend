import * as React from "react";
import Stack from "@mui/material/Stack";
import AuthStaticContent from "../../molecules/authentication/authStaticContent";
import SignInCard from "@/components/organisms/authentication/signInCard";

export default function SignIn() {
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
      <AuthStaticContent />
      <SignInCard />
    </Stack>
  );
}
