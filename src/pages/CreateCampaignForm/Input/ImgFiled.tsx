import React, { useEffect, useState } from 'react';
import { toBase64 } from '@/utils/files';
import { uploadImg } from '@/services/campaigns';
import clsx from 'clsx';
import { Field } from '@/components/Common/Fields/Fields';

interface IImgFiled extends Field {
  onImgUploaded: (name: string, img: string) => void;
  projectName?: string;
  required?: boolean;
  imgUrl?: string;
  loading?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImgFiled({
  label,
  name,
  projectName,
  onImgUploaded,
  required,
  loading,
  setLoading,
  imgUrl: passedImgUrl,
}: IImgFiled) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const file = event.target.files?.[0];

      if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
      const base64 = await toBase64(file);
      const imgUrl = await uploadImg(projectName || '', base64 as string);

      onImgUploaded(name, imgUrl);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const clearImg = () => setSelectedImage(null);

  // useEffect(() => {
  //   if (!selectedImage) return;
  //   onImgUploaded(name, selectedImage);
  //   // onImgChange(selectedImage);
  // }, [selectedImage]);

  useEffect(() => {
    if (!passedImgUrl) return;
    setSelectedImage(passedImgUrl);
  }, [passedImgUrl]);

  return (
    <div className="controlled-input-container">
      <div className="flex gap-1 items-center">
        {label && <label className="text-white">{label}</label>}
        <span className="font-[12px] text-skin-muted">{required ? '*' : '(Optional)'}</span>
      </div>
      <div
        className={clsx(
          'relative min-h-[200px] border border-dashed border-[#ddd] flex justify-center items-center rounded-2xl mt-2 overflow-hidden',
        )}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        {selectedImage ? (
          <img onClick={clearImg} src={selectedImage} className="w-1/2 h-auto" alt="uplaoded-img" />
        ) : (
          <>
            <span className="text-white">{loading ? 'Uploading' : 'Upload'} Img</span>
            <input
              className="hidden"
              id="fileInput"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
