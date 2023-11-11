import { ProductDataInterface } from '@/utils/interfaces';
import { ProductsContext } from '@/utils/productsContext';
import { useContext, useEffect, useState } from 'react';
function ProductTile({ _id, name, description, price, image }: ProductDataInterface) {
    const [countAddToCart, setCountAddToCart] = useState(0)
    const {
        productsAdded,
        setProductsAdded
    } = useContext(ProductsContext)
    useEffect(() => {
        setCountAddToCart(productsAdded[_id] || 0)
    }, [productsAdded])
    const handleAddToCart = (_id: string) => {
        setCountAddToCart((countAddToCart || 0) + 1)
        setProductsAdded({ ...productsAdded, [_id]: (countAddToCart + 1) })
    }
    const handleRemoveFromCart = (_id: string) => {
        setCountAddToCart(countAddToCart - 1)
        if (productsAdded[_id] as number !== 1) {
            setProductsAdded({ ...productsAdded, [_id]: (countAddToCart - 1) })
        }
        else {
            const updatedProductsAdded = { ...productsAdded }
            delete updatedProductsAdded[_id]
            setProductsAdded(updatedProductsAdded)
        }
    }
    return (
        <div className="w-64">
            <div className="bg-gradient-to-r from-blue-200 to-purple-200 p-5 rounded-xl">
                <img src={image} alt=""></img>
            </div>
            <div className="mt-2">
                <h3 className="text-lg font-bold">{name}</h3>
            </div>
            <div>
                <span className="text-sm mt-1 !leading-4">{description}</span>
            </div>
            <div className="flex mt-1 font-bold">
                <span className="text-2xl grow">${price}</span>
                {countAddToCart !== 0 && (
                    <button className="border-solid border-2 border-emerald-500 text-emerald-500 py-1 px-3 rounded-md mx-1"
                        onClick={() => handleRemoveFromCart(_id)}
                    >
                        {countAddToCart && '-'}
                    </button>
                )}
                {countAddToCart !== 0 && (
                    <div className="bg-emerald-500 text-white py-1 px-3 rounded-md mx-1">
                        {countAddToCart}
                    </div>
                )}
                <button className={(countAddToCart ? "text-emerald-500 py-1 px-3 mx-1" : "bg-emerald-500 text-white py-1 px-3 rounded-md") + " border-solid border-emerald-500 border-2 rounded-md"}
                    onClick={() => handleAddToCart(_id)}
                >
                    + {countAddToCart === 0 && 'Add'}
                </button>
            </div>
        </div>
    )
}
export default ProductTile