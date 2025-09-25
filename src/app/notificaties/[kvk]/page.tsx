import Button from "@/components/button";
import Notification from "@/components/notification/notification";
import client from "@/network/omc";
import Link from "next/link";

const Index = async ({ params }: { params: Promise<{ kvk: string }> }) => {
  const { kvk: kvkNummer } = await params;
  const { data } = await client.GET(`/notificaties/{kvkNummer}`, {
    params: { path: { kvkNummer } },
  });

  return (
    <div className="grid-cols-1 divide-y-1 divide-gray-500">
      <div className="flex w-full items-center justify-between pb-6">
        <h1 className="pb-2 text-xl">KVK-nummer: {kvkNummer}</h1>

        <Link href={`/notificaties/verstuur?kvk=${kvkNummer}`}>
          <Button>Verstuur nieuwe notificatie naar dit KVK-nummer</Button>
        </Link>
      </div>

      {data?.Notificaties?.map((notification) => {
        return (
          <div key={notification.id} className="py-6">
            <Notification kvkNummer={kvkNummer} notification={notification} />
          </div>
        );
      })}
    </div>
  );
};

export default Index;
