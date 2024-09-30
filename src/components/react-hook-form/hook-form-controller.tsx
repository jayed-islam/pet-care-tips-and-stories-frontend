import React from "react";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

type FromProps = {
  children: React.ReactNode;
  onSubmit?: VoidFunction;
  methods: UseFormReturn<any>;
};

export default function FormProvider({
  children,
  onSubmit,
  methods,
}: FromProps) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
