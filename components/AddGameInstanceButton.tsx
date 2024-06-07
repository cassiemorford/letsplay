"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  gameId: number;
}

const AddGameInstanceButton = ({ gameId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function addNewInstance() {
    setIsSubmitting(true);
    try {
      await axios.post("/api/gameInstances", { gameId });
      router.refresh();
    } catch (error) {
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Button disabled={isSubmitting} onClick={addNewInstance}>
      Add New Instance
    </Button>
  );
};

export default AddGameInstanceButton;
