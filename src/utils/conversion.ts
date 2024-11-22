// export function fileToBase64(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     // Triggered when file reading is complete
//     reader.onload = () => {
//       if (reader.result) {
//         resolve(reader.result.toString());
//       } else {
//         reject(new Error("File reading failed."));
//       }
//     };

//     // Triggered in case of an error
//     reader.onerror = () => {
//       reject(new Error("An error occurred while reading the file."));
//     };

//     // Read the file as a data URL
//     reader.readAsDataURL(file);
//   });
// }

import fs from "fs";

export function base64_encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}
