import fs from "fs";
import path from "path";

export default function requireImage(folder: string, image: string) {
  const filePath = path.join(
    process.cwd(),
    "data",
    "_images",
    folder,
    image as string
  );
  if (fs.existsSync(filePath)) {
    // Read the file
    const file = fs.readFileSync(filePath);

    return file;
  }
  return null;
}

// Get all images in a folder
// Return the image names
export function getAllImagesinFolder(folder: string) {
  const folderPath = path.join(process.cwd(), "data", "_images", folder);
  try {
    const fileNames = fs.readdirSync(folderPath);
    return fileNames;
  } catch (error) {
    return [];
  }
}
