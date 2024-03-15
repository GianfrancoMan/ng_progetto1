import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  @ViewChild('searchForm') form!:NgForm;
  @Input() isRadio?:boolean;

  dataService:DataService = inject(DataService);

  @Output() searchParamEmitter:EventEmitter<{nameParam:string, value:string}>
    = new EventEmitter<{nameParam:string, value:string}>();


  ngOnInit(): void {
    if(this.isRadio) {
      setTimeout(()=> {
        this.form.setValue({searchType:"name", search:""});
      }, 0);
    }
    else {
      setTimeout(()=> {
        this.form.setValue({search:""});
      }, 0);
    }
  }



  public onSubmit(form:NgForm) {
    let dataForSearch = { nameParam: "", value: "" };

    if(this.isRadio) {
      dataForSearch.nameParam = form.control.value.searchType;
      dataForSearch.value = form.control.value.search;
      this.searchParamEmitter.emit(dataForSearch); //shortcut, the object keys and values are the same

    } else {
      dataForSearch.nameParam = "title";
      dataForSearch.value = form.control.value.search;
      this.searchParamEmitter.emit(dataForSearch); //shortcut, the object keys and values are the same

    }

    dataForSearch.nameParam = "";
    dataForSearch.value = "";
    if(this.isRadio) {
      setTimeout(()=> {
        this.form.setValue({searchType:"name", search:""});
      }, 0);
    }
    else {
      setTimeout(()=> {
        this.form.setValue({search:""});
      }, 0);
    }
  }

}
