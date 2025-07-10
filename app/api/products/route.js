import { NextResponse } from 'next/server';
import connectMongodb from '../../config/database.js';
import Product from '../../models/Product.js';


export async function GET(request) {
    try {
        await connectMongodb();
        
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const sort = searchParams.get('sort');
        const limit = searchParams.get('limit');
        const featured = searchParams.get('featured');
        
        
        let query = {};
        if (category && category !== 'all' && category !== '') {
            query.category = { $regex: new RegExp(category, 'i') };
        }
        
        if (featured === 'true') {
            query.$or = [
                { featured: true },
                { rating: { $gte: 4.5 } }
            ];
        }
        
     
        let sortObj = {};
        switch (sort) {
            case 'price-low-high':
                sortObj.price = 1;
                break;
            case 'price-high-low':
                sortObj.price = -1;
                break;
            case 'rating':
                sortObj.rating = -1;
                break;
            case 'name':
                sortObj.title = 1;
                break;
            default:
                sortObj.createdAt = -1; 
                break;
        }
        
       
        let productsQuery = Product.find(query).sort(sortObj);
        
        if (limit) {
            productsQuery = productsQuery.limit(parseInt(limit));
        }
        
        const products = await productsQuery.exec();
        
        return NextResponse.json({ 
            products,
            count: products.length,
            message: 'Products fetched successfully'
        }, { status: 200 });
        
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products', products: [] }, 
            { status: 500 }
        );
    }
}


export async function POST(request) {
    try {
        const { title, description, features, price, rating, category, image, featured } = await request.json();
        
    
        if (!title || !description || !price || !category) {
            return NextResponse.json(
                { error: 'Missing required fields: title, description, price, category' }, 
                { status: 400 }
            );
        }
        
        await connectMongodb();
        
        const newProduct = await Product.create({
            title,
            description,
            features,
            price,
            rating,
            category,
            image,
            featured: featured || false
        });
        
        return NextResponse.json(
            { message: 'Product created successfully', product: newProduct }, 
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { error: 'Failed to create product' }, 
            { status: 500 }
        );
    }
}


export async function PUT(request) {
    try {
        const { id, title, description, features, price, rating, category, image, featured } = await request.json();
        
        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' }, 
                { status: 400 }
            );
        }
        
        await connectMongodb();
        
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (features !== undefined) updateData.features = features;
        if (price !== undefined) updateData.price = price;
        if (rating !== undefined) updateData.rating = rating;
        if (category !== undefined) updateData.category = category;
        if (image !== undefined) updateData.image = image;
        if (featured !== undefined) updateData.featured = featured;
        
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!updatedProduct) {
            return NextResponse.json(
                { error: 'Product not found' }, 
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { message: 'Product updated successfully', product: updatedProduct }, 
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { error: 'Failed to update product' }, 
            { status: 500 }
        );
    }
}


export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' }, 
                { status: 400 }
            );
        }
        
        await connectMongodb();
        
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return NextResponse.json(
                { error: 'Product not found' }, 
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { message: 'Product deleted successfully', product: deletedProduct }, 
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { error: 'Failed to delete product' }, 
            { status: 500 }
        );
    }
}