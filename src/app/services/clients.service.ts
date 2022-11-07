import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Client} from "../interfaces/client";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private clients: Client[] = [{
    username: 'johnsonjw48',
    nom: 'Johnson',
    prenom: 'James',
    age: 25
  }];

  clientsSubject: BehaviorSubject<Client[]> = new BehaviorSubject(<Client[]>[]);

  constructor() { }

  dispatchClients (): void {
    this.clientsSubject.next(this.clients)
  }

  getClients (): Client[] {
    this.dispatchClients();
    return this.clients;
  }

  addClients (client: Client): void {
    const uniqueClient:any = this.clients.filter(user => user.username === client.username)
    if (uniqueClient.length === 0) {
      this.clients.push(client)
      this.dispatchClients();
    } else {
      throw " Le nom d'utilisateur existe déja "
    }

  }

  deleteClients (username: string): void {
    const clientId:number = this.clients.findIndex(client => client.username === username)
    this.clients.splice(clientId, 1);
  }

}
