import { makeAutoObservable } from "mobx";
import { OrdersListItem } from "./types";
import { createBrowserHistory, History } from "history";
import client from "api/gql";
import { GET_ORDERS_QUERY } from "~/screens/Orders/List/queries";

export default class OrdersListState {
  initialized = false;
  loading = false;
  page = 1;
  totalPages = 1;
  orders: OrdersListItem[] = [];
  history: History;

  setInitialized(val: boolean) {
    this.initialized = val;
  }

  constructor(page: string) {
    makeAutoObservable(this);
    this.history = createBrowserHistory();
    this.page = Number(page)
  }

  setOrders(orders: OrdersListItem[]): void {
    this.orders = orders;
  }

  setPage(page: number): void {
    this.page = page;
    const url = new URL(window.location.href);
    if (url.searchParams.get("page") !== this.page.toString()) {
      url.searchParams.set("page", "" + this.page);
      this.history.replace(url.pathname + url.search, {});
    }
  }

  nextPage(): void {
    this.setPage(this.page + 1);
    this.loadOrders();
  }

  prevPage(): void {
    this.setPage(this.page - 1);
    this.loadOrders();
  }

  setTotalPages(totalPages: number): void {
    this.totalPages = totalPages;
  }

  get canNext(): boolean {
    return this.page < this.totalPages;
  }

  get canPrev(): boolean {
    return this.page > 1;
  }

  async loadOrders() {
    this.loading = true;

    client
      .query(GET_ORDERS_QUERY, { page: this.page })
      .toPromise()
      .then(res => {
        const {
          pagination: { totalPageCount },
          orders,
        } = res.data.getOrders;
        this.setTotalPages(totalPageCount);
        this.setOrders(orders);
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
      });
  }

  initialize() {
    this.loadOrders();
    this.initialized = true;
  }
}
