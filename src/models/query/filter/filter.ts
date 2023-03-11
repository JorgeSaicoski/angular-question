export class Filter {
  populate: string;
  filter: string;
  fields: string;
  page: number;
  limit: number;
  sort: string;
  order: number;
  constructor () {
    this.populate = '';
    this.filter = '';
    this.fields = '';
    this.page = 1;
    this.limit = 10;
    this.sort = '';
    this.order = -1;
  }
}
