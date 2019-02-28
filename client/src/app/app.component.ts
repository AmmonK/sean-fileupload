import { Component, OnInit, ViewChild } from "@angular/core";
import { FruitService } from "./fruit.service";
import { Fruit } from "./fruit";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  fruits: Fruit[];
  newFruit: Fruit = new Fruit();

  @ViewChild("fileInput")
  fileInput;

  onFileChanged($event) {
    this.newFruit.image = $event.target.files[0];
  }

  getFruit() {
    this.fruitService.getFruit().subscribe(f => (this.fruits = f));
  }

  onSubmit() {
    console.log(this.newFruit);
    this.fruitService.addFruit(this.newFruit).subscribe(f => {
      this.newFruit = new Fruit();
      this.fileInput.nativeElement.value = null;
      this.getFruit();
    });
  }

  constructor(private fruitService: FruitService) {}
  ngOnInit() {
    this.getFruit();
  }
}
