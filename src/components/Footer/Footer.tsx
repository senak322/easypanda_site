import "./Footer.scss";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <ul className="footer__container">
          <span className="fw-semibold">Информация</span>
          <li className="my-2">Политика безопасности</li>
          <li className="my-2">Правила обмена</li>
          <li className="my-2">Политика KYT</li>
        </ul>
        <ul className="footer__container">
        <span className="fw-semibold">График работы без выходных</span>
          <li className="footer__time-container">
            <p>Пекин:</p>
            <p>9:00 - 23:00</p>
          </li>
          <li className="footer__time-container">
            <p>Москва:</p>
            <p>4:00 - 18:00</p>
          </li>
          <li className="footer__time-container">
            <p>Киев:</p>
            <p>3:00 - 17:00</p>
          </li>
        </ul>
        <ul className="footer__container">
        <span className="fw-semibold">Контакты</span>
            <li className="my-2">
                Телега
            </li>
            <li className="my-2">
                Почта
            </li>
            <li className="my-2">
                Группа
            </li>
        </ul>
      </div>
      <p className="mb-0 align-self-center py-2">EasyPandaMoney © 2024</p>
    </footer>
  );
}

export default Footer;
