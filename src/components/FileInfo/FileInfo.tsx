import "./FileInfo.scss";
import { FileDetails } from "../../types/types";
import DoneIcon from "@mui/icons-material/Done";

interface FileInfoProps {
    details: FileDetails
}

function FileInfo({details}: FileInfoProps) {
  return (
    <div className="file-info">
      <div className="file-info__done">
        <DoneIcon />
      </div>
      <div className="my-2">
        <h5>Файл загружен:</h5>
        <p className="m-0">Имя файла: {details.name}</p>
        <p className="m-0">
          Размер файла: {details.size} байт
        </p>
      </div>
    </div>
  );
}

export default FileInfo;
