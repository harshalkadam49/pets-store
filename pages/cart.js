import DashboardLayout from "@/components/layouts/dashboardLayout";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyCart from "../public/emptyCart.svg";
import Image from "next/image";

export default function History() {
  const [totalCartValue, setTotalCartValue] = useState(0);

  const data = useSelector((state) => state.products);

  const onGetSumOfItems = (array) => {
    let sumOfItems = 0;
    for (let i = 0; i < array.length; i++) {
      sumOfItems += array[i].price;
    }

    setTotalCartValue(sumOfItems);
  };

  const getCommaSeparatedValue = (number) => {
    if (number == 0) return 0;
    if (number) {
      number = parseInt(number);
      return number.toLocaleString("en-IN");
    }
  };

  useEffect(() => {
    onGetSumOfItems(data);
  }, []);

  return (
    <>
      <Head>
        <title>Cart</title>
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
              width: { md: 600, xs: 352 },
              height: "30rem",
              mx: "auto",
              overflowY: "auto",
            }}
          >
            <Typography variant="h5" pb={3}>
              Your Cart Items
            </Typography>
            <Stack spacing={2} pb="20%">
              {data.length > 0 ? (
                <>
                  {data.map(
                    (item, index) =>
                      item.isAddedToCart == true && (
                        <Box key={index}>
                          <Stack
                            alignItems="center"
                            direction="row"
                            justifyContent="space-between"
                          >
                            <Stack direction="row" spacing={2}>
                              <Avatar
                                src={item.coverImgURL}
                                sx={{
                                  height: 50,
                                  width: 50,
                                }}
                              />

                              <Stack>
                                <Typography variant="caption1">
                                  Price
                                </Typography>
                                <Typography variant="h5">
                                  Rs {item.price}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                              <Chip
                                label="In Stock"
                                sx={{ background: "#AFFFAD" }}
                              />
                            </Stack>
                          </Stack>
                        </Box>
                      )
                  )}
                </>
              ) : (
                <>
                  <Box textAlign="center">
                    <Image
                      src={EmptyCart}
                      height={200}
                      width={200}
                      alt="EmptyCart"
                    />

                    <Typography variant="h3" pt={2}>
                      Looks like cart <br></br> is empty
                    </Typography>
                  </Box>
                </>
              )}
            </Stack>
          </Card>

          <Divider />
          <Card
            sx={{
              p: 3,
              width: { md: 600, xs: 352 },
              mx: "auto",
              overflowY: "auto",
              mt: "-2rem",
            }}
            elevation={0}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h4">Cart Total</Typography>
              <Typography variant="h4">
                Rs {getCommaSeparatedValue(totalCartValue)}
              </Typography>
            </Stack>
          </Card>
        </Stack>
      </DashboardLayout>
    </>
  );
}
