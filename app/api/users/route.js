import { NextResponse } from 'next/server';
import connectMongodb from '@/app/config/database';
import User from '@/app/models/Users';

export async function POST(request) {
  try {
    await connectMongodb();
    
    const userData = await request.json();
    console.log('User creation request:', userData);
    
  
    const { name, username, email, phone, address } = userData;
    
    if (!name || !username || !email || !phone || !address) {
      return NextResponse.json(
        { error: 'All fields are required: name, username, email, phone, address' }, 
        { status: 400 }
      );
    }

    
    let existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });

    if (existingUser) {
      console.log('User already exists:', existingUser._id);
      return NextResponse.json(existingUser, { status: 200 });
    }

   
    const newUser = new User({
      name: name.trim(),
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      address: address.trim(),
      orders: []
    });

    const savedUser = await newUser.save();
    console.log('Created new user:', savedUser._id);
    
    return NextResponse.json(savedUser, { status: 201 });

  } catch (error) {
    console.error('Error in user creation:', error);
    
  
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({ 
        error: 'Validation failed: ' + validationErrors.join(', ') 
      }, { status: 400 });
    }
    
 
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json({ 
        error: `${field} already exists` 
      }, { status: 409 });
    }
    
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongodb();
    
    const users = await User.find()
      .populate('orders')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      users 
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}