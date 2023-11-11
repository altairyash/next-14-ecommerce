import { ProductDataInterface } from '@/utils/interfaces';
import { ProductsContext } from '@/utils/productsContext';
import { useContext, useEffect, useState } from 'react';
function ProductTileCheckout({ _id, name, description, price, image }: ProductDataInterface) {
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
        <div className="p-2 w-full flex items-center">
            <div className="text-lg font-bold w-24 bg-gray-200 rounded-lg shrink-0 h-fit grow-0">
                <img className="w-full p-2 py-4" src={image} alt=""></img>
            </div>
            <div className="w-full ml-4">
                <div className="text-lg font-bold line-clamp-2">
                    {name}
                </div>
                <div className="text-sm line-clamp-3">
                    {description}
                </div>
                <div className="flex my-2">
                    <div className="text-lg font-bold flex-grow">
                        ${price}
                    </div>
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
        </div>
    )
}
export default ProductTileCheckout