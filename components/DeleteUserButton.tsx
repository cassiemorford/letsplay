"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { XSquareIcon } from "lucide-react";

interface Props {
  userId: number;
}

const DeleteUserButton = ({ userId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function deleteUser() {
    setIsSubmitting(true);
    try {
      await axios.delete(`/api/users/${userId}`);
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

export default DeleteUserButton;
