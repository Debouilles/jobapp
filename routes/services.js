import e from "express";
import express from "express";
import { Service } from "../model/Service.js"
import { User } from "../model/User.js"

const router = express.Router();





router.get("/", async (req, res, next) => {

  try {
    const services = await Service.find({})
    if(services === null){
      res.send(404)
     } else{
      res.status(200)
      res.send(services);
     }

  } catch(e) {
    res.send(e)
  }
});


//  GET 
// /services/:id

router.get("/:id",async (req, res, next) => {
    //finds user by ID
    try {
      const theService = Service.findById(req.params.id, function (err, service) {
        if(service === null) {
           console.log('No results found');
           //correct de la throw ici si null? --------------------------------------------------????
          res.status(404)
        }
        res.send(service)
      });
    } catch(e) {
      // res.send(e)
      next(e)
    }
});

//  POST 
// /services
// NOTE: ID doit être un user
router.post("/", async (req, res, next) => {
    //A FAIRE !! check si l'utilisateur existe!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    try {
      const result = await User.findOne({ _id: req.body.provider }).select("_id").lean()
      const newService = await new Service({
                titre: req.body.titre,
                type: req.body.type,
                date: req.body.date,
                provider: result,
                location: req.body.location,
      })
      .save()
      res.status(200)
      res.send(newService);
    } catch(e) {
      // res.send(e)
      next(e)
    }


    // User.findOne({ _id: req.body.provider }).select("_id").lean().then(result => {
    //     if (result) {
    //         const newService = new Service({
    //             titre: req.body.titre,
    //             type: req.body.type,
    //             date: req.body.date,
    //             provider: result._id,
    //             location: req.body.location,
    //         })
    //         console.log(req.body.location);
    //         console.log(newService.location);
    //         //check si les champs sont correctes (note: marche pas avec location idk why)
    //         if (!newService.titre || !newService.type || !newService.date || !newService.provider || !newService.location) {
    //             console.log(newService)
    //             console.log("elem. manquant")
    //             return res.sendStatus(400);
    //         } else {
    //             //push si tout est OK
    //             newService
    //                 .save(function (err) {
    //                     if (err) {
    //                         return console.warn('Could not save service because: ' + err.message);
    //                     }
    //                 });
    //             console.log('Saved service');
    //             return res.sendStatus(200);
    //         }
    //     } else {
    //         return res.sendStatus(400);
    //     }
    // });
});


//DELETE
// /services/:id
router.delete("/:id", async (req, res) => {

  try {
    const service = await Service.findByIdAndDelete(req.params.id)
    res.status(200)
    res.send(service);
  } catch(e) {
    res.send(e)
  }



  
    // Service.findByIdAndDelete(req.params.id, function (err, service) {
    //   if (err) {
    //     console.log(err)
    //     res.sendStatus(400)
    //   }
    //   else {
    //     console.log("Deleted : ", service);
    //     res.sendStatus(200)
    //   }
    // });
  });

//  PUT 
// /services/:id
router.put("/:id", async (req, res) => {
  let modif = req.body
  try {
   await Service.findByIdAndUpdate(req.params.id, modif)
  } catch(e) {
    res.send(e)
  }
    // let theObject = {}
    // if (req.body.titre) {
    //   theObject.titre = req.body.titre
    // }
    // if (req.body.type) {
    //   theObject.type = req.body.type
    // }
    // console.log(theObject)
  
    // Service.findByIdAndUpdate(req.params.id, theObject, function (err, service) {
    //   if (err) {
    //     console.log(err)
    //     res.sendStatus(400);
    //   }
    //   else {
    //     res.sendStatus(200);
    //   }
    // });
  
  });

export default router;