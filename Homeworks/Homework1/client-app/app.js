const amqp = require('amqplib');//RabbitMQ sunucusuna bağlanmak ve etkileşim kurmak için kullanılacak .

const studentInfo = {//Göndermek istediğimiz öğrenci bilgilerini içeren bir nesne oluşturuldu.
  name: "Ceren Uludoğan",
  midterm_grade: 80,
  final_grade: 50
};

async function sendMessage() { // RabbitMQ sunucusuna öğrenci bilgileri gönderildi.Asenkron çalışması için .
  try {
    const connection = await amqp.connect('amqp://rabbitmq');//Bağlantı adresi
    const channel = await connection.createChannel();//Sunucuyla iletişim kuracak kanal 
    const queue = 'studentQueue';//Hedef
    channel.assertQueue(queue, { durable: false });//Yeniden başlatıldığında mesaj siinir
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(studentInfo)));//Öğrenci bilgilerini JSON formatına çevirirdik
    console.log("Student info sent to RabbitMQ:", studentInfo);
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error sending student info to RabbitMQ:", error);
  }
}

sendMessage();
