const amqp = require('amqplib/callback_api');

amqp.connect('amqp://locahost', (error, connection) => {
    connection.createChannel((error, channel) => {
        const queueName = 'hello';

        channel.assertQueue(queueName, {durable: false});

        channel.sendToQueue(queueName, new Buffer('Hello World!'));

        console.log('[x] Sent');
    });

    setTimeout(
        () => {
            connection.close();
            process.exit(0);
        },
        500
    );
});
