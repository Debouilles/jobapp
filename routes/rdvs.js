import express from "express";
import { RDV } from "../model/Rdv.js";
import { Service } from "../model/Service.js"
import { User } from "../model/User.js"
import { broadcastMessage } from '../ws.js';
import { authenticate } from "./login.js";
import { failedOperationOnId } from "./services.js";

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;


const router = express.Router();



//functions

async function loadRdv(req, res, next) {
  const rdvId = req.params.id;
  if (!ObjectId.isValid(rdvId)) {
    return failedOperationOnId(res,rdvId)
  }

  const rdv = await RDV.findById(req.params.id);
  if (!rdv) {
    return failedOperationOnId(res,rdvId)
  }

  req.rdv = rdv;
  next();
}


function checkRdvOwner(req, res, next){

  let isOwner = req.rdv.provider.toString() === req.currentUserId;
  if(!isOwner){
    return res.status(403).send('You don\'t have the permissions to access this data')
  }
  next();
}


function checkRdvOwnerOrReciever(req, res, next){
  console.log(req.service)
  let isOwner = req.rdv.provider.toString() === req.currentUserId || req.rdv.reciever.toString() === req.currentUserId ;
  if(!isOwner){
    return res.status(403).send('You don\'t have the permissions to access this data')
  }
  next();
}



//GET
router.get("/", async (req, res, next) => {
  try {
    const rdvs = await RDV.find({}).populate('relatedService provider reciever')
    res.status(200).send(rdvs)
    // res.status(200)
  } catch (e) {
    next(e)
  }
});


router.get("/:id",authenticate, loadRdv, checkRdvOwnerOrReciever, async (req, res, next) => {
  //finds rdv by ID
  try {
    const rdv = await RDV.findById(req.params.id)
    if (rdv === null) {
      res.status(404)
    } else {
      await rdv.populate('relatedService provider reciever')
      res.send(rdv);
    }
  } catch (e) {
    next(e)
  }
});


//  POST 
// /rdvs
router.post("/", authenticate ,async (req, res, next) => {
  try {
    const theService = await Service.findOne({ _id: req.body.relatedService })
    const resultService = theService._id;
    const resultProvider =  theService.provider;
    // const resultReciever = await User.findOne({ _id: req.body.reciever }).select("_id")
    //fait avec auth maintenant
    console.log(req.currentUserId)
    const resultReciever = req.currentUserId;
    //400 si le reciever est le même id que le provider
    if (resultReciever === resultProvider.toString()) {
      res.status(400).send('The provider and the reciever can\'t be the same person')//bonne erreur????
      return
    }
    //verif si y a pas deja un RDV
    const existingRdv = await RDV.countDocuments({ relatedService: resultService });

    //400 si un service a déjà un RDV associé
    if (existingRdv) {
        return res.status(400).send('There\'s already a meeting for this service')
      }
  
    //note: provider pris automatiquement du service
    const newRdv = new RDV({
      relatedService: resultService,
      provider: resultProvider,
      reciever: resultReciever,
      isAccepted: req.body.isAccepted
    })

    await newRdv.save()
    res.status(200)
    res.send(newRdv);

    broadcastMessage({ rendezvous: newRdv });

  } catch (e) {
    // res.send(e)
    next(e)
  }
});


router.delete("/:id", authenticate , loadRdv, checkRdvOwner, async (req, res) => {
  try {
    res.send(req.rdv);
    const rdv = await RDV.findByIdAndDelete(req.params.id)
    res.status(200).send('RDV deleted')
    
  } catch (e) {
    res.send(e)
  }
});



router.put("/:id", authenticate , loadRdv, checkRdvOwner, async (req, res) => {
  try {
    let modif = req.body
    await RDV.findByIdAndUpdate(req.params.id, modif)
    res.status(200).send('Modification applied with success')
  } catch (e) {
    res.send(e)
  }
});
export default router;