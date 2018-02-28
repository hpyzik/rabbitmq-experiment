const amqp = require('amqplib/callback_api');

const delay = Math.floor(Math.random() * 10);

const consume = (message) => new Promise((resolve) => {
    setTimeout(() => {
        console.log('%s consumed', message.content.toString());
        resolve();
    }, delay * 1000)
});

amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
        // const queueName = 'hello';
        const queueName = 'hello-confirmation';

        channel.assertQueue(queueName, { durable: false });

        console.log(' [*] Waiting for messages in "%s" queue with delay %s. To exit press CTRL+C', queueName, delay);

        channel.consume(
            queueName,
            (message) => {
                console.log('before consume');
                (async () => {
                    await consume(message);
                })();
                console.log('after consume');
            },
            { noAck: true },
        )
    });
});
