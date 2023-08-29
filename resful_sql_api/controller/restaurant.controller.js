const Restaurant = require("../model/restaurant.model")
const getAll = async (req,res)=>{
    try {
        const restaurantList = await Restaurant.findAll()
        const result = restaurantList.map((restaurant)=> {return restaurant.toJSON()})
        res.status(200).json(result)
    } catch (error) {
        console.log(err);
        res.status(500).send("Have an error on server !")
    }

};
const getByid = async(req,res)=>{
    const id = req.params.id
    try {
        const result = await Restaurant.findOne({where:{id:id}})
        if(!result){
            return res.status(404).send("Not Found restaurant with ID :" + id)
        }
        res.status(200).json({result})
    } catch (error) {
        console.log(err);
        res.status(500).send("Have an error on server !")
    }
}
const createdRes = async(req,res)=>{
    const { name ,type ,imageurl} = req.body
    if(!name || !type || !imageurl){
       return res.status(400).send(" please prowide all value !")
    }
    try {
        await Restaurant.create({name,type,imageurl})
        res.status(201).send("Created you reataurant")
    } catch (error) {
        console.log(err);
        res.status(500).send("Have an error on server !")
    }
}

const deleteById = async(req,res)=>{
    const id = req.params.id
    try {
        const result = await Restaurant.findOne({where:{id:id}})
        if(!result){
            return res.status(404).send("Not Found restaurant with ID :" + id)
        }
        result.destroy()
        res.status(200).send(`ลบไปแล้ว ฮ้าฟฟู่ว${id}`)
    } catch (error) {
        console.log(err);
        res.status(500).send("Have an error on server !")
    }
}
const UpdateById = async(req,res)=>{
    const id = req.params.id
    const {name , type , imageurl } = req.body
    if(!name || !type || !imageurl){
        return res.status(400).send(" please prowide all value !")
     }
     try {
        const result = await Restaurant.findOne({where:{id:id}})
        if(!result){
            return res.status(404).send("Not Found restaurant with ID :" + id)
        }
        await Restaurant.update({name,type,imageurl},{where:{id:id}})
        res.status(201).send(`อัปเดตรแล้วนะไอดีนี้ :${id}`)
     } catch (error) {
        console.log(err);
        res.status(500).send("Have an error on server !")
     }
}

module.exports ={ getAll,getByid,createdRes,deleteById,UpdateById};