import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientsService} from "../services/clients.service";
import {Client} from "../interfaces/client";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  clientForm!: FormGroup;
  clients!: Client[];
  error: string|undefined = undefined;


  constructor(private clientsService: ClientsService,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initClientsForm();
    this.getAllClients();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  initClientsForm (): void {
    this.clientForm = this.fb.group({
      username: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]]
    })
  }

  onSubmitForm (): void {
    try {
      this.error = undefined;
      this.clientsService.addClients(this.clientForm.value);
      console.log(this.clientForm.controls.age.errors)
      this.clientForm.reset();
    } catch (e) {
      this.error = e;
    }
  }

  getAllClients () {
    this.subscription = this.clientsService.clientsSubject.subscribe({
      next: value => this.clients = value
    })
    this.clientsService.getClients();
  }

  onDeleteClient (username:string) {
    this.clientsService.deleteClients(username);
  }

}
