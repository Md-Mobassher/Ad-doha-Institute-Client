import { Card, CardContent, Typography, Box } from "@mui/material";
import { FC, ReactNode } from "react";

type DashboardCardProps = {
  label: string;
  value: number;
  icon?: ReactNode;
  iconBgColor?: string; // Optional: custom background color for icon
};

const DashboardCard: FC<DashboardCardProps> = ({
  label,
  value,
  icon,
  iconBgColor = "bg-blue-100 text-blue-600", // default styling
}) => {
  return (
    <Card
      className="w-full shadow border transition-all duration-300 hover:scale-[1.02]"
      sx={{ borderRadius: 2 }}
    >
      <CardContent className="flex items-start justify-start md:gap-3 gap-5 md:p-2 p-5">
        {icon && (
          <Box
            className={`rounded-full p-3 text-xl ${iconBgColor} flex items-center justify-center`}
          >
            {icon}
          </Box>
        )}
        <Box className="flex flex-col gap-1">
          <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
          <Typography variant="h5" className="text-primary font-bold">
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
