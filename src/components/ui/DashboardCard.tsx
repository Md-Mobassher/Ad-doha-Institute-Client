import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";

type DashboardCardProps = {
  label: string;
  value: number;
};

const DashboardCard: FC<DashboardCardProps> = ({ label, value }) => {
  return (
    <Card
      className="w-full shadow border transition-all duration-300 hover:scale-[1.02]"
      sx={{ borderRadius: 2 }}
    >
      <CardContent className="flex flex-col gap-2 items-center text-center p-5">
        <Typography variant="h6" className="text-gray-600 font-semibold">
          {label}
        </Typography>
        <Typography variant="h4" className="text-primary font-bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
