import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './Gridview'
import ListView from './ListView'

const ProductList = () => {

  const {filter_products, grid_view} = useFilterContext()

  if(grid_view){
    return <GridView products={filter_products} />
  }
  else {
    return <ListView products={filter_products} />
  }

  // return (
  //   <div>ProductList</div>
  // )
}

export default ProductList
