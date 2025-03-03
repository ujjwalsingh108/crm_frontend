import Header from "@/components/organisms/header";
import { Typography } from "@mui/material";
export default function Leads() {
  return (
    <div>
      <Header
        onMenuClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      {/* <Typography variant="h1">Leads</Typography> */}
    </div>
  );
}
