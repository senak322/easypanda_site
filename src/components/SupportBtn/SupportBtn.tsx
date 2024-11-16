import "./SupportBtn.scss";

export default function SupportBtn() {
  return (
    <button className="sup-button">
      <a
        className="sup-button__link"
        href="https://t.me/easypandamoney"
        target="_blank"
        rel="noreferrer"
      >
        Написать в поддержку
      </a>
    </button>
  );
}
