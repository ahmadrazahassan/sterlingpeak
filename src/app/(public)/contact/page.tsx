"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1, "Required"),
});

type Form = z.infer<typeof schema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Form>({ resolver: zodResolver(schema) });

  async function onSubmit(data: Form) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) reset();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-heading text-4xl font-semibold text-brand">Contact</h1>
          <p className="mt-4 text-muted-foreground">
            Editorial corrections, partnership questions, or reader feedback — we read every
            message.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li>Editorial and fact-checking enquiries</li>
            <li>Affiliate and partnership discussions</li>
            <li>Product updates readers should know about</li>
          </ul>
        </div>
        <Card className="border-border-subtle shadow-card">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" className="mt-1" {...register("name")} />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" className="mt-1" {...register("email")} />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="company">Company (optional)</Label>
                <Input id="company" className="mt-1" {...register("company")} />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" className="mt-1" {...register("subject")} />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" className="mt-1" {...register("message")} />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full sm:w-auto"
                style={{ backgroundColor: "#22ad01" }}
              >
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="mt-16 grid gap-4 md:grid-cols-2">
        <Card className="border-border-subtle">
          <CardContent className="p-6">
            <p className="font-heading font-semibold text-brand">Editorial</p>
            <p className="mt-2 text-sm text-muted-foreground">
              For corrections, citations, and editorial standards.
            </p>
          </CardContent>
        </Card>
        <Card className="border-border-subtle">
          <CardContent className="p-6">
            <p className="font-heading font-semibold text-brand">Business</p>
            <p className="mt-2 text-sm text-muted-foreground">
              For partnerships and commercial enquiries.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
