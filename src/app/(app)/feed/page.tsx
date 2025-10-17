"use client";

import { Question } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function FeedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  function stripAndTrimDescription(html: string, wordLimit: number): string {
    const text = html.replace(/<[^>]+>/g, "");
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  }

  const fetchQuestions = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/questions?page=${page}`);
      const { questions, totalPages } = response.data;
      setQuestions(questions);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Failed to fetch questions: ", error);
      toast.error("Failed to fetch questions");
    }
  };
}
