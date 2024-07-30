"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  gameInstanceId: number;
  borrowerId: number;
}

const UpdateBorrowerButton = ({ gameInstanceId, borrowerId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function addNewInstance() {
    setIsSubmitting(true);
    try {
      await axios.patch(`/api/gameInstances/${gameInstanceId}`, { borrowerId });
      router.push(`/admin/gameInstances`);
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
      onClick={addNewInstance}
      className="mx-6 my-6"
    >
      Update Borrower
    </Button>
  );
};

export default UpdateBorrowerButton;
