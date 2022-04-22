import React from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import Item from "./components/Item";

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const { id } = useParams<ShowParams>();

    const [state] = React.useState(new OrdersShowStore(id));

    return (
      <div className={styles.screenWrapper}>
        <div className={styles.screen}>
          <div className={styles.items}>
            {state.order &&
              state.order.items.map((item, index) => (
                <Item item={item} number={index} key={index} />
              ))}
          </div>
          {state.order === null && (
            <div className={styles.noData}>
              No order with id {id} has been found
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default OrdersShow;
