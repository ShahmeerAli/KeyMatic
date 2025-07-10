import { NextResponse } from 'next/server';


let cartItems = [];

export async function POST(request) {
  try {
    
    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      return NextResponse.json(
        { error: 'Quantity must be greater than 0' },
        { status: 400 }
      );
    }

 
    const existingItemIndex = cartItems.findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
      
      cartItems[existingItemIndex].quantity += quantity;
    } else {
    
      cartItems.push({
        productId,
        quantity,
        addedAt: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Product added to cart successfully',
      cartItems: cartItems.length,
      item: {
        productId,
        quantity: existingItemIndex >= 0 ? cartItems[existingItemIndex].quantity : quantity
      }
    });

  } catch (error) {
    console.error('Error in cart API:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      cartItems,
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}