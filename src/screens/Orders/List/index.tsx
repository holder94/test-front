import React, { useEffect } from "react";
import styles from "./styles.m.styl";
import { map } from "lodash";
import { observer } from "mobx-react-lite";
import OrdersListState from "./store";
import { OrdersListItem } from "./types";

import Button from "../../../components/Button";
import AngleLeftIcon from "../../../assets/icons/angle-left-solid.svg";
import AngleRightIcon from "~/assets/icons/angle-right-solid.svg";
import ListItem from "./components/ListItem";

const OrdersList = observer(
  (): JSX.Element => {
    const pageNumber = new URLSearchParams(window.location.search).get('page') || '1'

    const [state] = React.useState(new OrdersListState(pageNumber));

    useEffect(() => {
      if (state.initialized) return;
      state.initialize();
    });

    return (
      <React.Fragment>
        <div className={styles.screenWrapper}>
          <div className={styles.screen}>
            {state.loading && <span>Loading...</span>}
            {!state.loading && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Номер</th>
                    <th>Создан</th>
                    <th>Доставка</th>
                    <th>В работе</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {map(state.orders, (order: OrdersListItem, index: number) => (
                    <ListItem order={order} key={index} />
                  ))}
                </tbody>
              </table>
            )}
            <div className={styles.pagination}>
              <Button
                small
                text="PREV"
                icon={AngleLeftIcon}
                resting
                disabled={!state.canPrev}
                onClick={() => state.prevPage()}
              />
              <Button
                small
                text="NEXT"
                rightIcon={AngleRightIcon}
                resting
                disabled={!state.canNext}
                onClick={() => state.nextPage()}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
);

export default OrdersList;
