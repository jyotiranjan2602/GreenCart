import Address from "../models/Address.js";


// Add address : /api/address/add
export const addAddress = async (req, res) => {
    try {
        const address = req.body;
        const userId = req.userId; // Or req.user._id, depending on your auth middleware
        

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        await Address.create({ ...address, userId });
        res.json({ success: true, message: 'Address added successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
//Get address :/api/address/get
 export const getAddress = async(req, res)=>{
    try {
        const userId = req.userId;
        const addresses =  await Address.find({userId})
        res.json({success:true, addresses})
    } catch (error) { 
        console.log(error.message);
        res.json({success:false, message: error.message});   
    }
 }