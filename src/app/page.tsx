import Link from "next/link";

const buttonStyle =
  "h-20 content-stretch rounded-lg px-5 py-2.5 text-center text-sm font-medium text-black focus:ring-4 focus:outline-none flex items-center justify-center";

export default async function Home() {
  return (
    <div className="space-y-5">
      <h3 className="font-semibold">
        Hallo werknemer, ga eens lekker werken dan
      </h3>

      <p>
        De vakapplicatie is een combinatie van mock services van het UWV,
        Belastingdienst en andere overheids organisaties waarvan we acties
        willen simuleren.
      </p>

      <p>
        Voor meer informatie over de scenario&apos;s, klik{" "}
        <Link
          className="text-blue-500 underline"
          href={
            "https://docs.mijnoverheidzakelijk.nl/workspace/documentation/Mijn Overheid Zakelijk#scenario-beschrijvingen"
          }
        >
          Hier
        </Link>
      </p>
      <div>
        <h2>Scenario 2.</h2>
        <div>
          <div className="grid grid-cols-1 content-center gap-4 py-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="direct"
              type="button"
              className={`bg-green-300 ${buttonStyle}`}
            >
              verstuur notificatie direct naar de notifcatie service
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h2>Scenario 9. (Scenario 8 + kanaalherstel)</h2>
        <div>
          <div className="grid grid-cols-1 content-center gap-4 py-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="notificaties/verstuur"
              type="button"
              className={`${buttonStyle} bg-blue-400`}
            >
              Verstuur notificatie met kanaal herstel en historie
            </Link>
            <Link
              href="notificaties"
              type="button"
              className={`bg-secondary ${buttonStyle}`}
            >
              Alle notificatie historie
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
