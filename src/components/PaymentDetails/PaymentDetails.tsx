import "./PaymentDetails.scss";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

function PaymentDetails() {
  const { instances } = useSelector((state: RootState) => state.currency);

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

  const accountData =
    instances.receive.selectedCurrency === "RUB" ||
    instances.receive.selectedCurrency === "UAH"
      ? "Номер карты"
      : instances.receive.selectedCurrency === "CNY" &&
        instances.receive.selectedBank === "AliPay"
      ? "Аккаунт Alipay"
      : "";

  return (
    <section className="payment">
      <div className="payment__container">
        <h4>Укажите реквизиты получателя</h4>
        <div className="my-3 d-flex p-2 justify-content-between">
          <div className="d-flex p-2 justify-content-between">
            <TextField id="outlined-basic" label="Имя" variant="outlined" />
            <TextField id="outlined-basic" label="Фамилия" variant="outlined" />
          </div>
          {accountData && (
            <TextField
              id="outlined-basic"
              label={accountData}
              variant="outlined"
            />
          )}
          {instances.receive.selectedCurrency === "CNY" && (
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Загрузить QR
              <VisuallyHiddenInput type="file" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default PaymentDetails;
