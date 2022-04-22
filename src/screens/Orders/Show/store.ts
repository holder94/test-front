import { makeAutoObservable } from "mobx";
import { SingleOrder } from "~/screens/Orders/Show/types";
import client from "~/api/gql";
import { ORDER_QUERY } from "./queries";

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  id: string;

  constructor(id: string) {
    makeAutoObservable(this);
    this.id = id;
    client
      .query(ORDER_QUERY, { number: id })
      .toPromise()
      .then(res => {
        this.order = res.data.order
      })
      .catch(err => {
        console.log(err);
      });
  }
}
