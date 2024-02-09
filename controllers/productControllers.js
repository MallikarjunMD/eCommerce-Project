import expressAsyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

//@desc     Create Product
//@path     /api/v1/products
//@access   Private/Admin

export const createProduct=expressAsyncHandler(async (req,res)=>{
        const {name,description,brand,category,sizes,colors,price,totalQty}=req.body
        const existingProduct=await Product.findOne({name:name})
        if(existingProduct){
            // return res.json({
            //     message:"product exists already try adding new one"
            // })

            //or

            throw new Error('product exists already')            

        }
        //check whether  the category exists or not
        const categoryFound=await Category.findOne({name:category})
        if(!categoryFound){
            throw new Error("category not found, please first check category name")
        }
        //check whether  the brand exists or not
        const brandFound=await Brand.findOne({name:brand})
        if(!brandFound){
            throw new Error("brand not found, please first check brand name")
        }
        const newProduct=await Product.create({
            name,description,brand,category,sizes,colors,price,totalQty,user:req.userId
        })
         //push product into a brand
        brandFound.products.push(newProduct._id)
       //resave
        await brandFound.save()
        //push product into a category
        categoryFound.products.push(newProduct._id)
       //resave
        await categoryFound.save()
        res.status(201).json({
            status:"success",
            message:"product created",
            newProduct
        })
    
    
})

//@desc     get Products
//@path     /api/v1/products
//@access   Public/admin

export const getProducts=expressAsyncHandler(async (req,res)=>{
    
        //query object
        let productQuery=Product.find()
        //based on name
        if(req.query.name){
            productQuery=productQuery.find({name:{$regex:req.query.name,$options:"i"}})
        }
        if(req.query.brand){
            productQuery=productQuery.find({brand:req.query.brand})
        }
        //based on category
        if(req.query.category){
            productQuery=productQuery.find({category:req.query.category})
        }
        //based on sizes
        if(req.query.sizes){
            let query;
            req.query.sizes.includes(",")?query=req.query.sizes.split(","):query=[req.query.sizes]
            productQuery=productQuery.find({sizes:{$all:query}})
        }
        //based upon prize
        if(req.query.prize){
            let range=req.query.prize.split(",")
            productQuery=productQuery.find({price:{$gte:+range[0],$lte:+range[1]}})
        }
        
        //based on color
        if(req.query.colors){
            productQuery=productQuery.find({colors:req.query.colors})
        }
        //pagination
        const page=req.query.page?parseInt(req.query.page):1
        const limit=req.query.limit?parseInt(req.query.limit):3

        let startIndex=(page-1)*limit
        let endIndex=page*limit
        productQuery=productQuery.skip(startIndex).limit(endIndex)

        //defining previous and next pages
        let noOfDocuments=await Product.countDocuments()
        let pagination={}
        if(startIndex>0){
            pagination.previous=page-1
        }
        if(endIndex<noOfDocuments){
            pagination.next=page+1
        }

        //getting results by resolving query
        let products=await productQuery;
        res.status(200).json({
            status:"success",
            message:"products fetched successfully",
            products,
            count:products.length,
            pagination
        })
    
})

//@desc     get Product
//@path     /api/v1/products/:id
//@access   Public/admin

export const getProduct=expressAsyncHandler(async (req,res)=>{
    
        const product=await Product.findById(req.params.id)
        res.status(200).json({
            status:"success",
            message:"product fetched successfully",
            product
        })
    
})

//@desc     update Product
//@path     /api/v1/products/:id
//@access   admin

export const updateProduct=expressAsyncHandler(async (req,res)=>{
    
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(200).json({
            status:"success",
            message:"product updated successfully",
            updatedProduct
        })
    
})

//@desc     delete Product
//@path     /api/v1/products/:id
//@access   admin

export const deleteProduct=expressAsyncHandler(async (req,res)=>{
    
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:"success",
            message:"product deleted successfully"
        })
    
})