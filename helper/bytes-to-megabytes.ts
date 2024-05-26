function bytesToMegaBytes(bytesSize: number): number {
  const mbSize: number = bytesSize / 1024.0 ** 2;
  return mbSize;
}

export default bytesToMegaBytes;
