import { Injectable } from "@angular/core";
// import { delay, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class DynamicDatabase {
  dataMap = new Map<string, string[]>([
    ["Fruits", ["Apple", "Orange", "Banana"]],
    ["Vegetables", ["Tomato", "Potato", "Onion"]],
    ["Apple", ["Fuji", "Macintosh"]],
    ["Onion", ["Red", "LightRed"]],
    ["Macintosh", ["Yellow", "White", "Purple"]],
    ["Red", ["DarkRed", "DarkRed2"]]
  ]);

  // this can also come from database as initial data
  rootLevelNodes: string[] = ["Fruits", "Vegetables"];

  // getChildren(node: string) {
  //   // adding delay to mock a REST API call
  //   return of(this.dataMap.get(node)).pipe(delay(1000));
  // }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}