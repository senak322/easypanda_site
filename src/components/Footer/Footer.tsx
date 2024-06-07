import { MailOutlined } from "@ant-design/icons";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer__wrapper">
        <ul className="footer__container">
          <span className="fw-semibold">Информация</span>
          <li className="my-2">
            <Link to="/rools" className="footer__link">
              Правила обмена
            </Link>
          </li>
          <li className="my-2">
            <Link to="/kyt" className="footer__link">
              Политика KYT
            </Link>
          </li>
          <li className="my-2">
            <Link to="/safety" className="footer__link">
              Политика безопасности
            </Link>
          </li>
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
          <div className="d-flex ">
            <li className="footer__contact">
              <a
                className="footer__link"
                href="https://t.me/easypandamoney"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="footer__contact_tg-img"
                  src={"../../images/tg.svg"}
                  alt="Написать в Telegram"
                />
              </a>
            </li>
            <li className="footer__contact">
              <a className="footer__link" href="mailto:easypanda247@gmail.com">
                <MailOutlined className="footer__contact_tg-img" />
              </a>
            </li>
          </div>
        </ul>
      </nav>
      <p className="mb-0 align-self-center py-1">EasyPandaMoney © 2024</p>
    </footer>
  );
}

export default Footer;
