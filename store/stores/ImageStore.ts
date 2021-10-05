import { state } from "../store";

type ImageStoreType = {
  imageUrls: string[];
};

export const ImageStore: ImageStoreType = {
  imageUrls: [],
};

export const addImageUrl = (url: string) => {
  console.log(url);
  state.imageUrls.push(url);
  console.log(state);
};

export const resetImages = () => {
  state.imageUrls = [];
};

export default ImageStore;
