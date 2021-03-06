import React, {
  useRef,
  useEffect,
  useState,
  InputHTMLAttributes,
  useCallback,
  ChangeEvent,
} from "react";
import { MdCloudUpload } from "react-icons/md";
import { toast } from "react-toastify";

import { useField } from "@unform/core";

import api from "~/services/api";

import { Container, FileInput, Error } from "./styles";

interface DropzoneProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
}

const Dropzone: React.FC<DropzoneProps> = ({ name, title, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { registerField, fieldName, defaultValue, error } = useField(name);

  const [filename, setFilename] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      setValue(ref: any, value: any) {
        setFilename(value);
      },
    });
  }, [registerField, fieldName]);

  const handleChangeFile = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const uploadFile = event.target.files?.[0];

      if (!uploadFile) {
        return;
      }

      const currentToast = toast("Enviando arquivo para o servidor", {
        autoClose: false,
      });

      try {
        const data = new FormData();

        data.append("file", uploadFile);

        const response = await api.post("/file", data);
        setFilename(response.data.filename);

        if (inputRef.current) {
          inputRef.current.value = response.data.filename;
        }

        toast.update(currentToast, {
          autoClose: 3000,
          type: "success",
          render: "Upload realizado com sucesso",
        });
      } catch (err) {
        toast.update(currentToast, {
          autoClose: 3000,
          type: "error",
          render: "Falha ao realizar upload",
        });
      }
    },
    [],
  );

  return (
    <Container>
      <label htmlFor={fieldName}>{title}</label>

      <FileInput htmlFor={fieldName} isErrored={!!error}>
        <MdCloudUpload size={56} />
        <p>{filename || "Clique aqui para fazer upload do arquivo"}</p>

        <input
          type="text"
          ref={inputRef}
          defaultValue={defaultValue}
          // {...rest}
        />

        <input
          type="file"
          accept="application/pdf, .pdf"
          id={fieldName}
          onChange={handleChangeFile}
          {...rest}
        />
      </FileInput>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Dropzone;
