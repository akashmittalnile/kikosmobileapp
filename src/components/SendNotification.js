const sendNotification = async data => {
  const firApiKey =
    'AAAA_Djj7e4:APA91bESbcbXUuWZA-VVyuxyRJA9npCPpwU5I9uv7iwbnK73bHn0WyCYIfIe-KHMcE1STSK3kiq0_eYxF4F3ob7L4BZyVPRCNx7Mfq2CaUiXk_UKirgzr_ZrT650upTpW3SjMuz-EJ7l';
  const message = {
    registration_ids: [data.token], //Devide token
    data: data.data,
    notification: {
      title: data.title,
      body: data.body,
      vibrate: 1,
      sound: 1,
      show_in_foreground: true,
      priority: 'high',
      content_available: true,
    },
  };
  let headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'key=' + firApiKey,
  });

  let response = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers,
    body: JSON.stringify(message),
  });
  var responce = await response.json();
};
export default {sendNotification};
