import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSeletors } from "./catalogSlice";
import ProductList from "./ProductList";
import { useEffect } from "react";




export default function Catalog() {

  const products = useAppSelector(productSeletors.selectAll);
  const {productsLoaded, status} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  

  useEffect(() => {
   if(!productsLoaded) dispatch(fetchProductsAsync())

  }, [dispatch, productsLoaded])


  if (status.includes('pending')) return <LoadingComponent message='Loading products...' />


  return (

    <>

      <ProductList products={products} />



    </>

  )

}