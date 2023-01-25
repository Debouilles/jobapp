export class Service {
    _id: string;
    picture: string;
    location: any;
    titre: string;
    date: Date;
    type: string;
    description: string;



    constructor(

      picture: string,
      location: any,
      titre: string,
      type: string,
      date: Date,
      description: string,
    

  ) {

      this.picture = picture;
      this.location = location;
      this.titre = titre;
      this.date = date;
      this.type = type;
      this.description = description;

  }

  };

