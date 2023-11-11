import { initMongoose } from "@/lib/mongoose";
import Order from "@/models/orders";
import Product from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') { return NextResponse.json({ "message": "not a POST request" }) }
    await initMongoose();

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const formData = await req.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    const address = formData.get('address')
    const city = formData.get('city')
    const postalCode = formData.get('postalCode')

    const productIds = (formData.get('products') as string).split(':')
    const productIdsArray = productIds.map(productId => productId.split(',')[0])
    const productsArray = productIds.map(productId => productId.split(','))
    const products = await Product.find({ '_id': { $in: productIdsArray } }).exec()

    let line_items = []
    for (let productItem of productsArray) {
        const quantity = parseInt(productItem[1], 10);
        const product = products.find(p => p._id.toString() === productItem[0])
        line_items.push({
            quantity,
            price_data: {
                currency: 'USD',
                product_data: { 
                    name: product.name 
                },
                unit_amount: product.price * 100,
            },
        })
    }

    const order = await Order.create({
        products: line_items,
        name,
        address,
        city,
        email,
        postalCode,
        paid: 0
    })
    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        customer_email: email,
        success_url: `${req.nextUrl.origin}/?success=true`,
        cancel_url: `${req.nextUrl.origin}/?canceled=true`,
        metadata: {orderId:order._id.toString()}
    });
    return NextResponse.redirect(session.url,303)
}
