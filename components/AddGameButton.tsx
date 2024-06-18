"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  name: string;
  bggId: number;
}

const AddGameButton = ({ name, bggId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function addNewInstance() {
    setIsSubmitting(true);
    try {
      await axios.post("/api/games", { name, bggId });
      router.push(`/admin/games`);
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
      Add Game To Library
    </Button>
  );
};

export default AddGameButton;
