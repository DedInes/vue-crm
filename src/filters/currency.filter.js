// создаем фильтр для красивого отображения валют
export default function currencyFilter(value, currency = 'RUB') {
  // возвращаем новый экзмпляр объекта Intl
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency
  }).format(value)
}
