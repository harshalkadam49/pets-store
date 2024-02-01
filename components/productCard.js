import { Box, Button, Card, Chip, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";

export default function ProductCard(props) {
  return (
    <>
      <Card
        sx={{
          p: 3,
        }}
      >
        <Box sx={{textAlign:"center"}}>
          <Image
            alt="Dog Image"
            height={300}
            width={320}
            src={props.imageURL}
          />
        </Box>

        <Stack
          pt={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4">Rs {props.price}</Typography>

          <Chip label="In Stock" sx={{ background: "#AFFFAD" }} />
        </Stack>

        <Stack direction="row" spacing={1} mt={2}>
          <Button
            onClick={() => props.onAddToCart()}
            fullWidth
            size="large"
            variant="contained"
            color="inherit"
            startIcon={<ShoppingCartIcon />}
          >
            Add To Cart
          </Button>
        </Stack>
      </Card>
    </>
  );
}
