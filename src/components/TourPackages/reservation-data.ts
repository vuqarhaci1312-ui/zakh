export const RESERVATION_COPY = {
  button: "Reservation",
  title: "Tour reservation",
  success: "Your reservation request has been sent. Our team will contact you soon.",
  firstName: "First name",
  lastName: "Last name",
  phone: "Phone",
  email: "Email",
  contactHint: "Enter at least a phone number or email.",
  subject: "Subject",
  dateFrom: "Travel from",
  dateTo: "Travel to",
  submit: "Send",
  errors: {
    contactRequired: "Please enter a phone number or email.",
    dateRange: "End date must be on or after start date.",
    submitFailed: "Could not send reservation. Please try again.",
  },
} as const;
