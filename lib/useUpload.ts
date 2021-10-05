import { useSnapshot } from "valtio";
import { HTTPError } from "../interfaces/HTTP";
import { deleteImagesByUrlAPI, uploadImage } from "../services/upload";
import { state } from "../store/store";

const handleUploadImage = async ({ file, token }) => {
  const res = await uploadImage({ file, token });
  if (res.status !== 200) {
    throw { statusText: res.statusText, status: res.status } as HTTPError;
  } else {
    return res.body;
  }
};

const handleDeletePhotos = async ({ urls, token }) => {
  const res = await deleteImagesByUrlAPI({ urls, token });
  if (res.status !== 200) {
    throw { statusText: res.statusText, status: res.status } as HTTPError;
  } else {
    return res.body;
  }
};

export default function useUpload() {
  const { session } = useSnapshot(state);

  const uploadImage = async ({ file }: { file: File }) => {
    const res = await handleUploadImage({
      file,
      token: session?.token as string,
    });
    return res;
  };

  const deleteImage = async (urls) => {
    const res = await handleDeletePhotos({
      urls,
      token: session?.token as string,
    });
    return res;
  };

  return { uploadImage, deleteImage };
}
