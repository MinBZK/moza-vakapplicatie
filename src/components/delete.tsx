"use client";

const DeleteZaakButton = ({ uuid }: { uuid: string }) => {
  return (
    <a
      href="#"
      className="font-medium text-red-600 hover:underline dark:text-blue-500"
    >
      Delete {uuid}
    </a>
  );
};

export default DeleteZaakButton;
