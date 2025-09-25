"use server";
import jwt from "jsonwebtoken";
const NotifyNLBaseUrl = "https://api.notifynl.nl/v2";
const SendSmsNotificationUrl = "notifications/sms";
const SendEmailNotificationUrl = "notifications/email";
const ApiKey =
  "omcfake-f7cceea0-ecea-4102-9b93-23a0a3cc0a07-7d35d68e-2b38-44c7-9902-d451ff4e0f0e";

export const callNotifyNL = async ({
  method,
  receiver,
  body,
}: {
  method: string;
  receiver: string;
  body: string;
}) => {
  const { templateId, endpoint, type } = (function () {
    switch (method) {
      case "email":
        return {
          templateId: "cc4c3190-e543-4f6c-95a4-ab6e8bb3522d",
          endpoint: SendEmailNotificationUrl,
          type: { email_address: receiver },
        };
      case "sms":
        return {
          templateId: "bda36fc5-79df-4423-bb79-37abe212b432",
          endpoint: SendSmsNotificationUrl,
          type: { phone_number: receiver },
        };
      default:
        return {};
    }
  })();

  const { serviceId, secret } = ExtractServiceIdAndApiKey(ApiKey);
  const token = createToken(secret, serviceId);

  const res = await fetch(NotifyNLBaseUrl + "/" + endpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
    body: JSON.stringify({
      personalisation: JSON.parse(body),
      template_id: templateId,
      ...type,
    }),
  });

  return res.status;
};

const ExtractServiceIdAndApiKey = (fromApiKey: string) => {
  if (!fromApiKey || fromApiKey.length < 74)
    throw new Error(
      "The API Key provided is invalid. Please ensure you are using a v2 API Key that is not empty or null",
    );
  const serviceId = fromApiKey.substring(fromApiKey.length - 73, 44);
  const secret = fromApiKey.substring(
    fromApiKey.length - 36,
    fromApiKey.length,
  );
  return { serviceId, secret };
};

function createToken(secret: string, serviceId: string): string {
  const payload = {
    iss: serviceId,
    iat: Math.floor(Date.now() / 1000), // current Unix time in seconds
  };

  // Encode JWT with HMAC SHA-256
  return jwt.sign(payload, secret, { algorithm: "HS256" });
}
