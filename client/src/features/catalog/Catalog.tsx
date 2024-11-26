import { Box, Grid2, Pagination, Paper, Typography } from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSeletors, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import { useEffect } from "react";
import ProductSearch from "../ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to High' },

]


export default function Catalog() {

  const products = useAppSelector(productSeletors.selectAll);
  const { productsLoaded, status, filtersLoaded, brands, types, productParams, metaData } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());

  }, [productsLoaded, dispatch])



  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());

  }, [dispatch, filtersLoaded])



  if (status.includes('pending')) return <LoadingComponent message='Loading products...' />


  return (

    <Grid2 container spacing={4}>

      <Grid2 size={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />

        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
          />

        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>

          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
          />
        </Paper>

      </Grid2>

      <Grid2 size={9}>
        <ProductList products={products} />
      </Grid2>


      <Grid2 size={3} />
      <Grid2 size={9}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography>
            Displaying 1-6 of 18 items
          </Typography>
          <Pagination
            color='secondary'
            size='large'
            count={metaData?.totalPages}
            page={metaData?.currentPage}
          />
        </Box>
      </Grid2>




    </Grid2>

  )

}