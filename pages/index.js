import Head from "next/head";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToHistory, addToCart } from "@/store/slices/productsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const [isLoding, setIsLoading] = useState(false);
  const [productsDetails, setProductsDetails] = useState({});

  const onAddToHistory = (payload) => {
    dispatch(addToHistory(payload));
  };

  const onGetNewProduct = () => {
    setIsLoading(true);
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((data) => {
        let dataModel = {
          id: Math.random().toFixed(2) * 100,
          price: Math.random().toFixed(2) * 1000,
          coverImgURL: data.message,
          isAddedToCart: false,
        };
        setProductsDetails(dataModel);
        onAddToHistory(dataModel);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onGetNewProduct();
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <DashboardLayout>
        <Stack
          alignItems="center"
          justifyContent="center"
          position="fixed"
          left={0}
          right={0}
          top={100}
        >
          <Card
            sx={{
              p: 3,
              width: { md: 400, xs: 352 },
              mx: "auto",
            }}
          >
            <Typography variant="h5" pb={1}>
              Latest Product
            </Typography>

            <Box sx={{ position: "relative", borderRadius: "1rem" }}>
              <Image
                alt="Dog Image"
                height={300}
                width={400}
                src={productsDetails.coverImgURL}
              />
            </Box>

            <Stack
              pt={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h4">Rs {productsDetails.price}</Typography>

              <Chip label="In Stock" sx={{ background: "#AFFFAD" }} />
            </Stack>

            <Stack direction="row" spacing={1} mt={2}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="inherit"
                onClick={onGetNewProduct}
                startIcon={
                  isLoding ? <CircularProgress color="inherit" size={20} /> : ""
                }
                disable={isLoding}
              >
                Get New Product
              </Button>
            </Stack>
          </Card>
        </Stack>
      </DashboardLayout>
    </>
  );
}
