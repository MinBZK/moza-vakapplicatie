import { components } from "@/network/omc/generated";
import Link from "next/link";
import NotificationEvent from "./notificationEvent";
import { ProgressList } from "./progress";

const Notification = ({
  kvkNummer,
  notification,
}: {
  kvkNummer: string;
  notification: components["schemas"]["Notificatie"];
}) => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl">
        {`Notifiatie: `}
        <Link
          href={`/notificaties/${kvkNummer}/${notification.reference}`}
          className="text-blue-600 underline"
        >
          {notification.reference}
        </Link>
      </h1>

      <ProgressList className="grid-cols-[auto_1fr_auto] gap-4">
        {notification?.events?.map((event) => {
          return (
            <NotificationEvent
              key={event.dateCreated}
              status={event.status!}
              timestamp={event.dateCreated!}
            >
              {event.event}
            </NotificationEvent>
          );
        })}
      </ProgressList>
    </div>
  );
};

export default Notification;
