import { Directory, File, Paths } from "expo-file-system";
import { Platform } from "react-native";

// Photos from the camera are saved in a temporary cache folder, so we
// copy them into the app's document folder to keep them after a restart.
export async function saveIdPhoto(tempUri: string, customerId: string) {
  // On web the camera gives us a base64 image that can be saved as is
  if (Platform.OS === "web") return tempUri;

  const folder = new Directory(Paths.document, "id-photos");
  folder.create({ intermediates: true, idempotent: true });

  const photo = new File(folder, `${customerId}.jpg`);
  if (photo.exists) photo.delete();

  await new File(tempUri).copy(photo);
  return photo.uri;
}

export function deleteIdPhoto(uri: string | null) {
  if (!uri || Platform.OS === "web") return;
  const photo = new File(uri);
  if (photo.exists) photo.delete();
}
