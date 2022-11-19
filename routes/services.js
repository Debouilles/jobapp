import e from "express";
import express from "express";
import { ObjectId } from 'bson';
import { Service } from "../model/Service.js"
import { User } from "../model/User.js"
import { idCheckValidity } from "./users.js";
import { authenticate } from "./login.js";
import mongoose from "mongoose";





//Fonctions-----------------------------------

export function failedOperationOnId(res, id) {
  return res.status(404).type('text').send(id + ' is an invalid ID');
}

function checkServiceOwner(req, res, next){
  console.log(req.service)
  let isOwner = req.service.provider.toString() === req.currentUserId;
  if(!isOwner){
    return res.status(403).send('You don\'t have the permissions to access this data')
  }
  next();
}


async function loadService(req, res, next) {
  const serviceId = req.params.id;
  if (!ObjectId.isValid(serviceId)) {
    return failedOperationOnId(res,serviceId)
  }

  const service = await Service.findById(req.params.id);
  if (!service) {
    return failedOperationOnId(res,serviceId)
  }

  req.service = service;
  next();
}




//Routes---------------------------------------
const router = express.Router();




router.get("/", async (req, res, next) => {
  const links = {};

  try {
    let query = Service.find();
    let users = await User.find();
    const totalServices = await Service.count();
    console.log(req.query)
    //QUERIES-----------------------------------------------------------------------
    //note: switch avec (true) marchait pas. donc si imbriqué, sorry
    //PROVIDER------------------------------
    if (req.query.provider) {
      if (Array.isArray(req.query.provider)) {
        const user = req.query.provider.filter(ObjectId.isValid);
        //marche pas si array
        query = query.where('provider').in(users);
      } else if (ObjectId.isValid(req.query.provider)) {
        query = query.where('provider').equals(req.query.provider);
      }
    }
    //Type-------------------------------
    if (req.query.type) {
      //!!!! Marche pas si accent !!!!
      query = query.where('type').equals(req.query.type)
    }
    //Date------------------------------
    if (req.query.date) {
      //!!!! Marche pas si accent !!!!
      query = query.where('date').equals(req.query.date)
    }


    //PAGINATION------------------------------------------------------------------
    // const maxPage = 10 //base pour le parseInt
    let page = parseInt(req.query.page, 10);
    if (isNaN(page) || page < 1) {
      page = 1
    }

    let pageSize = parseInt(req.query.pageSize, 10);
    console.log('page size', pageSize);
    if (isNaN(pageSize) || pageSize < 0 || pageSize > 10) {
      pageSize = 10;
    }
    console.log('pagination', page, pageSize);


    // res.set('Pagination-Page', page);
    // res.set('Pagination-PageSize', pageSize);
    // res.set('Pagination-Total', totalServices);


    query = query.skip((page - 1) * pageSize).limit(pageSize)
    const services = await query.sort({ date: 1 });//sort ascendant par date
    // res.send(services);
    res.send({
      page: page,
      pageSize: pageSize,
      total: totalServices,
      data: services
    });

  } catch (e) {
    next(e)
  }
});


//  ROUTES -------------------------------------------------------------------------------
// /services/:id

router.get("/:id", async (req, res, next) => {
  //finds user by ID
  try {
    const theService = await Service.findById(req.params.id)
    if (theService === null) {
      console.log('No results found');
      //correct de la throw ici si null? --------------------------------------------------????
      //car vu que pas d'erreur je peux pas envoyer à next()
      res.status(404)
    } else {
      await theService.populate('provider')
      res.send(theService);
    }
  } catch (e) {
    next(e)
  }
});


//  POST -----------------------------------------------------------------------------------------------
// /services
router.post("/", authenticate , async (req, res, next) => {
  try {
    idCheckValidity(req.body.provider)
    const newService = await new Service({
      titre: req.body.titre,
      type: req.body.type,
      date: req.body.date,
      provider: req.currentUserId,
      picture: req.body.picture,
      location: req.body.location,
    })
      .save()
    res.status(200)
    res.send(newService);
  } catch (e) {
    // res.send(e)
    next(e)
  }

});


//DELETE
// /services/:id
router.delete("/:id", authenticate , loadService, checkServiceOwner, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id)
    res.status(200).send("service deleted")
    // res.send(service);
  } catch (e) {
    res.send(e)
  }
});

//  PUT 
// /services/:id
router.put("/:id", authenticate, checkServiceOwner,  async (req, res) => {
  let modif = req.body
  try {
    await Service.findByIdAndUpdate(req.params.id, modif)
  } catch (e) {
    res.send(e)
  }
});




export default router;