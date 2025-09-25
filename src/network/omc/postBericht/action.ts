"use server";

import client from "@/network/omc";
import { components } from "../generated";

type TParams = {
  kvk: string;
  referenceId: string;
  methodes: components["schemas"]["ContactMethodeRequest"][];
};

export const postBerichtAction = async ({
  kvk,
  referenceId,
  methodes,
}: TParams) => {
  const response = await client.POST("/notificaties/{kvkNummer}/{reference}", {
    body: {
      contact_methode: methodes,
    },

    params: { path: { kvkNummer: kvk, reference: referenceId } },
  });

  return response.data;
};
