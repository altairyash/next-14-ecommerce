import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await initMongoose();
  const searchParams = req.nextUrl.searchParams;
  const ids = searchParams.get('ids');

  if (ids !== null) {
    const productIds = ids.split(',');
    if (productIds.length > 0) {
      return NextResponse.json(await Product.find({ '_id': { $in: productIds } }).exec());
    } else {
      return NextResponse.json([]);
    }
  }

  return NextResponse.json(await Product.find().exec());
}
