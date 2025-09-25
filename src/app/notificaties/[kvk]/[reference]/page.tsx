import Notification from "@/components/notification/notification";
import client from "@/network/omc";

const NotificationItemPage = async ({
  params,
}: {
  params: Promise<{ kvk: string; reference: string }>;
}) => {
  const { kvk: kvkNummer, reference } = await params;
  const { data } = await client.GET(`/notificaties/{kvkNummer}/{reference}`, {
    params: { path: { kvkNummer, reference } },
  });

  return <Notification kvkNummer={kvkNummer} notification={data ?? {}} />;
};

export default NotificationItemPage;
