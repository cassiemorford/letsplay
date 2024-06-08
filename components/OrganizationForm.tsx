"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Organization } from "@prisma/client";
import { organizationSchema } from "@/validationSchemas/organizations";

type OrganizationFormData = z.infer<typeof organizationSchema>;

interface Props {
  organization?: Organization;
}

const OrganizationForm = ({ organization }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
  });

  async function onSubmit(values: z.infer<typeof organizationSchema>) {
    try {
      setIsSubmitting(true);
      let resp;
      if (organization) {
        resp = await axios.patch(
          `/api/organizations/${organization.id}`,
          values
        );
      } else {
        resp = await axios.post("/api/organizations", values);
      }
      if (resp.data.e) {
        console.warn(resp.data.e.meta.cause);
      }
      if (!resp.data.e) {
        router.push("/admin/organizations");
        router.refresh();
      }
    } catch (error: any) {
      if (error?.response?.data?.clientDisplayError) {
        setError(error.response.data.clientDisplayError);
      }
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            defaultValue={organization?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Organization Name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-full space-x-4 py-4">
            <FormField
              control={form.control}
              name="code"
              defaultValue={organization?.code}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Join Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Organization Join Code" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p className="text-destructive mb-2">{error}</p>
          <Button type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OrganizationForm;
