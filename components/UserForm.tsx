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
import { User } from "@prisma/client";
import { userSchema } from "@/validationSchemas/users";
import { UserWithOrganization } from "@/app/admin/users/types";

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  user?: UserWithOrganization;
}

const UserForm = ({ user }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    console.log("submit");
    try {
      setIsSubmitting(true);
      let resp;
      if (user) {
        resp = await axios.patch(`/api/users/${user.id}`, values);
      } else {
        resp = await axios.post("/api/users", values);
      }
      if (resp.data.e) {
        console.warn(resp.data.e.meta.cause);
      }
      if (!resp.data.e) {
        router.push("/admin/users");
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
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            defaultValue={user?.email}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required={!user}
                    placeholder="Password..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-full space-x-4 py-4">
            <FormField
              control={form.control}
              name="organizationCode"
              defaultValue={user?.organization.code}
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

export default UserForm;
