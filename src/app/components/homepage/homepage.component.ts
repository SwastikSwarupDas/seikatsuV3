import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, GeoLocation, Properties } from 'src/app/services/api.service';
import {} from 'googlemaps';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [MessageService]
})
export class HomepageComponent {

  selectedCity: string | null = null;
  selectedPropertyType: string | null = null;
  showOptions = false;
  showOptionsProperty = false;

  location: GeoLocation = {
    longitude:0,
    latitude:0
  }



  value:number=50;
 
  
  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }
  toggleOptionsProperty(): void {
    this.showOptionsProperty = !this.showOptionsProperty;
  }


  loaded:boolean=false;
  fg:FormGroup;
  properties: Properties[] = [];
  filteredProperties: Properties[] = [];

  recomProperties:Properties[]=[];
  reraProperties:Properties[]=[];
  zeroProperties:Properties[]=[];


  constructor(private apiService: ApiService,fb:FormBuilder,private router:Router, private messageService: MessageService) {
    this.fg=fb.group({
      fc:'',
      property:'Flat',
    })
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Eligible for Home Loan', detail: 'Apply now for quick processing' });
}

  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.fetchProperties();
    this.fg.get('fc')?.valueChanges.subscribe(() => {
      this.search();
  });
  this.fg.get('property')?.valueChanges.subscribe(()=>{
    this.search();
  });

  this.responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];

  }

  selectCity(city: string): void {
    this.selectedCity = city;
    this.fg.get('fc')?.setValue(city); // Update the form control 'fc' value
    this.showOptions = false; // Hide options after selection
  }

  selectPropertyType(property:string):void{
    this.selectedPropertyType=property;
    this.fg.get('property')?.setValue(property);
    this.showOptionsProperty = false;
  }


  

  fetchProperties() {
    this.apiService.getAllProperties().subscribe(properties => {
      this.properties = properties;
      this.filteredProperties=properties;
      this.loaded=true;
      console.log(properties);

      this.properties = this.shuffleArray(this.properties);
      this.recomProperties = this.properties.slice(0, 4);
      this.reraProperties = this.properties.filter(property => property.reraApproved === 'Yes').slice(0, 4);
      this.zeroProperties = this.properties.filter(property => property.zeroBrokerage === 'Yes').slice(0, 4);
      
    });
  }

  shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

  
    while (0 !== currentIndex) {
     
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }




  search(){
    let searchQuery=this.fg.get('fc')?.value.toLowerCase();
    let selectedProperty = this.fg.get('property')?.value.toLowerCase();
    this.filteredProperties = this.properties.filter((item) => {
      const locationMatches = item.locationName.toLowerCase().includes(searchQuery);
      const propertyMatches = item.propertyType.toLowerCase() === selectedProperty;
  
      // Filter based on both search query and selected property type
      return locationMatches && propertyMatches;
    });
  }
  sortPropertiesByPriceAsc() {
    this.filteredProperties.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return priceA - priceB;
    });
}
sortPropertiesByPriceDesc(){
  this.filteredProperties.sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    return priceB - priceA;
});
}

propertyClick(){
  this.router.navigate(['/details']);
}
}
