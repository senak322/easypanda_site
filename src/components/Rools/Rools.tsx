import "./Rools.scss";
import { Button } from "antd";

function Rools() {
  return (
    <section className="rools">
      <h3 className="rools__title">Правила обмена</h3>
      <ul className="rools__container">
        <li>
          Укажите валюты обмена, сумму и удобный способ отправки и получения
        </li>
        <li>После указания всех данных нажмите кнопку "Продолжить обмен", чтобы указать данные получателя и получить реквизиты для оплаты.</li>
        <li>
          Внесите указанную Вами сумму по полученным реквизитам и прикрепите скриншот об оплате.
        </li>
        <li>
          Нажмите кнопку "Оплачено" и ожидайте получение средств после
          подтверждения от Администратора
        </li>
      </ul>
      <Button type="primary">Продолжить обмен</Button>
    </section>
  );
}

export default Rools;
