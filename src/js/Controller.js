import { interval, switchMap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import MessagesItem from './components/MessagesItem';

export default class Controller {
  constructor(container) {
    this.container = container;
    this.messagesItem = new MessagesItem();
  }

  init() {
    this.messagesList = this.container.querySelector('.messages-list');
    this.messagesSubscribeBtn = this.container.querySelector('.messages-subscribe-btn');

    this.observable$ = interval(1000).pipe(switchMap(() => ajax.getJSON('http://localhost:7070/messages/unread')));

    this.messagesSubscribeBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.innerText === 'Subscribe') {
        e.target.innerText = 'Unsubscribe';
        return this.onSubscribe();
      }

      e.target.innerText = 'Subscribe';
      this.onUnsubscribe();
    });
  }

  onSubscribe() {
    this.subscription = this.observable$.subscribe({
      next: (data) => {
        const itemEl = this.messagesItem.getMessagesItem(data.messages[0]);
        this.messagesList.prepend(itemEl);
      },
      error: () => {},
    });
  }

  onUnsubscribe() {
    this.subscription.unsubscribe();
  }
}
