const { Expo } = require('expo-server-sdk');
let expo = new Expo();

async function sendPush(to, message) {
  if (!Expo.isExpoPushToken(to)) {
    console.log("Invalid Expo Token", to);
    return;
  }

  await expo.sendPushNotificationsAsync([
    {
      to,
      sound: "default",
      title: "🚨 SOS ALERT",
      body: message,
    },
  ]);
}

module.exports = { sendPush };
