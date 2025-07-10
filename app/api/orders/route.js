import { NextResponse } from 'next/server';
import Order from '@/app/models/Orders';
import Product from '@/app/models/Product';
import connectMongodb from '@/app/config/database';

export async function POST(request) {
  try {
    await connectMongodb();

    const body = await request.json();
    console.log('Request body:', body);

    
    const { user, products, totalAmount, shippingAddress, customerInfo } = body;

   
    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'Products are required' }, { status: 400 });
    }

    if (!totalAmount || !shippingAddress || !customerInfo?.fullname || !customerInfo?.email) {
      return NextResponse.json({ error: 'Missing required order info' }, { status: 400 });
    }

    
    const productIds = products.map(p => p.product);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    if (dbProducts.length !== productIds.length) {
      return NextResponse.json({ error: 'Some products not found' }, { status: 400 });
    }

    let calculatedTotal = 0;
    const validatedProducts = products.map(orderProduct => {
      const dbProduct = dbProducts.find(p => p._id.toString() === orderProduct.product);
      if (!dbProduct) throw new Error(`Product ${orderProduct.product} not found`);

      const productTotal = dbProduct.price * orderProduct.quantity;
      calculatedTotal += productTotal;

      return {
        product: orderProduct.product,
        quantity: orderProduct.quantity,
        price: orderProduct.price,
        name: orderProduct.name,
        image: orderProduct.image || ''
      };
    });

  
    if (Math.abs(calculatedTotal - totalAmount) > 0.01) {
      return NextResponse.json({ 
        error: `Total amount mismatch. Expected: ${calculatedTotal}, Received: ${totalAmount}` 
      }, { status: 400 });
    }

   
    const orderData = {
      products: validatedProducts,
      totalAmount: calculatedTotal,
      shippingAddress,
      customerInfo,
      status: 'pending'
    };

   
    if (user) {
      orderData.user = user;
    }

    const newOrder = new Order(orderData);

    const savedOrder = await newOrder.save();
    
   
    await savedOrder.populate('products.product');

    return NextResponse.json(savedOrder, { status: 201 });

  } catch (error) {
    console.error('Error creating order:', error);
    
  
    if (error.name === 'ValidationError') {
      return NextResponse.json({ 
        error: 'Validation error: ' + error.message 
      }, { status: 400 });
    }
    
    
    if (error.name === 'CastError') {
      return NextResponse.json({ 
        error: 'Invalid ID format' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongodb();

    const orders = await Order.find()
      .populate({
        path: 'products.product',
        select: 'name price image' 
      })
      .populate({
        path: 'user',
        select: 'name email' 
      })
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map(order => ({
      _id: order._id,
      customerName: order.customerInfo.fullname,
      customerEmail: order.customerInfo.email,
      shippingAddress: order.shippingAddress,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      products: order.products.map(p => ({
        _id: p.product?._id,
        name: p.name || p.product?.name,
        quantity: p.quantity,
        price: p.price || p.product?.price,
        image: p.image || p.product?.image
      })),
      user: order.user ? {
        _id: order.user._id,
        name: order.user.name,
        email: order.user.email
      } : null
    }));

    return NextResponse.json({ 
      success: true, 
      orders: formattedOrders 
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}