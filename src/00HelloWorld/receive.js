const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
        const queueName = 'hello';

        channel.assertQueue(queueName, {durable: false});

        const delay = Math.floor(Math.random() * 10);

        console.log(' [*] Waiting for messages in %s with delay %s. To exit press CTRL+C', queueName, delay);

        setInterval(
            () => {
                channel.consume(
                    queueName,
                    (message) => {
                        console.log(' [x] Received %s', message.content.toString());
                    },
                    {noAck: true}
                )
            },
            delay
        )
    });
});
