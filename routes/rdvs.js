import express from "express";
import { RDV } from "../model/Rdv.js";
import { Service } from "../model/Service.js"
import { User } from "../model/User.js"
const router = express.Router();

//GET
router.get("/", async (req, res, next) => {
  try {
    const rdvs = await RDV.find({}).populate('relatedService provider reciever')

    // await rdvs.populate('relatedService')
    // await rdvs.populate('provider')
    // await rdvs.populate('reciever')
    res.send(rdvs)
    // res.status(200)
  } catch (e) {
    next(e)
  }



  // RDV.find().sort('titre').exec(function (err, theRdv) {
  //     if (err) {
  //         return next(err);
  //     }
  //     res.send(theRdv);
  // });
});


//  POST 
// /rdvs
router.post("/", async (req, res, next) => {
  try {
    const theService = await Service.findOne({ _id: req.body.relatedService }).lean()
    // console.log(theService)
    const resultService = await Service.findOne({ _id: theService._id }).select("_id").lean();
    const resultProvider = await Service.findOne({ _id: theService._id }).select("provider").lean();
    // const resultProvider = await User.findOne({ _id: req.body.provider }).select("_id").lean()
    const resultReciever = await User.findOne({ _id: req.body.reciever }).select("_id").lean()
    if (resultReciever._id.equals(resultProvider.provider)) {
      res.status(400).send('The provider and the reciever can\'t be the same person')//bonne erreur????
      return
      // !!---- ICI FAIT UNE ERREUR CHELOU SI Y A LES MEME ID, mais empeche l'ecriture quand même !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
    //note: provider pris automatiquement du service
    const newRdv = new RDV({
      relatedService: resultService,
      provider: resultProvider.provider,
      reciever: resultReciever,
      isAccepted: req.body.isAccepted
    })
    // console.log(newRdv.reciever)
    // console.log(newRdv.provider)

    await newRdv.save()
    res.status(200)
    res.send(newRdv);
  } catch (e) {
    // res.send(e)
    next(e)
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