import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  // console.log(image)
  return (
    <Box width={size} height={size} style={{
        borderRadius: "50%",
        overflow: "hidden",
      }}>
      <img
        style={{ objectFit: "cover",overflow: "hidden",width: "100%",
        height: "100%", borderRadius: "50%" }}
        alt="user"
        src={`http://localhost:7000/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;

