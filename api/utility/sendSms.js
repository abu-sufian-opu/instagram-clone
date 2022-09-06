
// import Vonage from '@vonage/server-sdk';
// import { Vonage } from "@vonage/server-sdk";

// const vonage = new Vonage({
//   apiKey: "323051b2",
//   apiSecret: "e6v8vMdnww2KtSa6"
// })

// export const sendSms = () => {
//     const from = "Vonage APIs"
//     const to = "8801724696053"
//     const text = 'Welcome to our Instagram'

// vonage.message.sendSms(from, to, text, (err, responseData) => {
//     if (err) {
//         console.log(err);
//     } else {
//         if(responseData.messages[0]['status'] === "0") {
//             console.log("Message sent successfully.");
//         } else {
//             console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//         }
//     }
// });
// }