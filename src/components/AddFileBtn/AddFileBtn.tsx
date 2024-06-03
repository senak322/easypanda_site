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
// import { useUploadFileMutation } from "../../store/slices/apiSlice"; // Импортируем наш хук для загрузки файла

interface AddFileBtnProps {
  instanceId: "receive" | "paid";
  isDisabled: boolean;
  onFileSelect: (file: File | null) => void; // Добавляем пропс для передачи файла в родительский компонент
}

function AddFileBtn({ instanceId, isDisabled, onFileSelect }: AddFileBtnProps) {
  const appDispatch = useAppDispatch();
  // const [uploadFile] = useUploadFileMutation(); // Используем хук для загрузки файла

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
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
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
          onFileSelect(null);
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
          onFileSelect(null);
          return;
        }

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
        onFileSelect(file);
      } else {
        appDispatch(
          setUploadedFileDetails({
            fileDetails: undefined,
            instanceId: instanceId,
          })
        );
        onFileSelect(null);
      }
    },
    [appDispatch, instanceId, onFileSelect]
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
