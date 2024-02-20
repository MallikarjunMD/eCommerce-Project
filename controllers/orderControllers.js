import expressAsyncHandler from "express-async-handler"
import Order from "../models/Order.js"
import Product from "../models/Product.js";
import User from "../models/User.js";
import Stripe from "stripe";
import Coupon from "../models/Coupon.js";
// @desc   Create Order
// @route  POST /api/v1/orders
// @access Private/public

export const createOrder=expressAsyncHandler(async (req,res)=>{
    const {orderItems}=req.body;
    //find the product in order item exists
    const products=await Product.find({_id:{$in:orderItems}});
    if(products.length<0){
        throw new Error("There are no products in cart")
    }
    //checking whether user's address is present or not
    let user=await User.findById(req.userId)
    if(!user.hasShippingAddress){
        throw new Error("update shipping address please");
    }
    const coupon=req.query?.coupon;
    const couponExists=await Coupon.findOne({code:coupon});
    if(!couponExists){
      throw new Error("Coupon doesn't exist")
    }
      if(couponExists.isExpired){
        throw new Error("Coupon expired")
      }
    

    const newOrder=await Order.create({
        user:req.userId,
        orderItems,
        shippingAddress:{
            name:"mallikarjun",
            place:"davangere",
            pin:577004
        }, 
    })
    //updating product attributes after order
    orderItems.map(async (order)=>{
        const product=products.find((product)=>{
            return product._id.toString()===order._id.toString();
        })
        product.totalSold+=order.qty;
        product.totalQty-=order.qty;
        await product.save();
    });
    //push order into the user's orders
    user.orders.push(newOrder._id)
    //re save
    await user.save()

    const stripe=new Stripe(process.env.STRIPE_KEY)

    let convertedOrders=orderItems.map((item)=>{
        return {
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name,
                    description:item.description,
                },
                unit_amount:couponExists?(item.price*couponExists.discount/100)*100:item.price*100,
            },
            quantity:item.qty,
        };
        }
    )
    const session=await stripe.checkout.sessions.create({
        line_items:convertedOrders,
            metadata:{
              orderId:JSON.stringify(newOrder._id),
            },
        mode:'payment',
        success_url:'http://localhost:3000',
        cancel_url:'http://localhost:3000',
    })
   res.send({ url:session.url })
    // res.status(201).json({
    //     status:"success",
    //     message:"order successfully placed",
    //     newOrder
    // })
})

// @desc   Get orders
// @route  GET /api/v1/orders
// @access Private/user

export const getOrders = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find();
    res.status(201).json({
      status: "Success",
      message: "Fetched orders successfully",
      orders,
    });
  });
  
  // @desc   Get Order
  // @route  GET /api/v1/orders/:id
  // @access Private/user

  export const getOrder = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "Fetched order successfully",
      order,
    });
  });
  
  // @desc   Update order
  // @route  PUT /api/v1/orders/:id
  // @access Private/admin
  
  export const updateOrder = expressAsyncHandler(async (req, res) => {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status:req.body.status
      },
      { 
        new: true ,
        runValidators:true
      });
    res.status(200).json({
      status: "Success",
      message: "Updated order successfully",
      updatedOrder,
    });
  });