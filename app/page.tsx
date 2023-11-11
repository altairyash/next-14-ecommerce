'use client';
import { useContext, useEffect, useState } from 'react'
import { ProductDataInterface } from '@/utils/interfaces';
import ProductsCarousel from '@/components/productsCarousel';
import { GlobalWrapper } from '@/components/globalWrapper';
import { ProductsContext } from '@/utils/productsContext';

export default function Home() {
  const [productData, setProductData] = useState<Array<ProductDataInterface>>([])
  const [searchBarText, setSearchBarText] = useState('')
  const [success, setSuccess] = useState(false)
  const { setProductsAdded } = useContext(ProductsContext)
  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProductData(data))
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const isSuccess = searchParams.get('success') === 'true';

    if (isSuccess) {
      setSuccess(true);
      setProductsAdded({})
    }
  }, []);

  const categoryNames = [...new Set(productData?.filter((product) => (
    product.name.toLowerCase().includes(searchBarText.toLowerCase())
  )).map((p) => p.category))]

  return (
    <GlobalWrapper>
      {success && (
        <div className="w-full flex">
          <h1 className="w-full font-bold text-gray-900 p-5 m-5 bg-emerald-300 rounded-lg">Thanks for your order!</h1>
        </div>
      )}
      <div className="w-full flex">
        <input
          placeholder="Search for products..."
          className=" bg-gray-200 w-full py-2 px-4 rounded-xl text-gray-500 m-4"
          value={searchBarText}
          onChange={e => setSearchBarText(e.target.value)}
        />
      </div>
      {categoryNames.length > 0 && categoryNames.map((category, index) => (
        <ProductsCarousel
          key={index}
          productData={productData}
          category={category}
          searchBarText={searchBarText}
        />
      ))}
    </GlobalWrapper>
  )
}
