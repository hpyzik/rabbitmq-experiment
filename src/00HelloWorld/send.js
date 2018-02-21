const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error, connection) => {
    connection.createChannel((error, channel) => {
        const queueName = 'hello';

        channel.assertQueue(queueName, {durable: false});

        const messageLimit = 100;
        let messageNo = 1;

        do {
            channel.sendToQueue(queueName, new Buffer(`Message ${messageNo}`));

            messageNo = messageNo + 1;
        } while(messageNo !== messageLimit);

        console.log(' [x] Sent %d messages', messageLimit);

        connection.close();
    });
});
