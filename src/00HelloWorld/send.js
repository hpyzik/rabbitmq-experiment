const amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq', (error, connection) => {
    connection.createChannel((error, channel) => {
        const queueName = 'hello';

        channel.assertQueue(queueName, {durable: false});

        const messageLimit = 5;
        let messageNo = 0;

        do {
            messageNo = messageNo + 1;

            channel.sendToQueue(queueName, new Buffer(`Message ${messageNo}`));

            console.log(messageNo);

        } while(messageNo !== messageLimit);

        console.log(' [x] Sent %d messages', messageLimit);

        setTimeout(function() { connection.close(); process.exit(0) }, 1000 * 10);
    });
});

// var amqp = require('amqplib/callback_api');

// amqp.connect('amqp://rabbitmq', function(err, conn) {
//     conn.createChannel(function(err, ch) {
//         var q = 'hello';
//         var msg = 'Hello World!';
//
//         ch.assertQueue(q, {durable: false});
//         // Note: on Node 6 Buffer.from(msg) should be used
//         ch.sendToQueue(q, new Buffer(msg));
//         console.log(" [x] Sent %s", msg);
//     });
//     setTimeout(function() { conn.close(); process.exit(0) }, 500);
// });
