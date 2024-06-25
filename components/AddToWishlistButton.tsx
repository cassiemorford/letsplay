"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  gameId: number;
  organizationId: number;
}

const AddToWishlistButton = ({ gameId, organizationId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function addToWishlist() {
    setIsSubmitting(true);
    try {
      await axios.post("/api/wishlistItems", { gameId, organizationId });
      router.push(`/overview`);
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
      onClick={addToWishlist}
      className="mx-6 my-6"
    >
      Add Game To Wishlist
    </Button>
  );
};

export default AddToWishlistButton;
