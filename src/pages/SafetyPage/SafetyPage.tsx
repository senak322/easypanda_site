import "./SafetyPage.scss";

function SafetyPage() {
  return (
    <section className="safety">
      <h1 className="safety__title">Политика безопасности</h1>
      <ul className="safety__list">
        <li>
          1. Настоящие правила определяют, каким образом сервис
          “easypandamoney.com” осуществляет сбор, использование, хранение,
          раскрытие информации, полученной от пользователей на онлайн-ресурсе
          easypandamoney.com. Настоящая Политика действует только на этом
          онлайн-ресурсе и в отношении информации, предоставляемой здесь; не
          может распространяться на других сайтах, в том числе, содержащих
          упоминание о нашем сервисе “easypandamoney.com” или ссылки, ведущие на
          него.
        </li>
      </ul>
      <ul className="safety__list">
        <li>2. Типы собираемых данных</li>
        <li>
          2.1. Личные данные. При использовании онлайн-ресурса
          easypandamoney.com, сервис “easypandamoney.com” может попросить
          пользователя предоставить личную информацию, которую можно
          использовать для связи или идентификации пользователя («Личные
          данные»). Идентификационная информация может включать, но не
          ограничивается: еmail адрес, имя и фамилия, телефонный номер, адрес,
          сookies и данные об использовании.
        </li>
        <li>
          2.2. Данные об использовании такие как: адрес интернет-протокола
          компьютера Пользователя (например, IP-адрес), тип браузера, версию
          браузера, страницы сервиса “easypandamoney.com”, время посещения,
          время, потраченное на эти страницы, уникальные идентификаторы
          устройств и другие диагностические данные.
        </li>
        <li>
          2.3. На сервисе “easypandamoney.com” используется отслеживание файлов
          cookie и аналогичных технологий.
        </li>
      </ul>
      <ul className="safety__list">
        <li>
          3. Cервис “easypandamoney.com” использует собранные данные для
          следующих целей:
          <ul className="safety__list">
            <li>- Уведомление пользователей об изменениях в сервисе;</li>
            <li>- Обеспечение поддержки и обслуживание клиентов;</li>
            <li>- Анализ информации для улучшения работы сервиса;</li>
            <li>- Мониторинг использования сервиса;</li>
            <li>
              - Обнаружение, предотвращение и устранение технических проблем.
            </li>
          </ul>
        </li>
      </ul>
      <ul className="safety__list">
        <li>
          4. Персонифицированная информация пользователей сервисом не продается,
          не обменивается, не сдается в аренду. Cервис “easypandamoney.com”
          предусмотрено использование услуг сторонних поставщиков для помощи в
          управлении онлайн-ресурсом easypandamoney.com (рассылки, сбор
          статистики и др.).
        </li>
      </ul>
      <ul className="safety__list">
        <li>
          5. Cервис может раскрыть личные данные Пользователя в следующих
          ситуациях:
          <ul className="safety__list">
            <li>- Соблюдение юридического обязательства;</li>
            <li>
              - Для предотвращения и расследования возможных нарушений связанных
              с сервисом;
            </li>
            <li>- Для защиты против юридической ответственности.</li>
          </ul>
        </li>
      </ul>
      <ul className="safety__list">
        <li>
          6. Cервисом “easypandamoney.com” используются следующие поставщиков
          услуг для мониторинга и анализа:
          <ul className="safety__list">
            <li>- Google Analytics</li>
            <li>- Яндекс.Метрика</li>
          </ul>
        </li>
      </ul>
    </section>
  );
}

export default SafetyPage;
