import User from "../models/User.js";



// Update user cartdata : /api/cart/update
export const updateCart =async(req, res)=>{
    try {
        const { userId, cartItems} = req.body;
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({success:true, message:'Cart Updated'})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}


// Get cart Items 
export const getCart = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
      res.json({ success: true, cartItems: user.cartItems });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
  