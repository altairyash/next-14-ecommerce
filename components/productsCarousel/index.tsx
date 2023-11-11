import { ProductDataInterface } from "@/utils/interfaces";
import ProductTile from "../productTile";

export default function ProductsCarousel(props: any) {
    const {
        productData,
        category,
        searchBarText
    } = props;
    return (
        <div className="py-5 px-2">
            <h2 className="text-2xl capitalize font-bold text-gray-900 px-5">{category}</h2>
            <div className="py-4 flex overflow-x-scroll scrollbar-hide">
                {productData.length > 0 && productData.map((product:ProductDataInterface,key:number) => (
                    product.category === category &&
                    product.name.toLowerCase().includes(searchBarText.toLowerCase())) && (
                        <div key={product._id} className="px-5 snap-start">
                            <ProductTile {...product}></ProductTile>
                        </div>
                    ))}
            </div>
        </div>
    )
}