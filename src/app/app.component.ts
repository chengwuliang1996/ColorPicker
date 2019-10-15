import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, DoCheck, ChangeDetectorRef } from '@angular/core';
import { defaultColor } from "./defaultColor.component";

@Component({
  selector: 'app-root',
  inputs: ['name'],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  showColor : boolean = true;
  title : string = 'Color Picker!';
  redVal : number = 0;
  greenVal : number = 0;
  blueVal : number = 0;
  color : string = "rgb("+this.redVal+", "+this.greenVal+", "+this.blueVal+")";
  altOpts = [
    new defaultColor("White", [255,255,255]),
    new defaultColor("Gray", [128,128,128]),
    new defaultColor("Black", [0,0,0]),
    new defaultColor("Red", [255,0,0]),
    new defaultColor("Yellow",[255,255,0]),
    new defaultColor("Green", [0,128,0]),
    new defaultColor("Blue", [0,0,255]),
    new defaultColor("Purple", [128,0,128]),
    new defaultColor("Maroon", [128,0,0]),
    new defaultColor("Olive", [128,128,0])
  ]
  opts = [];
  selectedOpt : defaultColor = new defaultColor("White", [255,255,255]);
  myText : string = "default";

  constructor() {  
  }

  file : File;
  lines : any;
  onClick(e) {
    this.file = e.target.files[0];
    var fileReader = new FileReader();
    let compareFile = new File([""], "defaultColors.txt");
    fileReader.onloadend = (e) => {
      this.lines = fileReader.result.split('\n');
      console.log(this.lines);
      console.log(this.file);
      console.log(compareFile);
   };

    fileReader.readAsText(this.file);
  }

  importColors() :void {
    this.opts = [];
    for (var i = 0; i < this.lines.length; i++){
      var temp = this.lines[i].split(',');
      this.opts.push(new defaultColor(temp[0], [temp[1],temp[2],temp[3]]));
      this.altOpts.push(new defaultColor(temp[0], [temp[1],temp[2],temp[3]]));
    }
    for (var i =0; i < this.opts.length; i++){
      console.log(this.opts[i].name + "   " + this.opts[i].rgbVal);
    }
  }

  changeColor(colorName) : void{
    this.selectedOpt = null;
    for (var i = 0; i < this.opts.length; i++)
    {
      if (this.opts[i].name == colorName) {
        this.selectedOpt = new defaultColor(this.opts[i].name, this.opts[i].rgbVal);
      }
    }
    this.redVal = this.selectedOpt.rgbVal[0];
    this.greenVal = this.selectedOpt.rgbVal[1];
    this.blueVal = this.selectedOpt.rgbVal[2];
  }

  ngDoCheck(): void {
    if (this.color !== "rgb("+this.redVal+", "+this.greenVal+", "+this.blueVal+")") {
      this.color = "rgb("+this.redVal+", "+this.greenVal+", "+this.blueVal+")";
    }
  }

  colorClick(event) : void {
    event = event || window.event;
    var target = event.target || event.srcElement;

    for (var i = 0; i < this.opts.length; i++)
    {
      if (this.opts[i].name == target.id) {
        this.redVal = this.opts[i].rgbVal[0];
        this.greenVal = this.opts[i].rgbVal[1];
        this.blueVal = this.opts[i].rgbVal[2];
      }
    }    
  }

  toggleColor() : void {
    this.showColor = !this.showColor;
  }

  test(event) : void {
    event = event || window.event;
    var target = event.target || event.srcElement;
    console.log(target.id);
    for (var i = 0; i < this.opts.length; i++)
    {
      if (this.opts[i].name == target.id) {
        this.redVal = this.opts[i].rgbVal[0];
        this.greenVal = this.opts[i].rgbVal[1];
        this.blueVal = this.opts[i].rgbVal[2];
      }
    }
  }
}
