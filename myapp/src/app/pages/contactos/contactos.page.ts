import { Component, OnInit } from '@angular/core';
import { Contacts, Contact, ContactField, ContactName} from '@ionic-native/contacts/ngx';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.page.html',
  styleUrls: ['./contactos.page.scss'],
})
export class ContactosPage implements OnInit {

  contactsList: any;

  constructor(private contacts: Contacts) {
    this.getContacts();
   }

  ngOnInit() {
  }

  getContacts() {
    this.contacts.find(['displayName', 'phoneNumbers'], {filter: "", multiple: true})
    .then(data => {
      // data contiene la lista de contactos
      console.log(data);

      //puedes procesar los contactos como deees y mostrarlos en tu aplicacion
      this.contactsList = data;
    })
    .catch(error => {
      console.log(error);
    });
  }

}
