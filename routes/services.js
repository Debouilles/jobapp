import express from "express";
import { Service } from "../model/Service.js"
import { User } from "../model/User.js"

const router = express.Router();





router.get("/", (req, res) => {
    Service.find().sort('name').exec(function (err, services) {
        if (err) {
            return next(err);
        }
        res.send(services);
    });
});


//  GET 
// /services/:id

router.get("/:id", (req, res) => {
    //finds user by ID
    Service.findById(req.params.id, function (err, service) {
        //return erreur si pas trouvé
        if (err) return res.sendStatus(404)
        return res.json(service)
    });
});

//  POST 
// /services
// NOTE: ID doit être un user
router.post("/", (req, res) => {
    //check si l'utilisateur existe
    User.findOne({ _id: req.body.provider }).select("_id").lean().then(result => {
        if (result) {
            const newService = new Service({
                titre: req.body.titre,
                type: req.body.type,
                date: req.body.date,
                provider: result._id,
                location: req.body.location,
            })
            console.log(req.body.location);
            console.log(newService.location);
            //check si les champs sont correctes (note: marche pas avec location idk why)
            if (!newService.titre || !newService.type || !newService.date || !newService.provider || !newService.location) {
                console.log(newService)
                console.log("elem. manquant")
                return res.sendStatus(400);
            } else {
                //push si tout est OK
                newService
                    .save(function (err) {
                        if (err) {
                            return console.warn('Could not save service because: ' + err.message);
                        }
                    });
                console.log('Saved service');
                return res.sendStatus(200);
            }
        } else {
            return res.sendStatus(400);
        }
    });
});


//DELETE
// /services/:id
router.delete("/:id", (req, res) => {
    Service.findByIdAndDelete(req.params.id, function (err, service) {
      if (err) {
        console.log(err)
        res.sendStatus(400)
      }
      else {
        console.log("Deleted : ", service);
        res.sendStatus(200)
      }
    });
  });

//  PUT 
// /services/:id
router.put("/:id", (req, res) => {
    let theObject = {}
    if (req.body.titre) {
      theObject.titre = req.body.titre
    }
    if (req.body.type) {
      theObject.type = req.body.type
    }
    console.log(theObject)
  
    Service.findByIdAndUpdate(req.params.id, theObject, function (err, service) {
      if (err) {
        console.log(err)
        res.sendStatus(400);
      }
      else {
        res.sendStatus(200);
      }
    });
  
  });

export default router;