import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

//Contains Id , alive status and padding for each drone
class DroneData{
  id:number;
  alive: boolean;
  topPadding: number;
  leftPadding: number;
  constructor(id:number,alive:boolean,topPadding:number,leftPadding:number){
    this.id = id;
    this.alive = alive;
    this.topPadding = topPadding;
    this.leftPadding = leftPadding;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'FlyBase-Drone';

  //Getting Scroll ElementRef to Restrict the Scroll on Top and Left
  @ViewChild('scroll') scroll!:ElementRef ; 

  //To Store the height and width of the Screen to Scroll Automatically
  windowHeight!:number;
  windowWidth!:number;

  //Array Of DroneData Objects
  dronesArray:DroneData[]=[];

  selectedDrone:number=-1;
  keysList:String[] = ["a","w","s","d","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];
  freezeDrones:boolean = false;

  constructor(){

  }
  //Listner on KeyDown to fly the drone 
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {

      //checking Drone is Selected and the drones are not frozen and the key we pressed the valid control
      if(this.selectedDrone!=-1 && !this.freezeDrones && this.keysList.includes(event.key)){

        //Assinging the value to Attributes in scroll element to Scroll Automatically
        this.windowHeight = this.scroll.nativeElement.scrollHeight;
        this.windowWidth = this.scroll.nativeElement.scrollWidth;

        //Storing the offsetTop of parent and also storing the top and left offest of Child to Restrict the drones
        let scrollTop = this.scroll.nativeElement.offsetTop;
        let childTop = this.scroll.nativeElement.children[0].children[this.selectedDrone].children[0].offsetTop;
        let childLeft = this.scroll.nativeElement.children[0].children[this.selectedDrone].children[0].offsetLeft;


        //Checking the key pressed and also if the top is not restricted
        if((event.key=="ArrowUp" || event.key=="w") && childTop>scrollTop)
          this.dronesArray[this.selectedDrone].topPadding -=25 ;

        //checking the keyPress
        if(event.key=="ArrowDown" || event.key=="s")
          this.dronesArray[this.selectedDrone].topPadding +=25 ;

        //Checking the key pressed and also if the Left is not restricted
        if((event.key=="ArrowLeft" || event.key=="a") && childLeft>0)
          this.dronesArray[this.selectedDrone].leftPadding -=25 ;
    
        //checking the keyPress
        if(event.key=="ArrowRight" || event.key=="d")
          this.dronesArray[this.selectedDrone].leftPadding +=25 ;

      }

      //checking Drone is Selected and keyPressed is Delete
      if(this.selectedDrone!=-1 && event.key=="Delete"){
        this.dronesArray[this.selectedDrone].alive= false;
        this.selectedDrone = -1;

      }
      
  }

  //Adding a new DroneData object to the DroneArray
  addDrone(){
    let length = this.dronesArray.length;
    const newDrone = new DroneData(length==0? 0 : length,true,0,0);
    this.dronesArray.push(newDrone);    

    // Assinging the value to Attributes in scroll element to Scroll Automatically
    this.windowHeight = this.scroll.nativeElement.scrollHeight;
  }

  //Destroying all the Drones
  destroy(){
    this.dronesArray=[];
    this.selectedDrone = -1;
  }


}
