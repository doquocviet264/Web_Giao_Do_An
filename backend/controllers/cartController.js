import userModel  from "../models/userModel.js";

//them san pham vao gio hang nguoi dung
const addToCart = async (req, res)=>{
try{
    let userData =await userModel.findById(req.body.userId)
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1
    }
    else{
        cartData[req.body.itemId] +=1;

    }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData});
    res.json({success:true, message:"Addad To Cart"});
}catch(error){
    console.log(error)
    res.json({success:true, message:"Error hehe"})
}
}

//xoa san pham vao gio hang nguoi dung
const removeFromCart = async (req, res)=>{
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;

        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Removed From Cart"})
    }catch(error){
        console.log(error)
        res.json({success:true, message:"Error hehe"})
    
    }
}

//
const getCart = async (req, res)=>{
    try{
        let userData  = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    }catch(error){
        console.log(error)
        res.json({success:true, message:"Error hehe"})
    }

}
export {addToCart, removeFromCart, getCart}