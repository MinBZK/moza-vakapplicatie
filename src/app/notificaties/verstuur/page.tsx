"use client";

import Button from "@/components/button";
import FormField, { FieldInfo } from "@/components/form/formField";
import { NotificationTypes } from "@/network/omc/generated";
import { usePostBericht } from "@/network/omc/postBericht/usePostBericht";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
const Index = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("kvk"); // null if not provided
  const router = useRouter();

  const avaibleMethods = Object.values(NotificationTypes) as [
    string,
    ...string[],
  ];
  const contactMethodsSchema = z.object({
    type: z.enum(avaibleMethods),
    value: z.string().min(1),
  });

  const validationSchema = z.object({
    kvk: z.string().min(1, { message: "Vul een kvk in" }),
    referenceId: z.string().min(1, { message: "Vul een referenceId in" }),
    contactMethodes: z.array(contactMethodsSchema).min(1),
  });

  const { mutate, isPending } = usePostBericht();

  const form = useForm({
    defaultValues: {
      kvk: id ?? "",
      referenceId: uuidv4().toString(),
      contactMethodes: [{}],
    },
    validators: {
      onSubmit: validationSchema,
    },
    onSubmit: ({ value: { kvk, referenceId, contactMethodes } }) => {
      console.log(contactMethodes);
      mutate(
        { kvk, referenceId, methodes: contactMethodes },
        {
          onSuccess: (response) => {
            if (response) {
              router.push("/notificaties");
            } else {
              console.log("ging iets fout");
            }
          },
          onError: () => {
            alert("er ging iets fout, check console");
          },
        },
      );
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="border-b-1 border-gray-200 pb-2">
          <div className="grid grid-cols-2 gap-4 *:py-4">
            <div>
              <form.Field name="kvk">
                {(field) => <FormField label={"KVK nummer"} field={field} />}
              </form.Field>
            </div>
            <div>
              <form.Field name="referenceId">
                {(field) => <FormField label={"referenceId"} field={field} />}
              </form.Field>
            </div>
          </div>
          <div>
            <form.Field name="contactMethodes" mode="array">
              {(field) => {
                return (
                  <div>
                    {field.state.value.map((_, i) => {
                      return (
                        <div key={i} className="grid grid-cols-3 gap-4 *:py-4">
                          <div>
                            <form.Field
                              key={i}
                              name={`contactMethodes[${i}].type`}
                            >
                              {(subField) => (
                                <div>
                                  <label
                                    className="mb-2 block text-sm font-bold text-gray-700"
                                    htmlFor={field.name}
                                  >
                                    Type
                                  </label>
                                  <select
                                    value={subField.state.value as string}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                    onBlur={subField.handleBlur}
                                    className={`focus:border-primary w-full rounded border-1 border-solid border-gray-200 px-1.5 py-1 focus:outline-none`}
                                  >
                                    <option value=""></option>
                                    {avaibleMethods
                                      .filter((x) => x != "Unknown")
                                      .map((type) => {
                                        return (
                                          <option key={type} value={type}>
                                            {type}
                                          </option>
                                        );
                                      })}
                                  </select>
                                  <FieldInfo field={subField} />
                                </div>
                              )}
                            </form.Field>
                          </div>

                          <div>
                            <form.Field
                              key={i}
                              name={`contactMethodes[${i}].value`}
                            >
                              {(subField) => (
                                <FormField label={"Value"} field={subField} />
                              )}
                            </form.Field>
                          </div>
                          <div>
                            {/* Ja deze staat er zodat de button naar beneden float, was cba */}
                            <p className="mb-2 block text-sm font-bold text-gray-700">
                              Acties
                            </p>
                            <Button
                              type="button"
                              onClick={() => {
                                field.removeValue(i);
                              }}
                              className="text-red-600"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                    <div>
                      <FieldInfo field={field} />
                    </div>
                    <Button
                      onClick={() => field.pushValue({ name: "", age: 0 })}
                      type="button"
                    >
                      Voeg Contactmethode toe
                    </Button>
                  </div>
                );
              }}
            </form.Field>
          </div>
        </div>
        <div className="pt-4">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting || isPending ? "..." : "Verstuur"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
};

export default Index;
