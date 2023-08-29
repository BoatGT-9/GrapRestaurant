# RESTAURNAT API EI EI
## Author : **Surapong keaynin**
----------------------------------------------------------------------------
### Servive Packaeg
  - Node.js
  - Sequelize
  - cors
  - express
  - mysql
  - mysql2
  - nodemon 
### Config DataBase
หน้าแรกให้ทำการ config กับฐานข้อมูลหรือ data base ก่อน โดยทำแบบนี้ 


![image](https://github.com/BoatGT-9/resful_sql_qpi/assets/120120321/292acefd-3cc4-42cd-a7d0-dc6e0f284eb8)

โดยมีฐานข้อมูลที่ชื่อว่า restaurant
### controller 
  controller แบ่งงออกเป็น 5 ส่วน คือ getALL , getByID , CreateRes , DeleteByID , UpdateByID
  #### getAll
  เป็นการดึงข้อมูลทั้งหมดที่มีอยู่ในฐานข้อมูล ให้ออกมาแสดงข้อมูลที่อยู่ว่ามีอะไรบ้าง 
        
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
  #### getByID 
  จะเป็นการประกาศข้อมูลทั้งหมดที่เราต้องการออกมา ด้วยการที่เราจะอ้างอิงด้วย prams ด้วยตัวนั้นที่เป็น primary key เช่นดั่งภาพนี้เป็นการข้อมูลออกมาด้วยการที่เราใช้ ID ดึงออกมา

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
    };

  #### CreateRes 
  เป็นการสร้างข้อมูลให้เข้าไปในฐานข้อมูลหรือ DATA Base นั้นเองหรือเรียก แอ้ดข้อมูลเข้าสู้เว็บนั้นเอง โดยจะ alert ขึ้นว่าเรานั้นเพิ่มข้อมูลเข้าสำเร็จไหม 

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
    };

  #### DeleteByID 
   เป็นการลบข้อมูลออกทั้งหมดโดยการอ้างอิงด้วย ID เพื่อไม่ให้ไปลบข้อมูลอันอื่นๆที่มีอยู่ในฐานข้อมูล 

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
    };

  #### UpdateByID 
  เป็นการแก้ไขข้อมูลหรือ Update ข้อมูลที่มี่อยู่แล้ว เป็นแก้ไข้ข้อมูลโดยการใช้ ID เป็นตัวดึงข้อมูลนั้นมาเพื่อนำมาแก้ไขและ ส่งข้อมูลกลับไปยัง ฐานข้อมูลที่ดึงมานั้นเอง 

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
    };

และ ทำ Funtion ครบแล้ว อย่าลืมที่จะ export ออกมาด้วย 
    
    module.exports ={...}

### Model 
เป็นการจัดการกับส่วนข้อมูลทั้งหมดที่เหมาะสมที่สุดของข้อมูลที่รอให้ Controller นั้นมาร้องขอมาว่าต้องการอะไรเท่านั้น ซึ่ง model ตัวนี้เป็นการ เชื่อมต่อกับข้อมูลไว้ โดยการใช้ Sequelize มาใช้ในการต่อกับฐานข้อมูลไว้ โดยเราจะใช้ ไดเล้ก เป็น sql มาใช้งานด้วย 
และได้ทำรู้ให้แน่ใจว่าเราต่อกับฐานข้อมูลอยู่แล้วหรือไม่นั้นก็คือ เวลาเรารัน SERVER นั้น จะให้มีการแจ้งเตื่อนว่าเชื่อมต่อได้อยู่นะ 

        const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:"mysql"
    }) 

    // test 
    async function testConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }
    testConnection() 

และอย่าลืม export นะครับ 
### Routers
เป็นการกำหนดเส้นทางของแต่ละฟังชั่นของ Contoller ให้ทำงานแต่ละอันไม่ให้มาตีกันเองกับระบบของฟังชั่น ทำให้เห็นการทำงานได้ง่ายมาขึ้น นั้นเองครับ  

### Srever 
เป็นหน้าหลักที่ให้เรานั้นได้รัน Server  นั้นเองเป็นการให้ทุกระบบที่เขียนมาข้างต้นนั้นนำมาใช้งานได้จริงและแสดงผลได้ 
 
 ![image](https://github.com/BoatGT-9/resful_sql_qpi/assets/120120321/d30ad30b-d978-43c2-8329-1ffd24c475fd) 

# Fontend

 ## CSS 
 หน้าจะเป็นหน้าที่การควบคุมความสวยงามของหน้าเว็บของเราแบบนี่้ 
 ![image](https://github.com/BoatGT-9/fontend_resful_api/assets/120120321/64615133-2c58-43bb-a835-a730d57a4461)
 ## HTML
 หน้า Html จะเป็นส่วนที่กำหนดโครงสร้างที่เราจะกำหนดรูปแบบของหน้าเว็บ 
 ![image](https://github.com/BoatGT-9/fontend_resful_api/assets/120120321/1190fe81-de22-434f-aca8-0f2f986b572d)
 ## Java Script
 ส่วนของ java Script จะเป็นส่วนของหน้าที่เราจะควยคุมการทำงานรับส่งค่าของข้อมูลที่เราทำไว้จากส่วนของ backend ที่เราทำไว้ โดยที่เรา จะใช้ ระบบของ CRUD เข้ามาในการใช้งาน 
  ![image](https://github.com/BoatGT-9/fontend_resful_api/assets/120120321/456490d1-df6b-4d7c-9b6e-815c62e8db39)

 ## หน้าตาของหน้าเว็บแต่ละหน้า 
- หน้าหลักของหน้าเว็บ
![image](https://github.com/BoatGT-9/fontend_resful_api/assets/120120321/4db2c223-1117-4562-b27e-27c6aaf9c6ab)

- หน้าเพิ่มข้อมูลเข้าไปในเว็บ 
![image](https://github.com/BoatGT-9/fontend_resful_api/assets/120120321/87280578-51b2-4911-a662-f5869d2a4f83)


- หน้าแก้ไขข้อมูลหรือ EDIT นั้นเองครับ 
![image](https://github.com/BoatGT-9/fontend_resful_api/assets/120120321/680204b8-6adb-49c5-bc3d-290366dbb7f5)

-------------------------------------------------------------------------------------------------------------
 #                                              THAK U 🤍