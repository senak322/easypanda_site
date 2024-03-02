import "./Header.scss";
import logo from "../../images/panda_logo.jpg";
import { Select } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import tg from "../../images/tg.svg";

function Header() {
  const windowWidth = useWindowWidth();

  return (
    <>
      <header className="header">
        <div className="header__wrapper">
          <div className="header__logo">
            <img className="header__img" src={logo} alt="easypandamoney logo" />
          </div>
          <h2 className="header__title">Easy Panda Money</h2>
        </div>
        <div className="header__container">
          <ul className="header__list">
            {windowWidth <= 700 ? (
              <li className="header__contact">
                <a
                  className="header__link"
                  href="mailto:easypanda247@gmail.com"
                >
                  <MailOutlined className="header__contact_tg-img" />
                </a>
              </li>
            ) : (
              <a className="header__link" href="mailto:easypanda247@gmail.com">
                <li className="header__contact">easypanda247@gmail.com</li>
              </a>
            )}
            {windowWidth <= 700 ? (
              <li className="header__contact">
                <a
                  className="header__link"
                  href="tg://resolve?domain=easypandamoney/"
                >
                  <img
                    className="header__contact_tg-img"
                    src={tg}
                    alt="Написать в Telegram"
                  />
                </a>
              </li>
            ) : (
              <li className="header__contact">
                <a
                  className="header__link"
                  href="tg://resolve?domain=easypandamoney/"
                >
                  Написать в Telegram
                </a>
              </li>
            )}
          </ul>
          <Select
            defaultValue={"ru"}
            options={[
              { value: "ru", label: "RU" },
              { value: "eng", label: "ENG" },
            ]}
          ></Select>
        </div>
      </header>
    </>
  );
}

export default Header;
