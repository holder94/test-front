import React from "react";
import styles from "./styles.m.styl";
import { OrdersListItem } from "../../types";
import { observer } from "mobx-react-lite";
import moment from "moment";
import "moment/locale/ru";
import OrderStatus from "components/OrderStatus";
import DeliveryType from "components/DeliveryType";
import { Link } from "react-router-dom";

const ListItem = observer(
  ({ order }: { order: OrdersListItem }): JSX.Element => {
    return (
      <tr>
        <td className={`${styles.orderNumber} ${styles.item}`}>
          <Link to={`/orders/${order.id}`}>{order.number}</Link>
        </td>
        <td className={styles.item}>{moment(order.createdAt).format("DD.MM.YYYY HH:mm")}</td>
        <td title={order.delivery?.code} className={styles.item}>
          {order.delivery && <DeliveryType code={order.delivery?.code || 'no data'} />}
        </td>
        <td className={styles.item}>{moment().from(order.createdAt, true)}</td>
        <td title={order.status} className={styles.item}>
          <OrderStatus code={order.status} />
        </td>
      </tr>
    );
  }
);

export default ListItem;
