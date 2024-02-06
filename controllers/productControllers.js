import Product from "../models/Product.js";

//@desc     Create Product
//@path     /api/v1/products
//@access   Private/Admin

export const createProduct=async (req,res)=>{

    try {
        const {name,description,brand,category,sizes,colors,price,totalQty}=req.body
        const existingProduct=await Product.findOne({name:name})
        if(existingProduct){
            return res.json({
                message:"product exists already try adding new one"
            })
        }
        const product=await Product.create({
            name,description,brand,category,sizes,colors,price,totalQty,user:req.userId
        })
        res.status(201).json({
            status:"success",
            message:"product created",
            product
        })
    
    } catch (error) {
        res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//@desc     get Products
//@path     /api/v1/products
//@access   Public/admin

export const getProducts=async (req,res)=>{
    try {
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
        let endIndex=limit
        productQuery=productQuery.skip(startIndex).limit(endIndex)
        //getting results by resolving query
        let products=await productQuery;
        res.status(200).json({
            status:"success",
            message:"products fetched successfully",
            products,
            count:products.length
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            message:error.message

        })
    }
}

//@desc     get Product
//@path     /api/v1/products/:id
//@access   Public/admin

export const getProduct=async (req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        res.status(200).json({
            status:"success",
            message:"product fetched successfully",
            product
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            message:error.message

        })
    }
}

//@desc     update Product
//@path     /api/v1/products/:id
//@access   admin

export const updateProduct=async (req,res)=>{
    try {
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(200).json({
            status:"success",
            message:"product updated successfully",
            updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            message:error.message

        })
    }
}

//@desc     delete Product
//@path     /api/v1/products/:id
//@access   admin

export const deleteProduct=async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:"success",
            message:"product deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            message:error.message

        })
    }
}