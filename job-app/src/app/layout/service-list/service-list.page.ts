import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.page.html',
  styleUrls: ['./service-list.page.scss'],
})

export class services{
  serviceApiUrl = '';
  serviceData = {
    _id: '',
    titre:'',
    // type: '',
    // date: '',
    // provider: '',
    // location:''


  }



constructor(public http: HttpClient) {


    this.readAPI('https://jobapp.onrender.com/services')
      .subscribe((data) => {
        console.log(data);

        // this.serviceData.titre = data[0].titre;
        // console.log(this.serviceData.titre)
      });
  
  }
  


readAPI(URL: string){
  return this.http.get(URL)
}

}
// export class ServiceListPage implements OnInit {


// constructor(public http: HttpClient) {


//   this.readAPI('https://jobapp.onrender.com/services')
//     .subscribe((data) => {
//       console.log(data);
//     });

// }
// readAPI(URL: string) {
//   return this.http.get(URL);
// }

// ngOnInit() {

// }
//}


