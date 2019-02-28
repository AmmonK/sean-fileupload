import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Fruit } from "./fruit";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FruitService {
  constructor(private http: HttpClient) {}

  url: string = "http://localhost:5000/fruit/";

  getFruit(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(this.url);
  }

  addFruit(newFruit: Fruit): Observable<Fruit> {
    const formData = new FormData();
    formData.append("image", newFruit.image);
    formData.append("name", newFruit.name);
    return this.http.post<Fruit>(this.url, formData);
  }
}
