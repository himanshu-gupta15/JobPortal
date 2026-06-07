// import { Kafka } from "kafkajs";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();
// export const startSendmailConsumer=async()=>{
//     try{
//         const kafka=new Kafka({
//          clientId:"maile-service",
//          brokers:[process.env.Kafka_Broker || "localhost:9092"],
//         });
//         const consumer=kafka.consumer({groupId:"mail-service-group"});
//         await consumer.connect();
//         const topicName="send-mail";
//         await consumer.subscribe({topic:topicName,fromBeginning:false});

//         console.log("Mail service consumer connected and subscribed to topic:");
        
//         await consumer.run({
//             eachMessage:async({topic,partition,message})=>{
//                 try{
//                   const {to,subject,html}=JSON.parse(
//                     message.value?.toString() || "{}"

//                   );
//                   const transporter=nodemailer.createTransport({
//                     host:"smtp.gmail.com",
//                     port:465,
//                     secure:true,
//                     auth:{
//                         user:process.env.EMAIL,
//                         pass:process.env.EMAIL_PASS,
//                     },
//                   })
//                   await transporter.sendMail({
//                     from:"Hireheaven <no-reply>",
//                     to,
//                     subject,
//                     html,
//                   })
//                   console.log(`Mail has been sent to ${to}`)
//                 }catch(error){
//                     console.log("Failed to send  message:",error);
//                 }
//             }
//         })
//     }catch(error){
// console.log("Failed to start kafka consumer:",error);
//     }
// }


import { Kafka } from "kafkajs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const startSendmailConsumer = async () => {
  try {
    const kafka = new Kafka({
      clientId: "mail-service",
      brokers: [process.env.Kafka_Broker || "localhost:9092"],
    });

    const consumer = kafka.consumer({
      groupId: "mail-service-group",
    });

    await consumer.connect();

    const topicName = "send-mail";
    await consumer.subscribe({
      topic: topicName,
      fromBeginning: false,
    });

    console.log("Mail service consumer connected and subscribed to topic:");

    // ✅ Create transporter ONCE (important fix)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await consumer.run({
      autoCommit: false, // ✅ prevents duplicate processing

      eachMessage: async ({ topic, partition, message, heartbeat }) => {
        try {
          const data = JSON.parse(message.value?.toString() || "{}");

          const { to, subject, html } = data;

          if (!to || !subject || !html) {
            console.log("Invalid message received:", data);
            return;
          }

          await transporter.sendMail({
            from: "Hireheaven <no-reply>",
            to,
            subject,
            html,
          });

          console.log(`Mail has been sent to ${to}`);

          // ✅ manual offset commit (prevents duplicate emails)
          await consumer.commitOffsets([
            {
              topic,
              partition,
              offset: (Number(message.offset) + 1).toString(),
            },
          ]);

          await heartbeat();
        } catch (error) {
          console.log("Failed to send message:", error);
        }
      },
    });
  } catch (error) {
    console.log("Failed to start kafka consumer:", error);
  }
};