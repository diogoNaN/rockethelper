import { useState } from "react";
import { Alert } from "react-native";
import { Heading, Icon, useTheme, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import auth from "@react-native-firebase/auth";

import Logo from "../assets/logo_primary.svg";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Signin() {
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    if (!email) {
      return Alert.alert("Ops", "adicione o email");
    }

    if (!password) {
      return Alert.alert("Ops", "adicione a senha");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {})
      .catch((error) => {
        setIsLoading(false);

        let message = "";

        switch (error.code) {
          case "auth/invalid-email": {
            message = "Email inválido";
            break;
          }
          case "auth/wrong-password": {
            message = "Credenciais inválidas";
            break;
          }
          case "auth/user-not-found": {
            message = "Credenciais inválidas";
            break;
          }
          default: {
            message = "Tente novamente em alguns instantes";
          }
        }

        Alert.alert("Ops", message);
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color={"gray.100"} fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="Email"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        value={email}
        onChangeText={setEmail}
      />

      <Input
        mb={8}
        secureTextEntry
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w={"full"}
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
