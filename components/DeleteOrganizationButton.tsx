"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { XSquareIcon } from "lucide-react";

interface Props {
  organizationId: number;
}

const DeleteOrganizationButton = ({ organizationId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function deleteUser() {
    setIsSubmitting(true);
    try {
      await axios.delete(`/api/organizations/${organizationId}`);
      router.refresh();
    } catch (error) {
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Button
      disabled={isSubmitting}
      onClick={deleteUser}
      size="icon"
      className="text-destructive bg-transparent"
    >
      <XSquareIcon />
    </Button>
  );
};

export default DeleteOrganizationButton;
