import moment from 'moment';
import { createElementFromHTML } from '../utils';

export default class MessagesItem {
  getMessagesItem(message) {
    const itemEl = createElementFromHTML(`<li class="messages-list__item">
      <span class="messages-list__item-email">${message.from}</span>
      <p class="messages-list__item-text">${this.changeTextMessagesItem(message.subject)}</p>
      <span class="messages-list__item-created">${moment(message.received).format('HH:mm DD.MM.YYYY')}</span>  
    </li>`);

    return itemEl;
  }

  changeTextMessagesItem(text) {
    return text?.length > 15 ? (text = `${text.slice(0, 15)}...`) : text;
  }
}
