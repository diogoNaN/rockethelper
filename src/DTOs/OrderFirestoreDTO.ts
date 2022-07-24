import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

import { BaseOrder } from "../@types/order";

interface OrderFirestoreDTO extends BaseOrder {
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at?: FirebaseFirestoreTypes.Timestamp;
}

export default OrderFirestoreDTO;
