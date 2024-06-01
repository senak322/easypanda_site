import "./AddFileBtn.scss";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCallback } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  setAlert,
  setUploadedFileDetails,
} from "../../store/slices/currencySlice";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../../utils/config";
import { useUploadFileMutation } from "../../store/slices/apiSlice"; // Импортируем наш хук для загрузки файла

interface AddFileBtnProps {
  instanceId: "receive" | "paid";
  isDisabled: boolean;
}

function AddFileBtn({ instanceId, isDisabled }: AddFileBtnProps) {
  const appDispatch = useAppDispatch();
  const [uploadFile] = useUploadFileMutation(); // Используем хук для загрузки файла

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : undefined;
      if (file) {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          appDispatch(
            setAlert({
              message:
                "Недопустимый формат файла. Поддерживаются только PNG, JPEG и JPG.",
              severity: "error",
              instanceId: instanceId,
            })
          );
          appDispatch(
            setUploadedFileDetails({
              fileDetails: undefined,
              instanceId: instanceId,
            })
          );
          return;
        }
        if (file.size > MAX_FILE_SIZE) {
          appDispatch(
            setAlert({
              message: `Файл слишком большой. Максимальный размер файла: ${
                MAX_FILE_SIZE / 1024 / 1024
              } MB.`,
              severity: "error",
              instanceId: instanceId,
            })
          );
          appDispatch(
            setUploadedFileDetails({
              fileDetails: undefined,
              instanceId: instanceId,
            })
          );
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("instanceId", instanceId);

        try {
          await uploadFile(formData).unwrap();
          const fileDetails = {
            name: file.name,
            size: file.size,
            lastModified: file.lastModified,
          };
          appDispatch(setAlert({ message: "", severity: "success", instanceId }));
          appDispatch(
            setUploadedFileDetails({
              fileDetails: fileDetails,
              instanceId: instanceId,
            })
          );
        } catch (error) {
          appDispatch(
            setAlert({
              message: "Ошибка при загрузке файла.",
              severity: "error",
              instanceId: instanceId,
            })
          );
        }
      } else {
        appDispatch(
          setUploadedFileDetails({
            fileDetails: undefined,
            instanceId: instanceId,
          })
        );
      }
    },
    [appDispatch, instanceId, uploadFile]
  );

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      disabled={isDisabled}
    >
      Загрузить {instanceId === "paid" ? "чек" : "QR"}
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
}

export default AddFileBtn;
