"use client"
import { GlobalWrapper } from "@/components/globalWrapper";
import ProductTileCheckout from "@/components/productTileCheckout";
import { ProductDataInterface } from "@/utils/interfaces";
import { ProductsContext } from "@/utils/productsContext";
import { useContext, useEffect, useState } from "react";

export default function CheckoutPage() {
    const [productData, setProductData] = useState<Array<ProductDataInterface>>([])
    const [subtotal, setSubtotal] = useState(0)
    const delivery = subtotal ? 8 : 0
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const {
        productsAdded
    } = useContext(ProductsContext)
    const productCount = productData.filter((product) => productsAdded[product._id]).length

    useEffect(() => {
        const url = '/api/products?ids=' + (Object.keys(productsAdded).join(','))
        if (Object.keys(productsAdded).length > 0) {
            fetch(url)
                .then(response => response.json())
                .then((data) => {
                    setProductData(data)
                })
        }
    }, [productsAdded])

    useEffect(() => {
        let total = 0
        productData.map((product) => {
            total += product.price * productsAdded[product._id]
        })
        setSubtotal(total)
    }, [productsAdded, productData])
    console.log("PRODUCT DATA ", productData)
    return (
        <GlobalWrapper>
            <div className="md:flex md:justify-between mt-20">
                <div className="grow">
                    <h1 className="text-gray-800 md:px-5 ml-4 text-2xl font-bold">Cart</h1>
                    {productCount === 0 && (
                        <div className="md:p-5">
                            <div className="bg-gray-200 m-5 p-4 rounded-xl flex flex-col items-center">
                                <h1 className="mb-4 font-bold text-gray-800 text-center w-full">No Products in your cart</h1>
                                <img className="w-24 my-10" src='emptyCart.png' />
                            </div>
                        </div>
                    )}
                    <div className="p-5 ml-4 max-w-[500px]">
                        {productData?.length > 0 && productData.map(item => ((productsAdded[item._id] > 0) && (
                            <ProductTileCheckout {...item} />
                        )))}
                    </div>
                </div>
                {productCount > 0 && (
                    <div className="md:max-w-[500px] mt-4">
                        <div>
                            <h1 className="text-gray-800 ml-5 text-2xl font-bold">Checkout</h1>
                        </div>
                        <form action="/api/checkout" method="POST">
                            <div className="w-full p-5">
                                <input name={"name"} placeholder="name" value={name} onChange={e => setName(e.target.value)} className=" bg-gray-200 w-full py-2 px-4 rounded-xl text-gray-500 my-2" />
                                <input name={"email"} placeholder="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className=" bg-gray-200 w-full py-2 px-4 rounded-xl text-gray-500 my-2" />
                                <input name={"address"} placeholder="street address, number" value={address} onChange={e => setAddress(e.target.value)} className=" bg-gray-200 w-full py-2 px-4 rounded-xl text-gray-500 my-2" />
                                <input name={"city"} placeholder="city" value={city} onChange={e => setCity(e.target.value)} className=" bg-gray-200 w-full py-2 px-4 rounded-xl text-gray-500 my-2" />
                                <input name={"postalCode"} placeholder="postal code" value={postalCode} onChange={e => setPostalCode(e.target.value)} className=" bg-gray-200 w-full py-2 px-4 rounded-xl text-gray-500 my-2" />

                                <div className="mt-4 mx-2">
                                    <div className="flex mt-2">
                                        <h3 className="grow font-bold text-gray-400">Subtotal: </h3>
                                        <h3 className="font-bold text-gray-700">${subtotal}</h3>
                                    </div>
                                    <div className="flex mt-2">
                                        <h3 className="grow font-bold text-gray-400">Delivery: </h3>
                                        <h3 className="font-bold text-gray-700">${delivery}</h3>
                                    </div>
                                    <div className="flex mt-2 pt-2 border-t border-dotted border-gray-400">
                                        <h3 className="grow font-bold text-gray-400">Total: </h3>
                                        <h3 className="font-bold text-gray-700">${subtotal + delivery}</h3>
                                    </div>
                                    <input type="hidden" name="products" value={Object.entries(productsAdded).join(':')} />
                                    <button type="submit" className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg hover:scale-90 transition-all">Pay Now</button>
                                </div>

                            </div>
                        </form>
                    </div>
                )}
            </div>
        </GlobalWrapper>
    )
}