import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

// Custom Icon
import {
  GoogleIcon,
  FacebookIcon,
  SitemarkIcon,
} from "@/common/icons/customIcons";

// Custom Component
import CustomCard from "@/components/atoms/authentication/customCard";

export default function SignUpCard(props: { disableCustomTheme?: boolean }) {
  const router = useRouter();

  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [firstNameError, setfirstNameError] = React.useState(false);
  const [firstNameErrorMessage, setfirstNameErrorMessage] = React.useState("");
  const [lastNameError, setlastNameError] = React.useState(false);
  const [lastNameErrorMessage, setlastNameErrorMessage] = React.useState("");

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const firstName = document.getElementById("firstName") as HTMLInputElement;
    const lastName = document.getElementById("lastName") as HTMLInputElement;
    const phone = document.getElementById("phone") as HTMLInputElement;
    let isValid = true;

    if (!phone.value || phone.value.length < 10) {
      setPhoneError(true);
      setPhoneErrorMessage("Please enter a valid phone number.");
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage("");
    }

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!firstName.value || firstName.value.length < 1) {
      setfirstNameError(true);
      setfirstNameErrorMessage("First name is required.");
      isValid = false;
    } else {
      setfirstNameError(false);
      setfirstNameErrorMessage("");
    }

    if (!lastName.value || lastName.value.length < 1) {
      setlastNameError(true);
      setlastNameErrorMessage("Last name is required.");
      isValid = false;
    } else {
      setlastNameError(false);
      setlastNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (firstNameError || lastNameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const phone = data.get("phone");
    const email = data.get("email");
    const password = data.get("password");

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, phone, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Sign up failed");
      }

      // Redirect or update state after login
      router.replace("/login");
    } catch (error: any) {
      console.error("Sign up error:", error.message);
      alert(error.message);
    }
  };

  return (
    <CustomCard variant="outlined">
      <Box sx={{ display: { xs: "flex" } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="firstName">First name</FormLabel>
            <TextField
              autoComplete="firstName"
              name="firstName"
              required
              fullWidth
              id="firstName"
              placeholder="Michael"
              error={firstNameError}
              helperText={firstNameErrorMessage}
              color={firstNameError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastName">Last name</FormLabel>
            <TextField
              autoComplete="lastName"
              name="lastName"
              required
              fullWidth
              id="lastName"
              placeholder="Finch"
              error={lastNameError}
              helperText={lastNameErrorMessage}
              color={lastNameError ? "error" : "primary"}
            />
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <TextField
              required
              fullWidth
              id="phone"
              placeholder="+9173559****1"
              name="phone"
              autoComplete="phone"
              variant="outlined"
              error={phoneError}
              helperText={phoneErrorMessage}
              color={phoneError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              variant="outlined"
              error={emailError}
              helperText={emailErrorMessage}
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
        </Box>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            required
            fullWidth
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            variant="outlined"
            error={passwordError}
            helperText={passwordErrorMessage}
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>

        <FormControlLabel
          control={<Checkbox value="allowExtraEmails" color="primary" />}
          label="I want to receive updates via email."
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Sign up
        </Button>
      </Box>
      <Divider>
        <Typography sx={{ color: "text.secondary" }}>or</Typography>
      </Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign up with Google")}
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign up with Facebook")}
          startIcon={<FacebookIcon />}
        >
          Sign up with Facebook
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </CustomCard>
  );
}
