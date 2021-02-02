Vue.config.devtools = true;

new Vue ({
	el: '#app-container',

	data: {
		contacts: [
			{
				name: 'Michele',
				avatar: '_1',
				visible: true,
				messages: [
					{
						date: '10/01/2020 15:30:55',
						text: 'Hai portato a spasso il cane?',
						status: 'sent'
					},
					{
						date: '10/01/2020 15:50:00',
						text: 'Ricordati di dargli da mangiare',
						status: 'sent'
					},
					{
						date: '10/01/2020 16:15:22',
						text: 'Tutto fatto!',
						status: 'received'
					}
				]
			},
			{
				name: 'Fabio',
				avatar: '_2',
				visible: true,
				messages: [
					{
						date: '20/03/2020 16:30:00',
						text: 'Ciao come stai?',
						status: 'sent'
					},
					{
						date: '20/03/2020 16:30:55',
						text: 'Bene grazie! Stasera ci vediamo?',
						status: 'received'
					},
					{
						date: '20/03/2020 16:35:00',
						text: 'Mi piacerebbe ma devo andare a fare la spesa.',
						status: 'sent'
					}
				]
			},
			{
				name: 'Samuele',
				avatar: '_3',
				visible: true,
				messages: [
					{
						date: '28/03/2020 10:10:40',
						text: 'La Marianna va in campagna',
						status: 'received'
					},
					{
						date: '28/03/2020 10:20:10',
						text: 'Sicuro di non aver sbagliato chat?',
						status: 'sent'
					},
					{
						date: '28/03/2020 16:15:22',
						text: 'Ah scusa!',
						status: 'received'
					}
				]
			},
			{
				name: 'Luisa',
				avatar: '_4',
				visible: true,
				messages: [
					{
						date: '10/01/2020 15:30:55',
						text: 'Lo sai che ha aperto una nuova pizzeria?',
						status: 'sent'
					},
					{
						date: '10/01/2020 15:50:00',
						text: 'Si, ma preferirei andare al cinema',
						status: 'received'
					}
				]
			}
		],

		currentChat: 0,
		newMsg: ''
	},

	methods: {
		currentTime: function () {
			let time = new Date();
			return `${time.getHours()}:${time.getMinutes()}`;
		},

		selectChat: function (currentIndex) {
			const mainBottomContainer = document.getElementById('mainBottomContainer');
			const chatPlaceholder = document.getElementById('chatPlaceholder');
			const contactChat = document.getElementsByClassName('contactChat');
			const messaging = document.getElementsByClassName('messaging')[0];

			chatPlaceholder.style.display = 'none';
			mainBottomContainer.style.display = 'block';
			messaging.innerHTML = '';

			contactChat[this.currentChat].classList.remove('bg-color-1');

			this.currentChat = currentIndex;

			contactChat[this.currentChat].classList.add('bg-color-1');

			this.contacts[this.currentChat].messages.forEach((element) => {
				let messageClass;

				if (element.status === 'sent') {
					messageClass = 'my-message';
				} else {
					messageClass = 'contact-message';
				}

				messaging.innerHTML += `
				<div class="${messageClass}">
					<span>${element.text}</span>
					<span class="time">${element.date}</span>
				</div>
				`;
			});
		},

		automatedResponse: function (displayElement, time) {
			setTimeout(function () {
				displayElement.innerHTML += `<div class="contact-message">
					<span>Ok</span>
					<span class="time">${time}</span>
				</div>
				`;
			}, 1000);
		},

		newMessage: function () {
			const messaging = document.getElementsByClassName('messaging')[0];

			if (this.newMsg.trim().length !== 0) { // Se il messaggio non contiene solo spazi
				messaging.innerHTML += `<div class="my-message">
					<span>${this.newMsg}</span>
					<span class="time">${this.currentTime()}</span>
				</div>
				`;

				this.newMsg = '';

				this.automatedResponse(messaging, this.currentTime());
			}
		}
	}
});
