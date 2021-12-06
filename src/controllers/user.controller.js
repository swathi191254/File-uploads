const express =require("express");

const User = require("../models/user.models");

const upload = require("../multer/file-upload");

const router=express.Router();


router.post("/", upload.single("profile_Pic"), async(req,res)=>{
try{
    const user = await User.create({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        profile_Pic:req.file.path,
    });

    return res.status(201).json({user})

} catch(e){

    return res.status(500).json({ status :"failed", message : e.message})
}

})

router.post("/multiple", upload.any("productImages"), async(req,res)=>{
    const filePaths = req.files.map((file) => file.path)
    try{
        const user = await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            profile_pic:filePaths,
        });
    
        return res.status(201).json({user})
    
    } catch(e){
    
        return res.status(500).json({ status :"failed", message : e.message})
    }
    })


router.patch("/:id",upload.single("profile_Pic"), async (req, res) => {
        try {
          const user = await User.findByIdAndUpdate(req.params.id,{ profile_Pic:req.file.path,
            new: true,
          })
            .lean()
            .exec();
      
          return res.status(201).send(user);
        } catch (e) {
          return res.status(500).json({ message: e.message, status: "Failed" });
        }
});

router.delete("/:id", upload.single("profile_Pic"), async (req, res) => {
        try {
          const user = await User.findByIdAndDelete(req.params.id, {profile_Pic:req.file.path,new : true}).lean().exec();
      
          return res.status(200).send(user);
        } catch (e) {
          return res.status(500).json({ message: e.message, status: "Failed" });
        }
      });
    



module.exports=router;