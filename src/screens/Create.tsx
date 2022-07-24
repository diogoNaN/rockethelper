import { useState } from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Create() {
  const { canGoBack, goBack } = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  function handleCreate() {
    if (!patrimony) {
      return Alert.alert("Ops", "Adicione o patrimonio");
    }

    if (!description) {
      return Alert.alert("Ops", "Adicione a descrição");
    }

    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Registrada com sucesso!");
        canGoBack() && goBack();
      })
      .catch((err) => {
        setIsLoading(false);
        Alert.alert("Solicitação", "Ops, não foi possível registrar!");
      });
  }
  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        value={patrimony}
        onChangeText={setPatrimony}
      />

      <Input
        flex={1}
        placeholder="Descrição"
        mt={5}
        multiline
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleCreate}
      />
    </VStack>
  );
}
