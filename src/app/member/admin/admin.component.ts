import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {UsersService} from "../../../services/users/users.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {User} from "../../../models/user/user";
import {Pager} from "../../../models/query/pager/pager";
import {Filter} from "../../../models/query/filter/filter";
import {Subject} from "rxjs";


class queryUser{
  term:string;
  role: string;
  constructor() {
    this.term = null as any
    this.role = null as any
  }
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['username', 'email', 'createdAt', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<User>();
  private subject: Subject<string> = new Subject();
  filter: Filter = new Filter();
  pager: Pager = new Pager();
  pageSizeOptions: number[] = [10, 25, 50, 100, 250];
  query: queryUser = null as any;

  constructor(
    private userService: UsersService,
    private router: Router) { }

  ngOnInit() {
    this.search()
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public setQuery(query: any) {
    this.query = query as queryUser
    this.search()
  }
  private search() {
    this.userService.getFilterUsers(this.filter, this.query).subscribe((response: Pager) => {
      if (response&&response.docs&&response.docs.length>0) {
        this.onPageLoad(response)
        this.dataSource.data = response.docs as User[];
      } else {
        /*
        this.messageService.openSnackBar('No se encontraron resultados.', 'Aceptar', 10000);
         */
        this.dataSource.data = null as any
      }
    }, (error:any) => {
      /*
      let mensaje: string = 'Ha ocurrido un error al obtener los datos';
      this.messageService.openSnackBar(error.error || mensaje, 'Aceptar', 10000);
      this.loader = false;

       */
    });
  }

  public onPageEvent(pageEvent: PageEvent) {
    this.filter.limit = pageEvent.pageSize;
    this.filter.page = pageEvent.pageIndex+1;
    this.search();
  }

  private onPageLoad(pager: Pager) {
    pager.page = pager.page-1;
    this.pager = pager;
    setTimeout(() => {
      this.paginator.pageIndex = this.pager.page;
      this.paginator.length = this.pager.totalDocs;
    });
  }

  private refreshTable() {
    this.search();
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  createQuestion() {
    this.router.navigate(['/create-question']);
  }
}
