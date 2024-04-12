import "./Rools.scss";

interface RoolsProps {
  title: string;
  list: string[];
  account?: React.ReactNode;
}

function Rools({ title, list, account }: RoolsProps) {
  return (
    <section className="rools">
      <h3 className="rools__title mx-3">{title}</h3>
      <ul className="rools__container">
        {list.map((el) => {
          return <li className="rools__li">{el}</li>;
        })}
        {account}
      </ul>
    </section>
  );
}

export default Rools;
