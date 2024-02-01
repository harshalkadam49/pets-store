import DashboardLayout from "@/components/layouts/dashboardLayout";
import ProductCard from "@/components/productCard";
import { addToCart } from "@/store/slices/productsSlice";
import { Grid } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memoize } from "proxy-memoize";

export default function History() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products);

  const onAddToCart = (payload) => {
    let cartModel = {
      coverImgURL: payload.coverImgURL,
      id: payload.id,
      isAddedToCart: true,
      price: payload.price,
    };

    dispatch(addToCart(cartModel));
  };

  return (
    <>
      <Head>
        <title>History</title>
      </Head>

      <DashboardLayout>
        <Grid container mx="auto">
          {data &&
            data.map(
              (item, index) =>
                item.isAddedToCart == false && (
                  <Grid item key={index}>
                    <ProductCard
                      onAddToCart={() => onAddToCart(item)}
                      imageURL={item.coverImgURL}
                      price={item.price}
                    />
                  </Grid>
                )
            )}
        </Grid>
      </DashboardLayout>
    </>
  );
}
