export const dynamic = "force-dynamic";
import client from "@/network/omc";
import NotificationsTable from "./table";
import Button from "@/components/button";

const Index = async () => {
  const { data, response } = await client.GET("/notificaties");

  if (!response.ok || data == null)
    return (
      <div
        className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
        role="alert"
      >
        <strong className="font-bold">Error</strong>
        <span className="block sm:inline">Missing notifications data.</span>
      </div>
    );

  return (
    <div>
      <div className="flex w-full justify-end">
        <Button>Verstuur nieuwe notificatie</Button>
      </div>
      <NotificationsTable data={data} />
    </div>
  );
};

export default Index;
