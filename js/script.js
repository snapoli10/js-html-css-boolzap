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
		searchedContact: '',
		newMsg: ''
	},

	methods: {
		// Aggiungere 0 alle singole cifre dell'orario
		fixTimeValue: function (value) {
			if (value < 10) {
				value = '0' + value;
			}

			return value;
		},

		// Ricavare l'ora corrente
		currentTime: function () {
			let time = new Date();
			return `${this.fixTimeValue(time.getHours())}:${this.fixTimeValue(time.getMinutes())}`;
		},

		// Ultima attività
		lastActive: function (currentIndex) {
			const messageList = this.contacts[currentIndex].messages;
			const lastActivity = messageList[messageList.length - 1].date;

			if (lastActivity.length > 5) { // Se l'ultimo messaggio risale a una vecchia data
				return lastActivity.slice(11, 16);
			} else {
				return lastActivity;
			}
		},

		// Ultimo messaggio
		lastMessage: function (currentIndex) {
			const messageList = this.contacts[currentIndex].messages;

			return messageList[messageList.length - 1].text;
		},

		// Ultimo accesso
		lastSeen: function () {
			const messageList = this.contacts[this.currentChat].messages;
			const receivedMessages = messageList.filter((element) => {
				return element.status === 'received';
			});

			return receivedMessages[receivedMessages.length - 1].date;
		},

		// Selezionare una chat
		selectChat: function (currentIndex) {
			const mainBottomContainer = document.getElementById('mainBottomContainer');
			const chatPlaceholder = document.getElementById('chatPlaceholder');
			const contactChat = document.getElementsByClassName('contactChat');

			chatPlaceholder.style.display = 'none';
			mainBottomContainer.style.display = 'block';

			contactChat[this.currentChat].classList.remove('bg-color-1');

			this.currentChat = currentIndex;

			contactChat[this.currentChat].classList.add('bg-color-1');
		},

		// Scrivere un nuovo messaggio
		newMessage: function () {
			const messageList = this.contacts[this.currentChat].messages;
			let answer = '';

			if (this.newMsg.trim().length !== 0) { // Se il messaggio non contiene solo spazi
				messageList.push(
					{
						date: this.currentTime(),
						text: this.newMsg,
						status: 'sent'
					}
				);

				// Preparazione risposte del bot
				switch (this.newMsg.toLowerCase()) {
					case 'ciao':
					answer = 'Ciao a te!';
					break;
					case 'che fai?':
					answer = 'Sto facendo una passeggiata';
					break;
					case 'come stai?':
					answer = 'Bene, tu?';
					break;
					default:
					answer = 'Ok';
				}

				this.newMsg = '';

				// Esecuzione risposta del bot
				setTimeout(() => {
					messageList.push(
						{
							date: this.currentTime(),
							text: answer,
							status: 'received'
						});
				}, 1000);
			}
		},
	}
});
