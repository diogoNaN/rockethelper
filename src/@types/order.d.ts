import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

interface BaseOrder {
  id: string;
  patrimony: string;
  status: Status;
  description: string;
  solution?: string;
}

interface Order extends BaseOrder {
  when: string;
  closed?: string;
}

export type { BaseOrder };
export default Order;
