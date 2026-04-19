// import { Box, Typography } from "@mui/material";
// import { useGetOneUserQuery } from "../../lib/slices/userApi";

// export default function DashboardPage() {
//   const { data: response } = useGetOneUserQuery({});
  
//   const user = response?.user;
  
//   console.log("Logged in user:", user);

//   if (user?.role === "student") {
//     return <Typography>Student Dashboard</Typography>;
//   }
//   if (user?.role === "mentor") {
//     return <Typography>Mentor Dashboard</Typography>;
//   }
//   if (user?.role === "admin") {
//     return <Typography>Admin Dashboard</Typography>;
//   }
//   return (
//     <Box>
//       <Typography> other dashboard Main Page</Typography>
//     </Box>
//   );
// }
