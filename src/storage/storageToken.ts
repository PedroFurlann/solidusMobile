import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./storageDTO";

interface StorageAuthTokenProps {
  token: string;
}

export async function storageTokenSave({ token }: StorageAuthTokenProps) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token }));
}

export async function storageTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  const { token }: StorageAuthTokenProps = response ? JSON.parse(response) : {};

  return { token };
}

export async function storageTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
