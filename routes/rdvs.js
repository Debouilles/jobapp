import express from "express";
import { RDV } from "../model/Rdv.js";
const router = express.Router();

//GET
router.get("/", async (req, res, next) => {

    try {
        const rdvs = await RDV.find({})
        res.status(200)
        res.send(rdvs);
      } catch(e) {
        res.send(e)
      }



    // RDV.find().sort('titre').exec(function (err, theRdv) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.send(theRdv);
    // });
});


//  POST 
// /users
router.post("/", async (req, res, next) => {
    //générer l'ID tout seul?
   
    try {
        const newRdv = await new RDV({
            RDV_ID: req.body.RDV_ID,
            provider: req.body.provider,
            reciever: req.body.reciever,
            isAccepted: req.body.isAccepted
        })
        .save()
        res.status(200)
        res.send(newRdv);
      } catch(e) {
        res.send(e)
      }
   

    // const newRdv = new RDV({
    //     RDV_ID: req.body.RDV_ID,
    //     provider: req.body.provider,
    //     reciever: req.body.reciever,
    //     isAccepted: req.body.isAccepted
    // })
    // if (!newRdv.RDV_ID || !newRdv.provider || !newRdv.reciever) {
    //     return res.sendStatus(400);
    // } else {
    //     newRdv
    //         .save()
    //         .then(
    //             () => console.log("One entry added"),
    //             (err) => console.log(err)
    //         );
    // }

});


export default router;