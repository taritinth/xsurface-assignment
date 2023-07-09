export function validFileExtensions(file, allowedExtensions) {
  if (!file || !Array.isArray(allowedExtensions)) return;
  const extension = file?.name
    ? file?.name?.split(".").pop().toLowerCase()
    : file?.type?.split("/").pop();
  return allowedExtensions.includes(extension);
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
