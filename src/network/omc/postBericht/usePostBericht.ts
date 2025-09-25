import { useMutation } from "@tanstack/react-query";
import { postBerichtAction } from "./action";

export const usePostBericht = () =>
  useMutation({
    mutationFn: postBerichtAction,
  });
