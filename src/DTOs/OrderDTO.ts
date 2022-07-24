import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

import Status from "../@types/status";

export type OrderFirestoreDTO = {
  patrimony: string;
  description: string;
  status: Status;
  solution?: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  closed_at?: FirebaseFirestoreTypes.Timestamp;
};
