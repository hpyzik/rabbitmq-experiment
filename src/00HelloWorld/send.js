const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error, connection) => {
    // connection.createChannel((error, channel) => {
    connection.createConfirmChannel((error, channel) => {
        const queueName = 'hello-confirmation';

        channel.assertQueue(queueName, { durable: false });

        const messageLimit = 5;
        let messageNo = 0;

        do {
            messageNo = messageNo + 1;

            channel.sendToQueue(
                queueName,
                new Buffer(`Message ${messageNo}`),
                {},
                ((_messageNo) => (err) => {
                    if (err !== null) {
                        console.warn('Message %d not confirmed', _messageNo);
                        console.warn(err);
                    } else {
                        console.log('Message %d confirmed', _messageNo);
                    }
                })(messageNo),
            );
        }
        while (messageNo !== messageLimit);

        console.log(' [x] Sent %d messages', messageLimit);

        channel.waitForConfirms(function (err) {
            console.log('All messages confirmed');
            connection.close();
            process.exit(0);
        })

        // setTimeout(function() { connection.close(); process.exit(0) }, 1000 * 10);
    });
});
