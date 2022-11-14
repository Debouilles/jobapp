import e from "express";
import express from "express";
import { Service } from "../model/Service.js"
import { User } from "../model/User.js"

const router = express.Router();





router.get("/", async (req, res, next) => {

  try {
    let query = Service.find();
    //let services = await Service.find()
    // .populate('provider')
    // if (services === null) {
    //   res.send(404)
    // } else {
      if (req.query.type) {
        console.log(req.query.type)
        // services =  services.where('type').equals(req.query.type)
        //services = await Service.find().where('type').equals(req.query.type)
        query = query.where('type').equals(req.query.type)

        //console.log(services)

      }
        const maxPage = 10 //Max elements per page
        let page = parseInt(req.query.page, 10);
        if (isNaN(page) || page < 1) {
          page = 1
        }
      
        let pageSize = parseInt(req.query.pageSize, 10);
        console.log('page size', pageSize);
        if (isNaN(pageSize) || pageSize < 0 || pageSize > maxPage) {
          pageSize = maxPage;
        }
        console.log('pagination', page, pageSize);
      
        query = query.skip((page - 1) * pageSize).limit(pageSize)
        // Filter movies by director
        // if (req.query.type){
        //   let query = await Service.where('type').equals(req.query.type);
        //   res.send(query)
        //   res.status(200)
        //   return
        // }
        const services = await query.sort({date : 1});
         res.send(services);
        
      // res.status(200)
      // res.send(services);
    // }

  } catch (e) {
    next(e)
  }
});


//  GET -------------------------------------------------------------------------------
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
    // res.send(e)
    next(e)
  }
});

//QUERIES

//   router.get('/serviceSearch', async (req, res) => {
//     let query = await Service.find();
//     console.log(query)
//     console.log(req.query.name)
//     // Filter movies by director
//     if (ObjectId.isValid(req.query.name)) {
//       query = query.where('name').equals(req.query.name);
//     }
//     query.exec(function(err, services) {
//       if (err) {
//         return next(err);
//       }
//       res.send(services);
//     });
// })


router.get('/searchModule', async function (req, res, next) {
  // let query = Service.find();
  // console.log(query)
  // // Filter movies by director
  // if (ObjectId.isValid(req.query.titre)) {
  //   query = query.where('director').contains(req.query.titre);
  // }
  // // Execute the query
  // query.exec(function(err, services) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.send(services);
  // });

  try {
    // const s = req.query.type
    // console.log(req.query)
    // const regex = new RegExp(s, 'i') // i for case insensitive
    //  let theResult = await Service.find({type: {$regex: regex}})
    // res.send(theResult)
    let query = await Service.find({});
    res.send(query)
    /*if (ObjectId.isValid(req.query.type)) {
      query = query.where('type').equals(req.query.type);
    }
    */
    // Execute the query
    /*query.exec(function (err, services) {
      if (err) {
        return next(err);
      }
      res.send(services);
    });*/

  } catch (error) {
    next(error)
  }

});

//  POST -----------------------------------------------------------------------------------------------
// /services
// NOTE: ID doit être un user
router.post("/", async (req, res, next) => {
  //A FAIRE !! check si l'utilisateur existe!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  try {
    const result = await User.findOne({ _id: req.body.provider }).select("_id").lean()
    if (result === null) {
      res.status(404).send('The user doesn\'t exists')
      return
    }
    const newService = await new Service({
      titre: req.body.titre,
      type: req.body.type,
      date: req.body.date,
      provider: result,
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
router.delete("/:id", async (req, res) => {

  try {
    const service = await Service.findByIdAndDelete(req.params.id)
    res.status(200)
    res.send(service);
  } catch (e) {
    res.send(e)
  }
});

//  PUT 
// /services/:id
router.put("/:id", async (req, res) => {
  let modif = req.body
  try {
    await Service.findByIdAndUpdate(req.params.id, modif)
  } catch (e) {
    res.send(e)
  }
});

export default router;