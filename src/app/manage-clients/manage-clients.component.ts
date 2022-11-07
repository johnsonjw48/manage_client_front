import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientsService} from "../services/clients.service";
import * as XLSX from 'xlsx';
import {Client} from "../interfaces/client";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit {
  manageForm!: FormGroup;
  currentFile!: any
  currentFileData!: any[];



  constructor(private clientsService: ClientsService,
              private fb: FormBuilder,
              private http:HttpClient) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm (): void {
    this.manageForm = this.fb.group({
      fichier: [null, Validators.required],
    })
  }


  handleChangeFile ($event:any): void {
    this.currentFile = $event.target.files[0];
    const fileReader =  new FileReader()
    fileReader.readAsBinaryString(this.currentFile)
    fileReader.onload = (e) =>{
      let work = XLSX.read(fileReader.result, {type:'binary'});
      let sheetName = work.SheetNames;
      this.currentFileData = XLSX.utils.sheet_to_json(work.Sheets[sheetName[0]]);
      console.log(this.currentFileData);
      const contacts = this.currentFileData.map(contact => {
        return {phone: contact.phone, name: contact.prenom, montant_du: contact.montant_du}
      })

      this.http.post('http://localhost:3000/api',{contacts: contacts})
        .subscribe(value => value)
    }
  }

  onSubmitForm (): void {
    console.log(this.manageForm.value)
  }
}
