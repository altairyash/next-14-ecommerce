import { ProductsContext } from "@/utils/productsContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Footer() {
    const path = usePathname()
    const {
        productsAdded,
        setCartCount,
        cartCount,
    } = useContext(ProductsContext)
    useEffect(() => {
        setCartCount((Object.values(productsAdded) as number[]).reduce((acc:number, value:number) => acc + value, 0))
    }, [productsAdded])
    return (
        <footer className="sticky z-10 bottom-0 bg-gray-900 p-5 w-full flex border-t border-gray-300 justify-center space-x-12 text-gray-500">
            <Link href='/' className={(path === '/' ? 'text-emerald-500 ' : '') + "flex justify-center items-center flex-col"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span>Home</span>
            </Link>
            <Link href='/cart' className={(path === '/cart' ? 'text-emerald-500 ' : '') + "flex justify-center items-center flex-col"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span>Cart {cartCount}</span>
            </Link>
        </footer>
    )
}