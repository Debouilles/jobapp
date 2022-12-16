import { Component } from "@angular/core";

// Custom type that represent a tab data.
declare type PageTab = {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
};

@Component({
  selector: "app-layout",
  templateUrl: "layout.page.html",
  styleUrls: ["layout.page.scss"],
})
export class LayoutPage {
  tabs: PageTab[];

  constructor() {
    this.tabs = [
      { title: "Nouveau service", icon: "add", path: "create-service" },
      { title: "Carte des services", icon: "map", path: "service-carte" },
      { title: "Liste des services", icon: "list", path: "service-list" },
    ];
  }
}