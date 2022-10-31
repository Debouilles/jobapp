
import express from "express";
import { RDV } from "../model/Rdv.js"
const router = express.Router();

//RDV

//  GET
// /rdvs
router.get("/", (req, res) => {
    RDV.find().sort('titre').exec(function (err, theRdv) {
        if (err) {
            return next(err);
        }
        res.send(theRdv);
    });
});


//  POST 
// /users
router.post("/", (req, res) => {
    //générer l'ID tout seul?
    const newRdv = new RDV({
        RDV_ID: req.body.RDV_ID,
        provider: req.body.provider,
        reciever: req.body.reciever,
        isAccepted: req.body.isAccepted
    })
    if (!newRdv.RDV_ID || !newRdv.provider || !newRdv.reciever) {
        return res.sendStatus(400);
    } else {
        newRdv
            .save()
            .then(
                () => console.log("One entry added"),
                (err) => console.log(err)
            );
    }

});


export default router;