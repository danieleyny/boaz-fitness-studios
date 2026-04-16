"use client";

import { FormEvent, useState } from "react";
import Button from "./Button";

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block uppercase text-ivory/70 mb-2"
      style={{
        fontSize: "0.6875rem",
        letterSpacing: "0.25em",
        fontWeight: 500,
      }}
    >
      {children}
      {required && <span className="text-gold ml-1">*</span>}
    </label>
  );
}

export default function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Backend can be wired here later. For the demo, we simply show the success state.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-16 border-t" style={{ borderColor: "var(--line)" }}>
        <p
          className="uppercase text-gold mb-6"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.25em",
            fontWeight: 500,
          }}
        >
          Received
        </p>
        <h3
          className="font-display text-ivory"
          style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 500,
            lineHeight: 1.1,
          }}
        >
          Thank you. A member of our team will be in touch within 48 hours.
        </h3>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div>
        <FieldLabel htmlFor="fullName" required>
          Full Name
        </FieldLabel>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          className="input-line"
          autoComplete="name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <FieldLabel htmlFor="email" required>
            Email
          </FieldLabel>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input-line"
            autoComplete="email"
          />
        </div>
        <div>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="input-line"
            autoComplete="tel"
          />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="neighborhood">Neighborhood</FieldLabel>
        <input
          id="neighborhood"
          name="neighborhood"
          type="text"
          className="input-line"
        />
      </div>

      <div>
        <FieldLabel htmlFor="interest">Membership Interest</FieldLabel>
        <select id="interest" name="interest" className="input-line" defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          <option value="full">Full Membership</option>
          <option value="recovery">Recovery Only</option>
          <option value="day">Day Pass</option>
          <option value="press">Press / Other</option>
        </select>
      </div>

      <div>
        <FieldLabel htmlFor="referral">How did you hear about us?</FieldLabel>
        <input
          id="referral"
          name="referral"
          type="text"
          className="input-line"
        />
      </div>

      <div>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <textarea id="message" name="message" rows={4} className="input-line" />
      </div>

      <div className="pt-4">
        <Button type="submit" variant="primary">
          Submit Inquiry
        </Button>
      </div>
    </form>
  );
}
