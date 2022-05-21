import { FormHandles } from "@unform/core";
import { useRef } from "react";

export const useFForm = () => {
  const formRef = useRef<FormHandles>(null);
  return { formRef };
};