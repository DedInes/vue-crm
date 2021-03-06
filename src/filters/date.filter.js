import store from '../store'

// устанавливаем формат даты
export default function dateFilter(value, format = 'date') {
  const options = {}
  // указываем в объекте options значения полей 
  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }

  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }

  const locale = store.getters.info.locale || 'ru-RU'
  return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}
