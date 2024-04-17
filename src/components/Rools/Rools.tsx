import "./Rools.scss";

interface RoolsProps {
  title: string;
  list: string[];
  account?: React.ReactNode;
}

function Rools({ title, list, account }: RoolsProps) {
  return (
    <section className="rools">
      <h4 className="rools__title mx-3">{title}</h4>
      <ul className="rools__container">
        {list.map((el, index) => {
          return (
            <li className="rools__li" key={index}>
              {el}
            </li>
          );
        })}
        {account}
      </ul>
    </section>
  );
}

export default Rools;
