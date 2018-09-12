import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, Slides, MenuController, Platform } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import { TranslateService } from '@ngx-translate/core';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {

  slider: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  currentItems: Item[];
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
    public items: Items,
    public modalCtrl: ModalController,
    public menu: MenuController,
    public translate: TranslateService,
    public platform: Platform) {
    this.currentItems = this.items.query();

    this.dir = platform.dir();
    translate.get(["ANGULAR",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "IONIC",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "ANDROID",
      "TUTORIAL_SLIDE3_DESCRIPTION",
      "ASP_DOTNET",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "PHP",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "JAVA",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {
        console.log('Loaded values', values);
        this.slider = [
          {
            title: values.ANGULAR,
            description: values.TUTORIAL_SLIDE1_DESCRIPTION,
            image: 'assets/img/all-tech-icon/angular.png',
          },
          {
            title: values.IONIC,
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/img/all-tech-icon/ionic.png',
          },
          {
            title: values.ANDROID,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/all-tech-icon/android.png',
          },
          {
            title: values.ASP_DOTNET,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/all-tech-icon/asp.net.png',
          },
          {
            title: values.PHP,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/all-tech-icon/php.png',
          },
          {
            title: values.JAVA,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/all-tech-icon/java.png',
          }
        ];
      });
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }



  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
