"use client";
import Button from "@/components/button";
import FormField, { FieldInfo } from "@/components/form/formField";
import { callNotifyNL } from "@/network/notifyNL/action";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

const Direct = () => {
  const router = useRouter();

  const validationSchema = z.object({
    receiver: z.string().min(1, { message: "Vul een ontvanger in" }),
    contactMethod: z.string().min(1, { message: "Vul een referenceId in" }),
    body: z.string().refine(
      (val) => {
        try {
          JSON.parse(val);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Invalid JSON string",
      },
    ),
  });

  const form = useForm({
    defaultValues: {
      receiver: "",
      contactMethod: "email",
      body: JSON.stringify(JSON.parse('{"name":"pietertje"}'), null, 2),
    },
    onSubmit: async ({ value: { receiver, contactMethod, body } }) => {
      const response = await callNotifyNL({
        method: contactMethod,
        receiver,
        body,
      });

      if (response == 201) {
        alert("Email / sms is verstuurd");
        router.push("/");
      } else {
        alert("Er ging iets fout, status code: " + response);
      }
    },

    validators: {
      onSubmit: validationSchema,
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
              <form.Field name="contactMethod" defaultValue="email">
                {(field) => (
                  <div>
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor={field.name}
                    >
                      Selecteer methode
                    </label>
                    <div className="space-x-5">
                      <label>
                        <input
                          type="radio"
                          value="email"
                          checked={field.state.value === "email"}
                          onChange={() => field.handleChange("email")}
                        />
                        Email
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="sms"
                          checked={field.state.value === "sms"}
                          onChange={() => field.handleChange("sms")}
                        />
                        SMS
                      </label>
                      <FieldInfo field={field} />
                    </div>
                  </div>
                )}
              </form.Field>
            </div>

            <div>
              <form.Field name="receiver">
                {(field) => (
                  <FormField label={"Email adres / telnummer"} field={field} />
                )}
              </form.Field>
            </div>
            <div>
              <form.Field name="body">
                {(field) => (
                  <div>
                    <label
                      htmlFor="body"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Body
                    </label>
                    <textarea
                      id="body"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={() => {
                        try {
                          const parsed = JSON.parse(field.state.value);
                          const formatted = JSON.stringify(parsed, null, 2);
                          field.handleChange(formatted);
                        } catch {}

                        field.handleBlur();
                      }}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />

                    <FieldInfo field={field} />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Verstuur"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
};

export default Direct;
